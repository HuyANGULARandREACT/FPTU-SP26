import { useState, useEffect } from "react";

interface UseAsyncOptions {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

/**
 * Custom hook for handling async operations with loading and error states
 * @param asyncFunction - The async function to execute
 * @param immediate - Whether to execute immediately on mount (default: true)
 * @param options - Callbacks for success and error
 */
export const useAsync = <T>(
  asyncFunction: () => Promise<T>,
  immediate = true,
  options?: UseAsyncOptions,
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(immediate);
  const [error, setError] = useState<string>("");

  const execute = async () => {
    try {
      setLoading(true);
      setError("");
      const result = await asyncFunction();
      setData(result);
      options?.onSuccess?.();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      console.error("useAsync error:", err);
      options?.onError?.(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) {
      execute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, error, execute, setData };
};
