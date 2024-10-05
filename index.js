const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = 3000;

app.use(cors());

app.get("/proxy", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).send("URL parameter is required");
  }

  try {
    const response = await axios.get(url, {
      responseType: "stream",
    });

    // Forward the content type
    res.setHeader("Content-Type", response.headers["content-type"]);

    // Pipe the response
    response.data.pipe(res);
  } catch (error) {
    console.error("Error fetching HLS stream:", error);
    res.status(500).send("Error fetching HLS stream");
  }
});

app.listen(port, () => {
  console.log(`HLS proxy server running at http://localhost:${port}`);
});
