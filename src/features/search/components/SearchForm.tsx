import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import { useCallback, useState } from "react";
import { searchAirport } from "@/api/flights";
import type { RootState } from "@/store";
import {
  setOrigin,
  setDestination,
  setDepartureDate,
  setReturnDate,
  setTripType,
  setAdults,
  setCabinClass,
} from "@/features/search/slice";
import { useEffect } from "react";

interface SearchFormProps {
  onSubmit: () => void;
}

interface AirportOption {
  skyId: string;
  entityId: string;
  presentation: {
    suggestionTitle: string;
    title: string;
    subtitle: string;
  };
}

const SearchForm = ({ onSubmit }: SearchFormProps) => {
  const dispatch = useDispatch();

  const {
    origin,
    destination,
    departureDate,
    returnDate,
    tripType,
    adults,
    cabinClass,
  } = useSelector((state: RootState) => state.search);

  const [originOptions, setOriginOptions] = useState<AirportOption[]>([]);
  const [destinationOptions, setDestinationOptions] = useState<AirportOption[]>(
    []
  );

  const fetchOrigin = useCallback(
    debounce(async (query: string) => {
      const res = await searchAirport(query);
      setOriginOptions(res.data || []);
    }, 300),
    []
  );

  const fetchDestination = useCallback(
    debounce(async (query: string) => {
      const res = await searchAirport(query);
      setDestinationOptions(res.data || []);
    }, 300),
    []
  );

  // Load stored search state on mount
  useEffect(() => {
    const saved = localStorage.getItem("flightSearch");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.origin) dispatch(setOrigin(parsed.origin));
        if (parsed.destination) dispatch(setDestination(parsed.destination));
        if (parsed.departureDate)
          dispatch(setDepartureDate(parsed.departureDate));
        if (parsed.returnDate) dispatch(setReturnDate(parsed.returnDate));
        if (parsed.tripType) dispatch(setTripType(parsed.tripType));
        if (parsed.adults) dispatch(setAdults(parsed.adults));
        if (parsed.cabinClass) dispatch(setCabinClass(parsed.cabinClass));
      } catch (e) {
        console.error("Failed to parse saved state:", e);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    const state = {
      origin,
      destination,
      departureDate,
      returnDate,
      tripType,
      adults,
      cabinClass,
    };
    localStorage.setItem("flightSearch", JSON.stringify(state));
  }, [
    origin,
    destination,
    departureDate,
    returnDate,
    tripType,
    adults,
    cabinClass,
  ]);

  return (
    <Box
      display="flex"
      gap={2}
      flexWrap="wrap"
      alignItems="center"
      justifyContent="center"
      mb={4}
    >
      <Autocomplete
        options={originOptions}
        getOptionLabel={(opt) => opt.presentation?.suggestionTitle || ""}
        onInputChange={(_, value) => fetchOrigin(value)}
        onChange={(_, value) => dispatch(setOrigin(value))}
        renderInput={(params) => <TextField {...params} label="From" />}
        value={origin}
        sx={{ minWidth: 200 }}
      />

      <Autocomplete
        options={destinationOptions}
        getOptionLabel={(opt) => opt.presentation?.suggestionTitle || ""}
        onInputChange={(_, value) => fetchDestination(value)}
        onChange={(_, value) => dispatch(setDestination(value))}
        renderInput={(params) => <TextField {...params} label="To" />}
        value={destination}
        sx={{ minWidth: 200 }}
      />

      <TextField
        type="date"
        label="Departure"
        InputLabelProps={{ shrink: true }}
        value={departureDate}
        onChange={(e) => dispatch(setDepartureDate(e.target.value))}
        sx={{ minWidth: 150 }}
      />

      {tripType === "roundtrip" && (
        <TextField
          type="date"
          label="Return"
          InputLabelProps={{ shrink: true }}
          value={returnDate}
          onChange={(e) => dispatch(setReturnDate(e.target.value))}
          sx={{ minWidth: 150 }}
        />
      )}

      <FormControlLabel
        control={
          <Switch
            checked={tripType === "roundtrip"}
            onChange={(e) =>
              dispatch(setTripType(e.target.checked ? "roundtrip" : "oneway"))
            }
          />
        }
        label="Round Trip"
      />

      <FormControl sx={{ minWidth: 100 }}>
        <InputLabel>Adults</InputLabel>
        <Select
          label="Adults"
          value={adults}
          onChange={(e) => dispatch(setAdults(Number(e.target.value)))}
        >
          {[...Array(9)].map((_, i) => (
            <MenuItem key={i + 1} value={i + 1}>
              {i + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Class</InputLabel>
        <Select
          label="Class"
          value={cabinClass}
          onChange={(e) => dispatch(setCabinClass(e.target.value))}
        >
          <MenuItem value="economy">Economy</MenuItem>
          <MenuItem value="premium">Premium Economy</MenuItem>
          <MenuItem value="business">Business</MenuItem>
          <MenuItem value="first">First</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" onClick={onSubmit} sx={{ minWidth: 120 }}>
        Search Flights
      </Button>
    </Box>
  );
};

export default SearchForm;
