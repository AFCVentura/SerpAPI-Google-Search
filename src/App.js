import React, { useState } from "react";
import axios from "axios"; // npm install axios
import "./App.css";
import Cors from "cors";

// Aplicação dá erro de CORS se chamar diretamente a API, então precisamos criar uma aplicação back-end como proxy
const API_KEY =
  ""; // Chave da API (nesse caso do SerpAPI)

function App() {
  // Estudar sobre useState;
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:4000/search", {
        params: {
          query: query,
        },
      });
      console.log(`Resposta da API: ${response.data}`);
      setResults(response.data.organic_results || []);
      setLoading(false);
    } catch (err) {
      if (err.response) {
        console.error("erro na resposta da API", err.response.data);
        setError(
          `Erro: ${err.response.data.error || "Ocorreu um erro na busca"}`
        );
      } else if (err.request) {
        console.error("erro na requisiçã, sem resposta", err.request);
        setError("Erro: Sem resposta da API");
      } else {
        console.error("Erro desconhecido", err.message);
        setError(`Erro: ${err.message}`);
      }
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Google Search Clone - SerpAPI</h1>
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Digite sua busca..."
        />
        <button onClick={handleSearch}>Pesquisar</button>
      </div>

      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}

      <ul>
        {results.map((result, index) => (
          <li key={index}>
            <a href={result.link} target="_blank" rel="noopener noreferrer">
              {result.title}
            </a>
            <p>{result.snippet}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
