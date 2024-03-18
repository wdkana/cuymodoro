export type TStatusTask = "ongoing" | "done" | "break";
export interface ITask {
  id: number;
  username: string;
  title: string;
  started_time: string;
  break_time: string;
  end_time: string;
  status: TStatusTask;
  level: "newcomers" | "regular" | "enthusiast";
  cycle: number;
}

export type TResponseGetFeatures = { features: ITask };
