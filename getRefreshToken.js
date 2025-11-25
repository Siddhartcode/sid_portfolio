// scripts/getRefreshToken.js
// Run: npm i express axios open && node scripts/getRefreshToken.js
import express from "express";
import axios from "axios";
import open from "open";

const app = express();

// fill these with values from your Spotify app
const CLIENT_ID = "9ba2a222744248fe8ed3a85ec8ed2524";
const CLIENT_SECRET = "d6abb6f58e14436ea7676a51d31cec6b";
// Important: use 127.0.0.1 per Spotify rules (no 'localhost')
const REDIRECT_URI = "http://127.0.0.1:3000/callback";
const SCOPES = "user-read-currently-playing user-read-playback-state";

app.get("/login", (req, res) => {
  const url = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=${encodeURIComponent(SCOPES)}`;
  open(url);
  res.send("Opening Spotify for authorization...");
});

app.get("/callback", async (req, res) => {
  try {
    const code = req.query.code;
    const token = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
      }),
      {
        headers: {
          Authorization: `Basic ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("REFRESH TOKEN:", response.data.refresh_token);
    res.send("Got refresh token — check the terminal. Copy it to Vercel env.");
  } catch (err) {
    console.error(err?.response?.data ?? err.message ?? err);
    res.status(500).send("Error - check terminal");
  }
});

app.listen(3000, () => {
  console.log("Open http://127.0.0.1:3000/login to start Spotify auth");
});
