import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// cn is a function that merges classnames with tailwindcss classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeNow() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const time = `${hours}:${minutes}`;
  return time;
}
