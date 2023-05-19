import axios from "axios";
import { useState, useEffect } from "react";
const API_URL = process.env.REACT_APP_API_URL;
const useProductOutstanding = () => {
  const [productOutstanding, setProductOutstanding] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchProductOutstanding() {
      setLoading(true);
      const url = `${API_URL}/category/typical`;
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
