import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const useFetch = (endpoint: string) => {
    const [data, setData] = useState<any[]>([]);
    const { data: session } = useSession();

    useEffect(() => {
        async function fetchData() {
            if (session && session.accessToken) {
                const response = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`,
                    },
                });

                const jsonData = await response.json();
                setData(jsonData.items);
            }
        }

        fetchData();
    }, [session, endpoint]);

    return data;
};

export default useFetch;
