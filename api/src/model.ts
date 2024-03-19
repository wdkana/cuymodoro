import { MysqlError } from "mysql";
import { connection as db } from "./config/database";
import {
  IFeature,
  TAddFeature,
  TCheckFeatureStatus,
  TCreateFeatureHistory,
  TUpdateFeatureCycle,
} from "./types/feature";

export const getLastDataByUsername = (username: string) => {
  return new Promise<IFeature | null>((resolve, reject) => {
    db.query(
      `SELECT * FROM features WHERE username='${username}' AND status <> 'done' ORDER BY ID DESC LIMIT 1`,
      (err: MysqlError | null, result: IFeature[]) => {
        if (err) return reject(err);
        return resolve(result[0]);
      }
    );
  });
};

export const addNewTask = ({ username, title, level }: TAddFeature) => {
  return new Promise<IFeature>((resolve, reject) => {
    db.query(
      `INSERT INTO features (username, title, level) VALUES ('${username}', '${title}','${level}')`,
      (err: MysqlError | null, result: IFeature) => {
        if (err) return reject(err);
        return resolve(result);
      }
    );
  });
};

export const checkFeatureStatus = ({ id, username }: TCheckFeatureStatus) => {
  return new Promise<IFeature>((resolve, reject) => {
    db.query(
      `SELECT started_time, break_time, status, cycle FROM features WHERE id='${id}' AND username='${username}'`,
      (err: MysqlError | null, result: IFeature[]) => {
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
}: TUpdateFeatureCycle) => {
  return new Promise<boolean>((resolve, reject) => {
    db.query(
      `UPDATE features SET cycle='${incrementCycle}', status='ongoing', level='${level}', started_time=NOW(), break_time=NULL where id='${id}' AND username='${username}'`,
      (err: MysqlError | null, _: unknown) => {
        if (err) return reject(err);
        return resolve(true);
      }
    );
  });
};

export const createFeatureHistory = ({ id, username, total_hours }: TCreateFeatureHistory) => {
  return new Promise<boolean>((resolve, reject) => {
    db.query(
      `INSERT INTO feature_history (feature_id, total_hours, username) VALUES ('${id}', '${total_hours}', '${username}')`,
      (err: MysqlError | null, _: unknown) => {
        if (err) return reject(err);
        return resolve(true);
      }
    );
  });
};
