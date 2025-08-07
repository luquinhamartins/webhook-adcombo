// index.js
const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

// Função para capturar IP real
function getRealIp(req) {
  return (
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.connection.remoteAddress ||
    req.socket?.remoteAddress ||
    req.ip
  );
}

app.post("/webhook/adcombo", async (req, res) => {
  const {
    name,
    phone,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
    utm_term,
    subacc,
    subacc2,
    subacc3,
    subacc4
  } = req.body;

  const ip = getRealIp(req);

  const params = {
    api_key: "c69b7864e41574f03c563fa2ba2a4468",
    name,
    phone,
    offer_id: "37164", // Substitua pelo seu ID real
    country_code: "CL",
    base_url: "https://treatmenthealth.site/segap/",
    price: "34500",
    referrer: req.headers.referer || "",
    ip,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
    utm_term,
    subacc,
    subacc2,
    subacc3,
    subacc4
  };

  try {
    const response = await axios.get("https://api.adcombo.com/api/v2/order/create/", {
      params
    });
    console.log("AdCombo response:", response.data);
    res.status(200).json({ status: "ok", response: response.data });
  } catch (err) {
    console.error("Erro ao enviar para AdCombo:", err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data || "Erro desconhecido" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
