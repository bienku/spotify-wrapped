import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const useFetch = (endpoint: string) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any | null>(null);
    const { data: session } = useSession();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            if (!session || !session.accessToken) {
                setError('Session or access token is missing');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const jsonData = await response.json();
                setData(jsonData.items);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchData();
    }, [session, endpoint]);

    return { data, loading, error };
};

export default useFetch;
