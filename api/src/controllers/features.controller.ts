import { create } from "@models/mapping"
import { FeatureFormParams } from "../type/features.type";
import { WriteQuery } from "../type/query.type";

async function addNewTask({ username, title, level }: FeatureFormParams) {
  try {
    const q: WriteQuery = {
      tableName: "features",
      data: { username, title, level }
    }

    const createFeature = await create({ tableName: q.tableName, data: q.data });

    return createFeature;
  } catch (error) {
    return error as string;
  }
}

export = { addNewTask };
