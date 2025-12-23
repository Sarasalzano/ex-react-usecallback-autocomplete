import { useCallback, useEffect, useState } from "react";

export default function Searchbar() {
  // Array prodotti dall'API
  const [products, setProducts] = useState([]);
  // Query per la fetch (debounced - aggiornata dopo 300ms)
  const [query, setQuery] = useState("");
  // Valore input (aggiornato subito mentre digiti)
  const [inputValue, setInputValue] = useState("");

  // Funzione che chiama l'API
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

  // Si attiva quando query cambia
  useEffect(() => {
    // Se query vuota → svuota lista
    if (!query) {
      setProducts([]);
      return;
    }
    // Altrimenti fa la fetch
    dataFetch();
  }, [query]);

  // Funzione debounce: ritarda l'esecuzione di 300ms
  function debounce(callback, delay) {
    let timer;
    return (value) => {
      clearTimeout(timer); // Resetta timer ad ogni chiamata
      timer = setTimeout(() => callback(value), delay); // Esegue dopo delay
    };
  }

  // Memoizza la funzione debounced (evita ricreazione ad ogni render)
  const handleSearch = useCallback(
    debounce((newQuery) => {
      setQuery(newQuery); // Aggiorna query dopo 300ms
      console.log("Api call:", newQuery);
    }, 300),
    []
  );

  return (
    <>
      <input
        type="text"
        value={inputValue} // Mostra inputValue (risponde subito)
        onChange={(e) => {
          setInputValue(e.target.value); // Aggiorna input immediatamente
          handleSearch(e.target.value); // Chiama debounce per query
        }}
      />
      <div>
        {/* Mostra lista solo se ci sono prodotti */}
        {products.length > 0 && (
          <ul>
            {products.map((product) => (
              <li key={product.id}>{product.name}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}