import { useCallback, useEffect, useState } from "react";
import type { UseFetchParamsInterface } from "../../Hooks/Fetch/FetchInterfaces/UseFetchParamsInterface";
import type { UseFetchResultInterface } from "../../Hooks/Fetch/FetchInterfaces/UseFetchResultInterface";
import { toast } from "react-toastify";


function useFetch<T = unknown>({ url, method }: UseFetchParamsInterface): UseFetchResultInterface<T> {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onFetch = useCallback(() => {
    setLoading(true);
    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-bypass-token": import.meta.env.VITE_APP_API_KEY,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Response Failed");
        return res.json();
      })
      .then((data: T) => {
        setResponse(data)
        setError(null);
        toast.success("The data has been loaded successfully ");
  })
      .catch((err: Error) => {
        setError(err);
        setResponse(null);
        toast.error(`error: ${err.message}`); 
      })
      .finally(() => setLoading(false));
  }, [url, method]);

  useEffect(() => {
    onFetch();
  }, [onFetch]);

  return { response, error, loading, resendRequest: onFetch };
}

export default useFetch;
