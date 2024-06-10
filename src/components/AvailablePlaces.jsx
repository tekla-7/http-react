import { useState, useEffect } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import {sortPlacesByDistance}  from '../loc.js'
import { fetchAvaliablePlaces } from "../http.js";
export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlace, setAvaliablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const places=await fetchAvaliablePlaces()
        navigator.geolocation.getCurrentPosition((position)=>{
          const sortPlaces=sortPlacesByDistance(places , position.coords.latitude , position.coords.longitude);
           setAvaliablePlaces(sortPlaces);
           setIsFetching(false);
        });
       
      } catch (error) {
        setError({message:error.message || "couldnot fetch"});
        setIsFetching(false);
      }
      
    }
    fetchPlaces();
    //  fetch('http://localhost:3000/places').then((response)=>{
    //   return response.json()
    // }).then((resData)={
    //   setAvaliablePlaces(resData.places)
    // })
  }, []);

  if(error){
    return <Error title="error occurred " message={error.message}/>
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
