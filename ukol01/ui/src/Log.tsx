import React, { useEffect, useState } from "react";
import { apiLog } from "./api";

export const Log: React.FC = () => {
  const [log, setLog] = useState<string[]>([]);

  useEffect(() => {
    const rec = () => {
      apiLog()
        .then(setLog)
        .finally(() => setTimeout(rec, 500));
    };
    rec();
  }, []);

  return (
    <ul style={{ overflow: "auto" }}>
      {[...log].reverse().map((x, i) => (
        <li key={i}>{x}</li>
      ))}
    </ul>
  );
};
