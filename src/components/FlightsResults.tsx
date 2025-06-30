import { useAppSelector } from "../store/hooks";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Box,
} from "@mui/material";
import type { FlightResult } from "../features/flights/flightsTypes";

const FlightResults: React.FC = () => {
  const { results, status, error } = useAppSelector((state) => state.flights);

  if (status === "loading") {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (status === "failed") {
    return (
      <Box mt={4} textAlign="center">
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  if (results.length === 0 && status === "succeeded") {
    return (
      <Box mt={4} textAlign="center">
        <Typography>No flights found.</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={2} mt={2}>
      {results.map((flight: FlightResult) => (
        <Grid size={{ xs: 12, md: 6 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">{flight.airlineName}</Typography>
              <Typography>
                {flight.departureAirport} → {flight.arrivalAirport}
              </Typography>
              <Typography>
                Departure: {flight.departureTime} | Arrival:{" "}
                {flight.arrivalTime}
              </Typography>
              <Typography variant="subtitle1" fontWeight="bold" mt={1}>
                ₹{flight.price}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default FlightResults;
