const express = require("express");
const { MongoClient } = require("mongodb");

// ---- MongoDB Atlas URI ----
const uri = "mongodb+srv://orientdevv_db_user:ZqBdYlDTKJYfE8sx@cluster0.zaqxpse.mongodb.net/?appName=Cluster0";

// ---- App setup ----
const app = express();
const client = new MongoClient(uri);

async function start() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB!");

    const dbName = "test";  // <-- change if needed
    const db = client.db(dbName);

    // ---- Home route ----
    app.get("/", async (req, res) => {
      try {
        const collections = await db.listCollections().toArray();

        let html = `
          <h1>MongoDB Database Info</h1>
          <p><strong>Database:</strong> ${dbName}</p>
          <h2>Collections & Document Count</h2>
          <ul>
        `;

        // Fetch each collection count
        for (const col of collections) {
          const collection = db.collection(col.name);
          const count = await collection.countDocuments();

          html += `<li><strong>${col.name}</strong> → ${count} documents</li>`;
        }

        html += "</ul>";

        res.send(html);

      } catch (err) {
        res.send(`<p style="color:red;">Error fetching collections: ${err}</p>`);
      }
    });

    // ---- Start server ----
    app.listen(3000, () => {
      console.log("🚀 Server running on http://localhost:3000");
    });

  } catch (err) {
    console.error("❌ Connection error:", err);
  }
}

start();
