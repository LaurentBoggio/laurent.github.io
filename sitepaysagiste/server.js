// server.js
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Sert les fichiers statiques (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname)));

// Route principale
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`🌿 Site paysagiste disponible sur http://localhost:${PORT}`);
});
