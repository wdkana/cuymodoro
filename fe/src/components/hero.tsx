import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TResponseFeature } from "../types";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select } from "./ui/select";
import { CircleLoading } from "./CircleLoading";
import FeatureSubmitButton from "./FeatureSubmitButton";
import LoadingButton from "./LoadingButton";
import FeatureAPI from "@/apis/feature.api";
import LogoIcon from "@/assets/cuymodoro.png";

function useFeatures() {
  return useQuery({
    queryKey: ["get_last_features"],
    queryFn: async (): Promise<TResponseFeature | undefined> =>
      FeatureAPI.fetchFeatures(localStorage.getItem("username")),
  });
}

function Hero() {
  const queryClient = useQueryClient();
  const username = localStorage.getItem("username");
  const { data, error, isFetching } = useFeatures();

  const addFeatureMutation = useMutation({
    mutationFn: (formData: FormData) =>
      FeatureAPI.addFeature(username, formData),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get_last_features"] }),
  });

  const breakFeatureMutation = useMutation({
    mutationFn: () => FeatureAPI.breakFeature(data?.features?.id, username),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get_last_features"] }),
  });

  const resumeFeatureMutation = useMutation({
    mutationFn: (formData: FormData) =>
      FeatureAPI.resumeFeature(data?.features?.id, username, formData),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get_last_features"] }),
  });

  const finishFeatureMutation = useMutation({
    mutationFn: () => FeatureAPI.finishFeature(data?.features?.id, username),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get_last_features"] }),
  });

  useEffect(() => {
    localStorage.setItem("username", "admin");
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    if (data?.features?.status == "ongoing")
      return breakFeatureMutation.mutate();
    if (data?.features?.status == "break")
      return resumeFeatureMutation.mutate(formData);
    addFeatureMutation.mutate(formData);
  };

  if (error) return <div>error, reload the page please :|</div>;

  return (
    <div className="hero px-4">
      <div className="flex w-full flex-col gap-4 rounded-2xl bg-gray-800 p-8 shadow-xl shadow-white/5">
        <div className="flex items-center justify-center gap-4">
          <img src={LogoIcon} alt="Cuymodoro Icon" width={40} />
          <h1 className="text-center text-4xl font-bold uppercase tracking-wide">
            Cuymodoro
          </h1>
        </div>
        {isFetching ? (
          <div className="flex items-center justify-center">
            <CircleLoading className="h-10 w-10" />
          </div>
        ) : (
          <>
            <div>
              {addFeatureMutation.isError || breakFeatureMutation.isError ? (
                <p>An error occurred</p>
              ) : null}
              {data?.features?.status && (
                <i>status: {data?.features?.status}</i>
              )}
              {data?.features?.status && data?.features?.status == "break" ? (
                <p>Take a break for xx:xx minutes</p>
              ) : null}
            </div>

            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <div className="relative">
                <Input
                  id="title"
                  type="text"
                  name="title"
                  placeholder="What are you working on?"
                  className="bg-gray-700/80 text-gray-100 placeholder:invisible placeholder:text-gray-300 focus:border-purple-600 focus:bg-gray-700 focus:placeholder:visible"
                  required
                  defaultValue={data?.features?.title}
                  disabled={
                    data?.features?.status && data?.features?.status !== "done"
                  }
                />
                <Label
                  className="text-gray-400 peer-focus:text-white"
                  htmlFor="title"
                >
                  Feature Name
                </Label>
              </div>
              <div className="relative">
                <Select
                  id="level"
                  name="level"
                  required
                  disabled={
                    data?.features?.status && data?.features?.status !== "break"
                  }
                  defaultValue={data?.features?.level}
                >
                  <option value="" hidden>
                    Choose Break Level
                  </option>
                  <option value={"newcomers"}>New Comers</option>
                  <option value={"reguler"}>Reguler</option>
                  <option value={"enthusiast"}>Enthusiast</option>
                </Select>
                <Label
                  className="text-gray-400 peer-focus:text-white"
                  htmlFor="level"
                >
                  Break Level
                </Label>
              </div>
              <div className="mt-3">
                <FeatureSubmitButton
                  status={data?.features?.status}
                  disabled={
                    addFeatureMutation.isPending ||
                    breakFeatureMutation.isPending ||
                    resumeFeatureMutation.isPending
                  }
                />
              </div>
            </form>
            {data?.features?.status == "break" && (
              <LoadingButton
                loading={finishFeatureMutation.isPending}
                onClick={() => finishFeatureMutation.mutate()}
                variant="done"
              >
                Done
              </LoadingButton>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Hero;
