import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

app.get('/search', async (req, res) => {
    const query = req.query.q;
    const apiUrl = `https://hiroshi-rest-api.replit.app/search/spotify?search=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching from API:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
