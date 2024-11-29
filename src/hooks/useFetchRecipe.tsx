/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { IRecipe } from '@/interfaces';


// Hook para hacer fetch a una API
export default function useFetch(urlApi: string) {
    const [data, setData] = useState<IRecipe[] | any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(urlApi);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const contentType = response.headers.get("content-type");

                if (contentType && contentType.indexOf("application/json") !== -1) {
                    const data = await response.json();
                    setData(data);
                } else {
                    throw new Error("Response is not JSON");
                }
                setLoading(false);
            } catch (error) {
                setError((error as Error).message);
                setLoading(false);
            }
        };
        fetchData();
    }, [urlApi]);

    return { data, loading, error };
}
