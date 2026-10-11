import { useEffect, useState } from "react";

export default function useAsync(asyncFn, deps = []) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const run = async () => {
            setLoading(true);
            setError(null);

            try {
                const result = await asyncFn(controller.signal);
                if (!controller.signal.aborted) setData(result);
            } catch (err) {
                if (!controller.signal.aborted) setError(err);
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        };

        run();

        return () => {
            controller.abort();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return {
        data,
        loading,
        error,
    };
}
