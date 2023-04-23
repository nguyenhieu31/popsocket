import axios from "axios";
import { useState, useEffect } from "react";
const API_URL = "https://popsocket-80cc4ytir-nguyenhieu31.vercel.app";
const useProductOutstanding = () => {
  const [productOutstanding, setProductOutstanding] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchProductOutstanding() {
      setLoading(true);
      const url = `${API_URL}/product-outStanding`;
      try {
        const res = await axios.get(url);
        if (res && res.data) {
          setProductOutstanding(res.data);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchProductOutstanding();
  }, []);
  return { productOutstanding, loading };
};
export default useProductOutstanding;