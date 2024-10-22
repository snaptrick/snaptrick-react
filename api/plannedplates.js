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
    console.log('Received a request:', req.method);

    if (req.method === 'GET') {
        const sql = 'SELECT * FROM plates';
        console.log('Executing SQL:', sql);

        db.query(sql, (err, results) => {
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

        const sql = `INSERT INTO plates (name, category, description, cook_time, servings) VALUES (?, ?, ?, ?, ?)`;
        const values = [name, category, description, cook_time, servings];
        console.log('Executing SQL:', sql, 'with values:', values);

        db.query(sql, values, (err, result) => {
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
