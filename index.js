const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

app.post('/webhook/adcombo', async (req, res) => {
  const { name, phone, utm_source, utm_medium, utm_campaign, utm_content, utm_term } = req.body;

  const payload = {
    api_key: 'c69b7864e41574f03c563fa2ba2a4468',
    name,
    phone,
    offer_id: 12345, // ← você precisa colocar o seu ID correto aqui
    country_code: 'AR',
    base_url: 'https://treatmenthealth.site/segap/',
    price: '39.99',
    referrer: utm_source,
    ip: req.ip,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
    utm_term
  };

  try {
    const response = await axios.post('https://api.adcombo.com/v1/order/', payload);
    console.log('Resposta da AdCombo:', response.data);
    res.status(200).send({ status: 'ok', adcombo: response.data });
  } catch (error) {
    console.error('Erro ao enviar para AdCombo:', error.response?.data || error.message);
    res.status(500).send({ error: 'Erro ao enviar para AdCombo' });
  }
});

app.listen(3000, () => {
  console.log('Webhook rodando na porta 3000');
});
