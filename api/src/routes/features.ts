import HyperE from "hyper-express";
import { connection as db } from "../config/database";
import moment from "moment";
import {
  getLastDataByUsername,
  addNewTask,
  checkFeatureStatus,
  updateFeatureCycle,
  createFeatureHistory,
} from "../model";
import {
  TAddFeature,
  TBreakFeature,
  TFinishFeature,
  TResumeFeature,
  TTimeCalculation,
} from "../types/feature";

const features_route = new HyperE.Router();

features_route.get("/last/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const result = await getLastDataByUsername(username);
    res.status(200).json({
      features: result,
    });
  } catch (error) {
    const err = error as Error;

    return res.status(400).json({
      message: err.message,
    });
  }
});

features_route.post("/add", async (req, res) => {
  try {
    const { username, title, level }: TAddFeature = await req.json();
    const result = await addNewTask({ username, title, level });

    res.status(200).json({
      id: result?.id,
      message: "Success adding new feature!",
    });
  } catch (error) {
    const err = error as Error;

    return res.status(400).json({
      message: err.message,
    });
  }
});

async function timeCalculation({
  started_time,
  break_time,
  status,
  incrementCycle,
  level,
  username,
  id,
}: TTimeCalculation) {
  const startedMoment = moment(started_time, "HH:mm:ss");
  const breakMoment = moment(break_time, "HH:mm:ss");

  const duration = moment.duration(breakMoment.diff(startedMoment));
  const total_hours = moment.utc(duration.asMilliseconds()).format("HH:mm:ss");

  if (started_time && break_time && status == "break") {
    const newCycle = await updateFeatureCycle({ id, username, level, incrementCycle });

    if (newCycle) await createFeatureHistory({ id, username, total_hours });
    return newCycle;
  }
  return null;
}

features_route.put("/resume", async (req, res) => {
  try {
    const { id, username, level }: TResumeFeature = await req.json();
    const { started_time, break_time, status, cycle } = await checkFeatureStatus({ id, username });

    const incrementCycle = cycle + 1;

    const newCycle = await timeCalculation({
      started_time,
      break_time,
      status,
      incrementCycle,
      level,
      username,
      id,
    });

    if (newCycle)
      return res.status(200).json({
        time: newCycle,
        message: "Success resuming feature!",
      });

    return res.status(400).json({
      message: "Failed resuming feature!",
    });
  } catch (error) {
    const err = error as Error;

    return res.status(400).json({
      message: err.message,
    });
  }
});

features_route.put("/finish", async (req, res) => {
  const { id, username }: TFinishFeature = await req.json();
  db.query(
    `UPDATE features SET end_time=NOW(), status='done' WHERE id='${id}' AND username='${username}'`,
    (err, _: unknown) => {
      if (err) return res.status(400).json({ message: "updating feature end_time failed, sorry!" });
      res.status(200).json({ id, message: "Sucess finishing feature!" });
    }
  );
});

features_route.put("/break", async (req, res) => {
  const { id, username }: TBreakFeature = await req.json();
  db.query(
    `UPDATE features SET break_time=NOW(), status='break' WHERE id='${id}' AND username='${username}'`,
    (err, _: unknown) => {
      if (err)
        return res.status(400).json({ message: "updating feature break_time failed, sorry!" });
      res.status(200).json({ id, message: "Sucess breaking feature!" });
    }
  );
});

export default features_route;
