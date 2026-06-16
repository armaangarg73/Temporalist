"use client";

import { useEffect, useState } from "react";

export default function useAgent() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/agent");

      const json = await res.json();

      setData(json);
      setLoading(false);
    }

    load();
  }, []);

  return {
    data,
    loading,
  };
}
