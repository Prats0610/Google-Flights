import dayjs from "dayjs";

export const formatTime = (datetime: string) => dayjs(datetime).format("HH:mm");

export const formatDuration = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
};

export const formatStops = (count: number) => {
  if (count === 0) return "Non-stop";
  if (count === 1) return "1 Stop";
  return `${count} Stops`;
};
