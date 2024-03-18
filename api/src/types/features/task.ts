export interface ITask {
  id: number;
  username: string;
  title: string;
  started_time: string;
  break_time: string;
  end_time: string;
  status: "ongoing" | "done" | "break";
  level: "newcomers" | "regular" | "enthusiast";
  cycle: number;
}

export type TAddNewTask = Pick<ITask, "title" | "level" | "username">;
export type TCheckFeatureStatus = Pick<ITask, "id" | "username">;

export type TUpdateFeatureCycle = Pick<ITask, "id" | "username" | "level"> & {
  incrementCycle: number;
};

export interface TFeatureHistory {
  id: number;
  feature_id: number;
  total_hours: string;
  username: string;
  created_at: string;
}

export type TCreateFeatureHistory = Pick<
  TFeatureHistory,
  "id" | "username" | "total_hours"
>;

export type TTimeCalculation = Pick<
  ITask,
  "started_time" | "break_time" | "status" | "level" | "username" | "id"
> & {
  incrementCycle: number;
};
