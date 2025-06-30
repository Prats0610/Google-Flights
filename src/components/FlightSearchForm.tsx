import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { Box, Button, TextField } from "@mui/material";
import type { FlightSearchParams } from "../features/flights/flightsTypes";
import { useAppDispatch } from "../store/hooks";
import { fetchFlights } from "../features/flights/flightsThunks";

const FlightSearchForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState<FlightSearchParams>({
    originSkyId: "",
    destinationSkyId: "",
    date: "",
    returnDate: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(fetchFlights(form));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 3 }}>
          <TextField
            label="From"
            name="originSkyId"
            value={form.originSkyId}
            onChange={handleChange}
            required
            fullWidth
            placeholder="e.g., DEL-sky"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <TextField
            label="To"
            name="destinationSkyId"
            value={form.destinationSkyId}
            onChange={handleChange}
            required
            fullWidth
            placeholder="e.g., BOM-sky"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 2 }}>
          <TextField
            label="Departure Date"
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 2 }}>
          <TextField
            label="Return Date"
            type="date"
            name="returnDate"
            value={form.returnDate}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 2 }}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ height: "100%" }}
          >
            Search Flights
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FlightSearchForm;
