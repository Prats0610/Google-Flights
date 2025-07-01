import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { Typography } from "@mui/material";
import FlightCard from "./FlightCard";

export default function ResultList() {
  const { itineraries, status } = useSelector(
    (state: RootState) => state.results
  );
  if (status === "idle") return null;
  if (!itineraries.length) return <Typography>No flights found.</Typography>;

  if (!itineraries.length) return <Typography>No flights found.</Typography>;

  return (
    <>
      {itineraries.map((flight) => (
        <FlightCard key={flight.id} flight={flight} />
      ))}
    </>
  );
}
