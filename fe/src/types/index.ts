// Feature Type
export type TFeature = {
  id: number;
  username: string;
  title: string;
  started_time: string;
  break_time: string;
  end_time: string;
  status: "ongoing" | "done" | "break";
  level: "newcomers" | "reguler" | "enthusiast";
  cycle: number;
};

export type TResponseFeature = {
  features: TFeature;
};
