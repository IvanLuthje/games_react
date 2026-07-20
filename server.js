// server.js
import express from "express";
import axios from "axios";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());

const CLIENT_ID = process.env.IGDB_CLIENT_ID;
const ACCESS_TOKEN = process.env.IGDB_ACCESS_TOKEN;

app.post("/api/igdb/:endpoint", async (req, res) => {
  try {
    const { endpoint } = req.params;
    const response = await axios.post(
      `https://api.igdb.com/v4/${endpoint}`,
      req.body.query, // string en formato Apicalypse
      {
        headers: {
          "Client-ID": CLIENT_ID,
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "text/plain",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => console.log("Proxy corriendo en puerto 3001"));
