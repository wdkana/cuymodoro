import { OkPacket } from "mysql";
import db from "./config/database";

export enum LevelEnum {
    newcomers = "newcomers",
    reguler = "reguler",
    enthusiast = "enthusiast",
}

export enum StatusEnum {
    ongoing = "ongoing",
    done = "done",
    break = "break",
}

export type FeaturesModel = {
    id: number;
    username: string;
    title: string;
    started_time: Date;
    break_time: Date;
    end_time: Date;
    status: StatusEnum;
    level: LevelEnum;
    cycle: number;
};

export const getLastDataByUsername = (
    username: string,
): Promise<FeaturesModel> => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT * FROM features WHERE username='${username}' AND status <> 'done' ORDER BY ID DESC LIMIT 1`,
            (err, result) => {
                if (err) return reject(err);
                return resolve(result[0]);
            },
        );
    });
};

export const addNewTask = (
    username: string,
    title: string,
    level: LevelEnum,
): Promise<OkPacket> => {
    return new Promise((resolve, reject) => {
        db.query(
            `INSERT INTO features (username, title, level) VALUES ('${username}', '${title}','${level}')`,
            (err, result) => {
                if (err) return reject(err);
                return resolve(result);
            },
        );
    });
};

type CheckFeatureStatus = Omit<
    FeaturesModel,
    "id" | "username" | "title" | "end_time" | "level"
>;

export const checkFeatureStatus = (
    id: number,
    username: string,
): Promise<CheckFeatureStatus> => {
    console.log("feature status checking...");
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT started_time, break_time, status, cycle FROM features WHERE id='${id}' AND username='${username}'`,
            (err, result) => {
                if (err) return reject(err);
                return resolve(result[0]);
            },
        );
    });
};

export const updateFeatureCycle = (
    id: number,
    username: string,
    level: LevelEnum,
    incrementCycle: number,
): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE features SET cycle='${incrementCycle}', status='ongoing', level='${level}', started_time=NOW(), break_time=NULL where id='${id}' AND username='${username}'`,
            (err, _) => {
                if (err) return reject(err);
                return resolve(true);
            },
        );
    });
};

export const createFeatureHistory = (
    id: number,
    username: string,
    total_hours: Date,
): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        db.query(
            `INSERT INTO feature_history (feature_id, total_hours, username) VALUES ('${id}', '${total_hours}', '${username}')`,
            (err, _) => {
                if (err) return reject(err);
                return resolve(true);
            },
        );
    });
};
