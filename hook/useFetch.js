import { useState, useEffect } from 'react';
import axios from 'axios';
import { RAPID_API_KEY } from '@env';

const rapidApiKey = RAPID_API_KEY;

const useFetch = (endpoint ,query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/search/${endpoint}`,
        headers: {
            'X-RapidAPI-Key': 'f815a2672dmshca7a693398aa3ddp1deefdjsnf6ae8b080a59',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        },
        params: { ...query},
    };

    const fetchDatat = async () => {
        setIsLoading(true);

        try {
            const response = await axios.request(options);

            setData(response.data.data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            console.log(error);
            alert('There is an error');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchDatat();
    }, [])

    const refetch = () => {
        setIsLoading(true);
        fetchDatat();
    }

    return { data, isLoading, error, refetch };
}

export default useFetch;