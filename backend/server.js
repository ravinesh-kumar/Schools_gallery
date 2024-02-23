const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(express.json());

app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // Provide the correct password if set
  database: "school_info",
});

// Check the database connection
db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database");
});

app.get("/", (req, res) => {
  const sql = "SELECT * FROM schools";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    // Handle successful response
    return res.json({ data: result });
  });
});

app.post("/create", (req, res) => {
  const sql =
    "INSERT INTO schools (name, address,city,state,contact, image,email_id) VALUES (?,?,?,?,?,?,?)";
  const values = [
    req.body.name,
    req.body.address,
    req.body.city,
    req.body.state,
    req.body.contact,
    req.body.image,
    req.body.email_id,
  ];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    return res.json({ message: "School added successfully" });
  });
});

app.get("/read", (req, res) => {
  const sql = "SELECT * FROM schools";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    return res.json(result);
  });
});

app.listen(8081, () => {
  console.log("Server listening on port 8081");
});
