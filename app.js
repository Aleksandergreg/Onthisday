const express = require('express');

const app = express();

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/frontpage.html");
});

app.get("/history", async (req, res) => {
    try {
        const response = await fetch('https://history.muffinlabs.com/date');
        if (!response.ok) {
            console.error("External API error:", response.status, response.statusText);
            throw new Error("External API returned non-200 status");
        }
        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.error("Error fetching historical data:", error);
        res.status(500).send({ error: 'Failed to fetch historical data' });
    }
});

const PORT = 8080;
app.listen(PORT, () => console.log("Server is running on port", PORT));

module.exports = app;
