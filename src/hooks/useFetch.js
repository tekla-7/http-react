import { useState } from "react";
import { useEffect } from "react";

export default function useFetch(fetchFn , initialValue){
  const [fetchedData, setFatchedData] = useState(initialValue);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  //some code
    useEffect(() => {
        async function fetchData() {
          setIsFetching(true);
          try {
            const data = await fetchFn();
            setFatchedData(data);
          } catch (error) {
            setError({ message: error.message || 'Failed to fetch user places.' });
          }
    
          setIsFetching(false);
        }
    
        fetchData();
      }, [fetchFn]);

    
    return {
        isFetching,
        fetchedData,
        setFatchedData,
        error
    }
}