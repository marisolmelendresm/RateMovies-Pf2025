const db = require("./database");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const SECRET = process.env.JWT_SECRET;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend is alive");
});

function auth(req, res, next) {
  const header = req.headers.authorization;

  if (!header) return res.status(401).json({ error: "No token" });

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch(err) {
    console.error(err);
    res.status(403).json({ error: "Invalid token" });
  }
}

app.post("/signup", async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `INSERT INTO users (fullname, username, email, password)
    VALUES (?, ?, ?, ?)`

    db.run(query, [fullName, username, email, hashedPassword], function(err) {
      if (err) {
        if (err.message.includes('UNIQUE')) {
          return res.status(409).json({message: "Username or email already exists"});
        }
        return res.status(500).json({message: "Database error"});
      }

      res.status(201).json({
        message: "User created successfully",
        userId: this.lastID,
      });
    })
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const query = `SELECT * FROM users WHERE username = ?`;

  db.get(query, [username], async (err, user) => {
    if (err) {
      return res.status(500).json({message: "Database error"});
    }

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    const token = jwt.sign(
      {id: user.id, fullName: user.fullname, username: user.username, email: user.email},
      SECRET,
      {expiresIn: "1h"}
    )
    res.status(200).json({ token });
  })
});

app.post("/watched", (req, res) => {
  const { userId, movieId } = req.body;
  const query = `INSERT INTO watchedRecord (userId, movieId)
  VALUES (?, ?)`
  try {
    db.run(query, [userId, movieId], function(err) {
      if (err) {
        return res.status(500).json({message: "Database error"});
      }
      res.status(201).json({message: "Watched record saved"});
    })
  } catch {
    res.status(500).json({message: "Server error"});
  }
  
})

app.post("/review", (req, res) => {
  try {
    const { userId, movieId, star, text } = req.body;
    console.log("Received request", userId, movieId, star, text);

    const query = `INSERT INTO reviews (userId, movieId, star, text)
    VALUES (?, ?, ?, ?)`;

    db.run(query, [userId, movieId, star, text], function(err) {
      if (err) {
        return res.status(500).json({message: "Database error"});
      }
      res.status(201).json({
        message: "Review saved"
      });
    })
  } catch (err) {
    res.status(500).json({message: "Server error"});
  }
});

app.get("/users/watchedCount", auth, (req, res) => {
  const userId = req.user.id;
  const query = `SELECT COUNT(*) AS watchedCount FROM watchedRecord WHERE userId = ? AND date >= '2026-01-01' AND date < '2027-01-01'`;
  
  db.get(query, [userId], function(err, row) {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }
    res.status(200).json({count: row.watchedCount});
  })
});

// User specific categories

app.get("/users/movieCategory/watch-again", auth, (req, res) => {
  const userId = req.user.id;
  const query = 'SELECT DISTINCT movieId FROM watchedRecord WHERE userId = ? LIMIT 12';

  db.all(query, [userId], function(err, rows) {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }
    const movieIds = rows.map(row => row.movieId);
    res.status(200).json(movieIds);
  });
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});

app.get("/users/movieCategory/favorites", auth, (req, res) => {
  const userId = req.user.id;
  const query = 'SELECT DISTINCT movieId FROM reviews WHERE userId = ? ORDER BY star DESC LIMIT 12';

  db.all(query, [userId], function(err, rows) {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }

    const movieIds = rows.map(row => row.movieId);
    res.status(200).json(movieIds);
  });
})

// All user categories

app.get("/movieCategory/best-rated", (req, res) => {
  const query = 'SELECT DISTINCT movieId FROM reviews ORDER BY star DESC LIMIT 12';

  db.all(query, function(err, rows) {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }
    const movieIds = rows.map(row => row.movieId);
    res.status(200).json(movieIds);
  });
});

app.get("/movieCategory/most-watched", (req, res) => {
  const query = 'SELECT movieId, COUNT(*) as watchedCount FROM watchedRecord GROUP BY movieId ORDER BY watchedCount DESC LIMIT 12';

  db.all(query, (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }
    const movieIds = rows.map(row => row.movieId);
    res.status(200).json(movieIds);
  })
})