import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Avatar,
  Chip,
  Stack,
} from "@mui/material";
import type { FlightItinerary, FlightLeg } from "@/types/flights";
import { formatDuration, formatStops, formatTime } from "../utils/formatUtils";

export default function FlightCard({ flight }: { flight: FlightItinerary }) {
  const pricingOptions = flight.pricingOptions ?? [];

  return (
    <Card sx={{ mb: 2, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6">{flight.price.formatted}</Typography>
        <Divider sx={{ my: 1 }} />

        {flight.legs.map((leg: FlightLeg, i) => (
          <Box
            key={i}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mt={1}
          >
            <Box>
              <Typography fontWeight="bold">
                {i === 0 ? "Departure" : "Return"}
              </Typography>
              <Typography>
                {leg.origin.displayCode} → {leg.destination.displayCode}
              </Typography>
              <Typography>
                {formatTime(leg.departure)} - {formatTime(leg.arrival)}
              </Typography>
              <Typography variant="body2">
                {formatStops(leg.stopCount)} |{" "}
                {formatDuration(leg.durationInMinutes)}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              {leg.carriers.marketing.map((carrier) => (
                <Avatar
                  key={carrier.id}
                  src={carrier.logoUrl}
                  alt={carrier.name}
                  sx={{ width: 28, height: 28 }}
                />
              ))}
            </Box>
          </Box>
        ))}

        {pricingOptions.length > 0 && (
          <Stack direction="row" spacing={1} mt={2}>
            {pricingOptions.map((site, idx) => (
              <Chip
                key={idx}
                label={site.agent}
                component="a"
                href={site.deeplinkUrl}
                target="_blank"
                clickable
                variant="outlined"
                size="small"
              />
            ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}
