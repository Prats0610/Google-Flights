import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Airport {
  skyId: string;
  entityId: string;
  presentation: {
    suggestionTitle: string;
    title: string;
    subtitle: string;
  };
}

interface SearchState {
  origin: Airport | null;
  destination: Airport | null;
  departureDate: string;
  returnDate: string;
  tripType: "oneway" | "roundtrip";
  adults: number;
  cabinClass: "economy" | "premiumeconomy" | "business" | "first";
}

const initialState: SearchState = {
  origin: null,
  destination: null,
  departureDate: "",
  returnDate: "",
  tripType: "oneway",
  adults: 1,
  cabinClass: "economy",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setOrigin: (state, action: PayloadAction<Airport | null>) => {
      state.origin = action.payload;
    },
    setDestination: (state, action: PayloadAction<Airport | null>) => {
      state.destination = action.payload;
    },
    setDepartureDate: (state, action: PayloadAction<string>) => {
      state.departureDate = action.payload;
    },
    setReturnDate: (state, action: PayloadAction<string>) => {
      state.returnDate = action.payload;
    },
    setTripType: (state, action: PayloadAction<"oneway" | "roundtrip">) => {
      state.tripType = action.payload;
    },
    setAdults: (state, action: PayloadAction<number>) => {
      state.adults = action.payload;
    },
    setCabinClass: (
      state,
      action: PayloadAction<SearchState["cabinClass"]>
    ) => {
      state.cabinClass = action.payload;
    },
  },
});

export const {
  setOrigin,
  setDestination,
  setDepartureDate,
  setReturnDate,
  setTripType,
  setAdults,
  setCabinClass,
} = searchSlice.actions;

export default searchSlice.reducer;
