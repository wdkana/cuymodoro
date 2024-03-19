import { connection as db } from "../../config/database";
import {
  ITask,
  TAddNewTask,
  TCheckFeatureStatus,
  TCreateFeatureHistory,
  TUpdateFeatureCycle,
} from "../features/task";
import { MysqlError } from "mysql";

export const getLastDataByUsername = (
  username: string
): Promise<MysqlError | ITask> => {
  return new Promise((resolve, reject) => {
    return db.query(
      `SELECT * FROM features WHERE username='${username}' AND status <> 'done' ORDER BY ID DESC LIMIT 1`,
      (err, result) => {
        if (err) return reject(err);
        return resolve(result[0]);
      }
    );
  });
};

export const addNewTask = ({
  username,
  title,
  level,
}: TAddNewTask): Promise<IDatabaseInsertResult | never> => {
  return new Promise((resolve, reject) => {
    return db.query(
      `INSERT INTO features (username, title, level) VALUES ('${username}', '${title}','${level}')`,
      (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      }
    );
  });
};

export const checkFeatureStatus = ({
  id,
  username,
}: TCheckFeatureStatus): Promise<ITask | never> => {
  console.log("feature status checking...");
  return new Promise((resolve, reject) => {
    return db.query(
      `SELECT started_time, break_time, status, cycle FROM features WHERE id='${id}' AND username='${username}'`,
      (err, result) => {
        if (err) return reject(err);
        return resolve(result[0]);
      }
    );
  });
};

export const updateFeatureCycle = ({
  id,
  username,
  level,
  incrementCycle,
}: TUpdateFeatureCycle): Promise<Boolean | MysqlError> => {
  return new Promise((resolve, reject) => {
    return db.query(
      `UPDATE features SET cycle='${incrementCycle}', status='ongoing', level='${level}', started_time=NOW(), break_time=NULL where id='${id}' AND username='${username}'`,
      (err, _) => {
        if (err) return reject(err);
        return resolve(true);
      }
    );
  });
};

export const createFeatureHistory = ({
  id,
  username,
  total_hours,
}: TCreateFeatureHistory): Promise<Boolean | MysqlError> => {
  return new Promise((resolve, reject) => {
    return db.query(
      `INSERT INTO feature_history (feature_id, total_hours, username) VALUES ('${id}', '${total_hours}', '${username}')`,
      (err, _) => {
        if (err) return reject(err);
        return resolve(true);
      }
    );
  });
};
