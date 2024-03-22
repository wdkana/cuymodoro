import { connection as db } from "@config/database.config";

export const find = (tableName: string, params: Record<string, string>, columns: string[]): Promise<any | undefined> => {
  return new Promise((resolve, reject) => {
    const keys = Object.keys(params);
    const values = Object.values(params);

    const columnString = columns.join(", ");
    const query = `SELECT ${columnString} FROM ${tableName} WHERE ${keys.map(key => `${key}=?`).join(" AND ")}`;

    return db.query(query, values, (err, result) => {
      if (err) return reject(false);
      return resolve(result[0]);
    });
  });
};

export const count = (tableName: string, params: Record<string, string>, columns: string[]): Promise<any | undefined> => {
  return new Promise((resolve, reject) => {
    const keys = Object.keys(params);
    const values = Object.values(params);

    const columnString = columns.join(", ");
    const query = `SELECT COUNT(${columnString}) AS count FROM ${tableName} WHERE ${keys.map(key => `${key}=?`).join(" AND ")}`;

    return db.query(query, values, (err, result) => {
      if (err) return reject(false);
      return resolve(result[0].count);
    });
  });
};

export const update = (tableName: string, params: Record<string, string>, conditions: Record<string, string>): Promise<Boolean> => {
  return new Promise((resolve, reject) => {
    ;
    const updateKeys = Object.keys(params);
    const updateValues = Object.values(params);
    const conditionKeys = Object.keys(conditions);
    const conditionValues = Object.values(conditions);

    const keyMap = updateKeys.map((key, _) => `${key} = ?`).join(", ");
    const conditionMap = conditionKeys.map(key => `${key} = ?`).join(" AND ");

    const query = `UPDATE ${tableName} SET ${keyMap} WHERE ${conditionMap}`;
    const queryValues = [...updateValues, ...conditionValues];

    return db.query(query, queryValues, (err, _) => {
      if (err) return reject(err);
      return resolve(true);
    });
  });
};

export const create = (tableName: string, data: Record<string, any>): Promise<Boolean> => {
  return new Promise((resolve, reject) => {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const columnNames = keys.join(", ");
    const valuePlaceholders = keys.map(() => "?").join(", ");

    const query = `INSERT INTO ${tableName} (${columnNames}) VALUES (${valuePlaceholders})`;

    return db.query(query, values, (err, _) => {
      if (err) return reject(false);
      return resolve(true);
    });
  });
};
