export interface SearchParams {
  originSkyId: string;
  destinationSkyId: string;
  originEntityId: string;
  destinationEntityId: string;
  date: string;
  returnDate?: string;
  cabinClass: "economy" | "premiumeconomy" | "business" | "first";
  adults: number;
  sortBy?: string;
  currency?: string;
  market?: string;
  countryCode?: string;
}

export interface FlightItinerary {
  pricingOptions?: {
    agent: string;
    deeplinkUrl: string;
  }[];
  id: string;
  price: {
    raw: number;
    formatted: string;
  };
  legs: FlightLeg[];
  tags: string[];
}

export interface FlightLeg {
  id: string;
  origin: FlightPlace;
  destination: FlightPlace;
  departure: string;
  arrival: string;
  durationInMinutes: number;
  stopCount: number;
  carriers: {
    marketing: Carrier[];
  };
}

export interface FlightPlace {
  id: string;
  name: string;
  displayCode: string;
  city: string;
}

export interface Carrier {
  id: number;
  name: string;
  logoUrl: string;
}
