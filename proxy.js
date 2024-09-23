const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(cors());

app.get("/search", async (req, res) => {
  const { query } = req.query;
  const API_KEY =
    ""; // Chave da API (nesse caso do SerpAPI)
  try {
    const response = await axios.get("https://serpapi.com/search.json", {
      params: {
        q: query,
        engine: "google",
        api_key: API_KEY,
        num: 10, // limita a quantidade de resultados para não precisar fazer paginação
      },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar resultados" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy rodando na porta ${PORT}`);
});
