import HyperE from "hyper-express";
import db from "../config/database";
import {
    getLastDataByUsername,
    addNewTask,
    checkFeatureStatus,
    updateFeatureCycle,
    createFeatureHistory,
    LevelEnum,
    StatusEnum,
} from "../model";
import moment from "moment";

const features_route = new HyperE.Router();

features_route.get("/last/:username", async (req, res) => {
    const { username } = req.params;
    const result = await getLastDataByUsername(username);
    console.log(result);
    res.json({ features: result });
});

features_route.post("/add", async (req, res) => {
    const { username, title, level } = await req.json();
    const result = await addNewTask(username, title, level);
    console.log("🚀 ~ features_route.post ~ result:", result);
    res.json({
        id: result.insertId,
    });
});

async function timeCalculation(
    started_time: Date,
    break_time: Date,
    status: StatusEnum,
    incrementCycle: number,
    level: LevelEnum,
    username: string,
    id: number,
) {
    const startedMoment = moment(started_time, "HH:mm:ss");
    const breakMoment = moment(break_time, "HH:mm:ss");

    const duration = moment.duration(breakMoment.diff(startedMoment));
    const total_hours = moment.utc(duration.asMilliseconds()).format("HH:mm:ss");

    if (started_time && break_time && status == "break") {
        const newCycle = await updateFeatureCycle(
            id,
            username,
            level,
            incrementCycle,
        );
        if (newCycle)
            await createFeatureHistory(id, username, new Date(total_hours));
    }

    return total_hours;
}

features_route.put("/resume", async (req, res) => {
    const { id, username, level } = await req.json();
    const { started_time, break_time, status, cycle } = await checkFeatureStatus(
        id,
        username,
    );
    const incrementCycle = cycle + 1;
    const newTime = await timeCalculation(
        started_time,
        break_time,
        status,
        incrementCycle,
        level,
        username,
        id,
    );
    res.json({ time: newTime });
});

features_route.put("/finish", async (req, res) => {
    const { id, username } = await req.json();
    db.query(
        `UPDATE features SET end_time=NOW(), status='done' WHERE id='${id}' AND username='${username}'`,
        (err, result) => {
            if (err) return console.log("updating feature end_time failed, sorry!");
            res.json({ id });
        },
    );
});

features_route.put("/break", async (req, res) => {
    const { id, username } = await req.json();
    db.query(
        `UPDATE features SET break_time=NOW(), status='break' WHERE id='${id}' AND username='${username}'`,
        (err, result) => {
            if (err) return console.log("updating feature end_time failed, sorry!");
            res.json({ id });
        },
    );
});

export default features_route;
