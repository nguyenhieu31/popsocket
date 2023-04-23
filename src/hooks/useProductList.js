import axios from "axios";
import { useEffect, useState } from "react";
const API_URL = "https://popsocket-80cc4ytir-nguyenhieu31.vercel.app";
const useProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const url = `${API_URL}/products`;
      try {
        const res = await axios.get(url);
        if (res && res.data) {
          setProducts(res.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);
  return { products, loading };
};
export default useProductList;
