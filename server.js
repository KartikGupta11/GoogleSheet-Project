const { google } = require("googleapis");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const sheets = google.sheets({ version: "v4" });
const SPREADSHEET_ID = "134ZIhplKHX5TV1kPLXft9QsKDD1y5Epmm-aQ5fBqIzs";
const RANGE = "Sheet1!A:C";

// Load credentials from the JSON key file downloaded from Google Developers Console
const credentials = require("./credentials.json");

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: "https://www.googleapis.com/auth/spreadsheets.readonly",
});

app.get("/api/data", async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
      auth,
    });
    const rows = response.data.values;
    console.log(response.data);
   
    res.json(rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
