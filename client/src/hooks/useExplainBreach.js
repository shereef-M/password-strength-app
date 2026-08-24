// src/hooks/useExplainBreach.js
import { useState, useRef, useCallback } from "react";
import api from "../utils/api";

export default function useExplainBreach() {
  const [status, setStatus] = useState("idle"); // idle | loading | polling | complete | failed
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const pollRef = useRef(null);

  const explain = useCallback(async (breachName, breachDetails) => {
    setStatus("loading");
    setError(null);
    setResult(null);

    try {
      const { data } = await api.post("/breach/explain", {
        breachName,
        breachDetails,
      });
      const { jobId } = data;
      setStatus("polling");

      pollRef.current = setInterval(async () => {
        try {
          const { data: job } = await api.get(`/breach/explain/${jobId}`);

          if (job.status === "complete") {
            clearInterval(pollRef.current);
            setResult(job.result);
            setStatus("complete");
          } else if (job.status === "failed") {
            clearInterval(pollRef.current);
            setError("Explanation failed. Please try again.");
            setStatus("failed");
          }
          // if still "pending", keep polling
        } catch (err) {
          clearInterval(pollRef.current);
          setError("Something went wrong checking the status.");
          setStatus("failed");
        }
      }, 2000);
    } catch (err) {
      setError("Could not start explanation.");
      setStatus("failed");
    }
  }, []);

  return { explain, status, result, error };
}
