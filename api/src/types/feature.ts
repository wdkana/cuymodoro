export interface IFeature {
  id: number;
  username: string;
  title: string;
  started_time: string;
  break_time: string;
  end_time: string;
  status: "ongoing" | "done" | "break";
  level: "newcomers" | "reguler" | "enthusiast";
  cycle: number;
}

export type TAddFeature = Pick<IFeature, "username" | "title" | "level">;

export type TResumeFeature = Pick<IFeature, "id" | "username" | "level">;

export type TFinishFeature = Pick<IFeature, "id" | "username">;

export type TBreakFeature = Pick<IFeature, "id" | "username">;

export type TCheckFeatureStatus = Pick<IFeature, "id" | "username">;

export type TUpdateFeatureCycle = Pick<IFeature, "id" | "username" | "level"> & {
  incrementCycle: number;
};

export type TTimeCalculation = Pick<
  IFeature,
  "started_time" | "break_time" | "status" | "level" | "username" | "id"
> & {
  incrementCycle: number;
};

export interface IFeatureHistory {
  id: number;
  feature_id: number;
  total_hours: string;
  username: string;
  created_at: string;
}

export type TCreateFeatureHistory = Pick<IFeatureHistory, "id" | "username" | "total_hours">;
