import { useEffect, useState } from "react";

export default function Searchbar() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");

  async function dataFetch() {
    try {
      const result = await fetch(
        `http://localhost:3333/products?search=${query}`
      );
      const data = await result.json();
      setProducts(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    dataFetch();
  }, [query]);

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div>
        <ul>
          <li></li>
        </ul>
      </div>
    </>
  );
}
