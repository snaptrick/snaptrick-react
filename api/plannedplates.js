const mysql = require('mysql2');

// Create the database connection using environment variables
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
        return;
    }
    console.log('Connected to the Planned Plates database.');
});

module.exports = async (req, res) => {
    if (req.method === 'GET') {
        // Fetch all plates
        const sql = 'SELECT * FROM plates';
        db.query(sql, (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Server error' });
            }

            // Return empty array if no records are found
            if (results.length === 0) {
                return res.status(200).json([]);
            }

            // Return the results
            return res.status(200).json(results);
        });
    } else if (req.method === 'POST') {
        // Add a new plate (example of handling POST requests)
        const { name, category, description, cook_time, servings } = req.body;

        const sql = `INSERT INTO plates (name, category, description, cook_time, servings) VALUES (?, ?, ?, ?, ?)`;
        const values = [name, category, description, cook_time, servings];

        db.query(sql, values, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Server error' });
            }
            return res.status(201).json({ message: 'Plate added successfully', plateId: result.insertId });
        });
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
