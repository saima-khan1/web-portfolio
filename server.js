import express from 'express';
import mysql from 'mysql2';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import compression from 'compression';
import path from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(compression());
app.use(express.static(__dirname));

// Enable CORS for all routes
app.use(cors());
const pool = mysql.createPool({
  url: process.env.CLEARDB_DATABASE_URL,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    connection.release();
    console.log('Connected to the database.');
  }
});

app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.skypack.dev"
  );
  next();
});

app.get('/', (req, res) => {
  // Resolve the correct path for index.html using the path module
  const indexPath = path.join(__dirname, 'index.html');
  res.sendFile(indexPath);
});

app.get('/admin', (req, res) => {
  //res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5501');
  res.sendFile('admin.html', { root: __dirname });
});

// Fetch about content
app.get('/api/about', async (req, res) => {
  //res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5501');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  try {
    const connection = await pool.promise().getConnection();
    const [rows] = await connection.execute('SELECT * FROM about');
    connection.release();
    if (rows.length === 0) {
      res.status(404).json({ error: 'About content not found' });
    } else {
      const aboutData = {
        content: rows[0].content,
        skills: rows[0].skills,
        education: rows[0].education,
        experience: rows[0].experience,
      };
      res.json(aboutData);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/projects', async (req, res) => {
  //res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5501');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  try {
    const connection = await pool.promise().getConnection();
    const [results] = await connection.execute(
      'SELECT * FROM projects ORDER BY id DESC LIMIT 6'
    );
    connection.release();
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Api to update the About Me section
app.put('/api/update/about', async (req, res) => {
  const { content } = req.body;

  try {
    // Update the about content in the database
    const connection = await pool.promise().getConnection();
    await connection.execute('UPDATE about SET content = ?', [content]);
    connection.release();
    res.json({ message: 'About content updated successfully' });
  } catch (error) {
    console.error('Error updating about content:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Api to add new projects
app.post('/api/add/project', async (req, res) => {
  const { title, description, link, tag } = req.body;

  const sql =
    'INSERT INTO projects (title, description, link, tag) VALUES (?, ?, ?, ?)';
  try {
    const connection = await pool.promise().getConnection();
    await connection.execute(sql, [title, description, link, tag]);
    connection.release();
    res.json({ message: 'project added  successfully' });
  } catch (error) {
    console.error('Error adding new project', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Api to Delete project
app.delete('/api/delete/project', async (req, res) => {
  const { title } = req.body;

  const sql = 'DELETE FROM projects WHERE title = ?';
  try {
    const connection = await pool.promise().getConnection();
    await connection.execute(sql, [title]);
    connection.release();
    res.json({ message: 'project deleted sucessfully' });
  } catch (error) {
    console.log('error deleting ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/add/messages', async (req, res) => {
  const { name, email, message } = req.body;
  const sql = 'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)';
  try {
    const connection = await pool.promise().getConnection();
    await connection.execute(sql, [name, email, message]);
    connection.release();
    res.json({ message: 'message added  successfully' });
  } catch (error) {
    console.error('Error adding new message', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/messages', async (req, res) => {
  try {
    const connection = await pool.promise().getConnection();
    const [results] = await connection.execute(
      'SELECT * FROM messages ORDER BY id LIMIT 5'
    );
    connection.release();
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint to increment the visitor count and retrieve the count
app.get('/visitor_count', async (req, res) => {
  const uniqueId = req.headers['x-unique-id'];

  // Check if the user has already been counted (based on the unique identifier)
  if (!req.cookies.visitorCounted) {
    res.cookie('visitorCounted', 'true', { maxAge: 3600000 });

    try {
      // Check if the unique identifier has been counted before
      const connection = await pool.promise().getConnection();
      const [countResults] = await connection.execute(
        'SELECT visitor_count FROM visitor_counts WHERE unique_id = ?',
        [uniqueId]
      );
      connection.release();
      let currentCount = 0;

      if (countResults.length > 0) {
        currentCount = countResults[0].visitor_count;
      }

      if (currentCount === 0) {
        // Increment the count only if the unique identifier has not been counted before
        const newCount = currentCount + 1;

        // Update the visitor count in the database with the unique identifier
        await connection.execute(
          'INSERT INTO visitor_counts (unique_id, visitor_count) VALUES (?, ?) ON DUPLICATE KEY UPDATE visitor_count = ?',
          [uniqueId, newCount, newCount]
        );

        res.json({ count: newCount });
      } else {
        res.json({ count: currentCount });
      }
    } catch (error) {
      console.error('Error updating visitor count:', error);
      res.status(500).json({ error: 'Failed to update visitor count' });
    }
  } else {
    // If the user has already been counted, simply retrieve the count from the database and send it back
    try {
      const connection = await pool.promise().getConnection();
      const [countResults] = await connection.execute(
        'SELECT visitor_count FROM visitor_counts WHERE unique_id = ?',
        [uniqueId]
      );
      connection.release();
      let currentCount = 0;

      if (countResults.length > 0) {
        currentCount = countResults[0].visitor_count;
      }

      res.json({ count: currentCount });
    } catch (error) {
      console.error('Error fetching visitor count:', error);
      res.status(500).json({ error: 'Failed to fetch visitor count' });
    }
  }
});

// API endpoint to fetch the total visitor count
app.get('/total_visitor_count', async (req, res) => {
  try {
    // Get the total visitor count from the database
    const connection = await pool.promise().getConnection();
    const [countResults] = await connection.execute(
      'SELECT SUM(visitor_count) AS total_count FROM visitor_counts'
    );
    connection.release();
    const totalCount = countResults[0].total_count || 0;
    res.json({ totalCount });
  } catch (error) {
    console.error('Error fetching total visitor count:', error);
    res.status(500).json({ error: 'Failed to fetch total visitor count' });
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
