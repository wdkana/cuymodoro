interface Feature {
  readonly id: number;
  username: string;
  title: string;
  started_time: string;
  break_time: string;
  end_time: string;
  status: "ongoing" | "done" | "break";
  level: "newcomers" | "regular" | "enthusiast";
  cycle: number;
}

interface FeatureHistory extends Feature {
  feature_id: number;
  total_hours: string;
  created_at: string;
}

type CycleIncrement = { cycleIncrement: number }

export type CreateNewFeature = Pick<Feature, "title" | "level" | "username">;
export type FeatureStatus = Pick<Feature, "id" | "username">;
export type FeatureCycle = Pick<Feature, "id" | "username" | "level"> & CycleIncrement
export type CreateFeatureHistory = Pick<FeatureHistory, "id" | "username" | "total_hours">;
export type CalculatedTime = Pick<Feature, "started_time" | "break_time" | "status" | "level" | "username" | "id"> & CycleIncrement
