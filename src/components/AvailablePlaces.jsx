import { useState, useEffect } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvaliablePlaces } from "../http.js";
import { useFetch } from "../hooks/useFetch.js";

async function fetchsortedPlaces(){

  const places=await fetchAvaliablePlaces()
  return new Promise((resolve , reject)=>{
    navigator.geolocation.getCurrentPosition((position) => {
  const sortPlaces = sortPlacesByDistance(
    places,
    position.coords.latitude,
    position.coords.longitude
  );
  resolve(sortPlaces)
  })
  
  // setAvaliablePlaces(sortPlaces);
  // setIsFetching(false);
});
}

export default function AvailablePlaces({ onSelectPlace }) {
  // const [availablePlace, setAvaliablePlaces] = useState([]);
  // const [isFetching, setIsFetching] = useState(false);
  // const [error, setError] = useState();
  const {
    isFetching,
    error,
    fetchedData: availablePlace,
    setFetchData: setAvaliablePlaces,
  } = useFetch(fetchsortedPlaces, []);

  if (error) {
    return <Error title="error occurred " message={error.message} />;
  }
  return (
    <Places
      title="Available Places"
      isLoading={isFetching}
      loadingText="fetching ...."
      places={[availablePlace]}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
