const mysql = require('mysql2');

// Create a connection pool (use pool instead of single connection)
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,  // Adjust based on your need
    queueLimit: 0         // No limit on queued connection requests
});

// Use the pool to handle database queries
module.exports = async (req, res) => {
    console.log('Received a request:', req.method);

    // Log environment variables for debugging (you may want to remove this later for security reasons)
    console.log('DB_HOST:', process.env.DB_HOST);
    console.log('DB_USER:', process.env.DB_USER);
    console.log('DB_NAME:', process.env.DB_NAME);
    
    // Pool connection health check (optional)
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error establishing a database connection:', err.message);
            return res.status(500).json({ error: 'Database connection failed', details: err.message });
        } else {
            console.log('Database connection established');
            connection.release(); // Release the connection back to the pool
        }
    });

    if (req.method === 'GET') {
        const sql = 'SELECT * FROM plates';
        console.log('Executing SQL:', sql);

        // Use the pool to query the database
        pool.query(sql, (err, results) => {
            if (err) {
                console.error('Error executing SQL query:', err.message);
                return res.status(500).json({ error: 'Server error', details: err.message });
            }

            if (results.length === 0) {
                console.log('No plates found in the database');
                return res.status(200).json([]);
            }

            console.log('Returning plates:', results);
            return res.status(200).json(results);
        });

    } else if (req.method === 'POST') {
        console.log('Handling POST request');
        const { name, category, description, cook_time, servings } = req.body;

        // Validate incoming data
        if (!name || !category || !description || !cook_time || !servings) {
            console.error('Missing required fields');
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const sql = `INSERT INTO plates (name, category, description, cook_time, servings) VALUES (?, ?, ?, ?, ?)`;
        const values = [name, category, description, cook_time, servings];
        console.log('Executing SQL:', sql, 'with values:', values);

        pool.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error inserting plate:', err.message);
                return res.status(500).json({ error: 'Server error', details: err.message });
            }
            console.log('Plate added successfully with ID:', result.insertId);
            return res.status(201).json({ message: 'Plate added successfully', plateId: result.insertId });
        });

    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
