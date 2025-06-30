import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  useTheme,
  IconButton,
} from "@mui/material";
import SearchForm from "@/features/search/components/SearchForm";
import ResultList from "@/features/results/components/ResultList";
import { searchFlights } from "@/api/flights";
import { setResults, setLoading, setError } from "@/features/results/slice";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import plane from "../../public/plane.png";

type HomeProps = {
  toggleTheme: () => void;
};
export default function Home({ toggleTheme }: HomeProps) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const {
    origin,
    destination,
    departureDate,
    returnDate,
    tripType,
    adults,
    cabinClass,
  } = useSelector((state: RootState) => state.search);
  const { status } = useSelector((state: RootState) => state.results);

  const handleSearch = async () => {
    if (!origin || !destination || !departureDate) return;
    dispatch(setLoading());
    try {
      const response = await searchFlights({
        originSkyId: origin.skyId,
        destinationSkyId: destination.skyId,
        originEntityId: origin.entityId,
        destinationEntityId: destination.entityId,
        date: departureDate,
        ...(tripType === "roundtrip" && returnDate ? { returnDate } : {}),
        cabinClass,
        adults,
        sortBy: "best",
        currency: "USD",
        market: "en-US",
        countryCode: "US",
      });
      dispatch(setResults(response.data?.itineraries || []));
    } catch (error) {
      console.error("API error:", error);
      dispatch(setError());
    }
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",
          height: "50vh",
          backgroundImage: `url(${plane})`,
          backgroundSize: "43%",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 10,
          }}
        >
          <IconButton onClick={toggleTheme}>
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Box>

        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: "bold",
            color: "#fff",
            textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
            mb: 2,
          }}
        >
          Google Flights Clone
        </Typography>

        <Box
          display="flex"
          gap={2}
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
        ></Box>
      </Box>

      <Container maxWidth="md">
        <Box display="flex" justifyContent="center" mt={-6}>
          <SearchForm onSubmit={handleSearch} />
        </Box>

        <Box mt={4}>
          {status === "loading" ? (
            <Box textAlign="center" mt={8}>
              <CircularProgress />
            </Box>
          ) : (
            <ResultList />
          )}
        </Box>
      </Container>
    </>
  );
}
