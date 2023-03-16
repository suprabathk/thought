import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCon = new AbortController();
        fetch(url, { signal: abortCon.signal })
            .then((res) => {
                if (!res.ok) {
                    throw Error("Cannot retrieve data from source");
                }
                return res.json()
            })
            .then((data) => {
                setData(data);
                setIsPending(false);
                setError(null);
            }).catch((err) => {
                if (!(err.name === "AbortError")) {
                    setError(err.message);
                    setIsPending(false);
                }
            })
        return () => abortCon.abort();
    }, [url]);

    return [data, isPending, error];
}

export default useFetch;