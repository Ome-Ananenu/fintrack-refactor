import React, { useState, useEffect } from "react";
import axios from "axios";
import { accessToken } from "./helperFunc";

const FetchFunc2 = (email: string, role: string) => {
  interface obj {
    email: string;
    role: string;
  }
  const [data, setData] = useState<obj[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .post(`${ import.meta.env.VITE_FETURL}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          email,
          role,
        },
      })
      .then((res) => {
        let allData = [...data, res.data];
        console.log("seller", allData);
        setData(allData);
        setLoading(false);
        setError(false);
      })
      .catch((err) => {
        setLoading(true);
        setError(err.message);
      });
  }, []);

  return { data, loading, error };
};

export default FetchFunc2;
