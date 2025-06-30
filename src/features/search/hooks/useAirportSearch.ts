import { useMemo } from "react";
import debounce from "lodash.debounce";
import { searchAirport } from "@/api/flights";

export const useAirportSearch = () => {
  const debouncedFetch = useMemo(
    () =>
      debounce(async (input: string, callback: (res: any[]) => void) => {
        if (!input) return;

        try {
          const res = await searchAirport(input);
          const options = res.data.map((airport: any) => ({
            label: airport.name,
            value: {
              skyId: airport.skyId,
              entityId: airport.entityId,
              flightPlaceType: airport.flightPlaceType,
            },
          }));
          callback(options);
        } catch (error) {
          console.error("Airport search failed", error);
          callback([]);
        }
      }, 500), // 500ms delay
    []
  );

  return debouncedFetch;
};
