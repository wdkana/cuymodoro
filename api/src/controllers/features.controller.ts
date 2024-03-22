import { create } from "@models/mapping"

interface Feature {
  username: string,
  title: string,
  level: "newcomers" | "reguler" | "enthusiast"
}

function get() {
  return "GET";
}

async function addNewTask({username, title, level}: Feature) {
  try {
    const data = { username, title, level }
    const createFeature = await create("features", data);
    console.log("🚀 ~ addNewTask ~ createUser:", createFeature)

    return createFeature;
  } catch (error) {
    return error as string;
  }
}

function update() {
  return "UPDATE";
}

export = { get, addNewTask, update };
