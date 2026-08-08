const express = require("express");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 10000;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

// Verificação do webhook pela Meta
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verificado pela Meta!");
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});

// Receber eventos do WhatsApp
app.post("/webhook", (req, res) => {
  console.log("Evento recebido da Meta:");
  console.log(JSON.stringify(req.body, null, 2));

  res.sendStatus(200);
});

// Rota simples para testar se o servidor está funcionando
app.get("/", (req, res) => {
  res.send("Webhook do WhatsApp funcionando!");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor funcionando na porta ${PORT}`);
});
