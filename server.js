// @ts-check
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { australianPlays, australianMovies, educationalPlatforms } from './src/models/AustralianContent.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes for Australian content
app.get('/api/australian-content/plays', (req, res) => {
  try {
    res.json(australianPlays);
  } catch (error) {
    console.error('Error serving plays:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/australian-content/movies', (req, res) => {
  try {
    res.json(australianMovies);
  } catch (error) {
    console.error('Error serving movies:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/australian-content/search', (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const searchResults = {
      plays: australianPlays.filter(play =>
        play.title.toLowerCase().includes(query.toLowerCase()) ||
        play.playwright.toLowerCase().includes(query.toLowerCase()) ||
        play.themes.some(theme => theme.toLowerCase().includes(query.toLowerCase()))
      ),
      movies: australianMovies.filter(movie =>
        movie.title.toLowerCase().includes(query.toLowerCase()) ||
        movie.director.toLowerCase().includes(query.toLowerCase()) ||
        movie.themes.some(theme => theme.toLowerCase().includes(query.toLowerCase()))
      )
    };

    res.json(searchResults);
  } catch (error) {
    console.error('Error searching content:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/australian-content/resources', (req, res) => {
  try {
    const resources = {
      plays: australianPlays.map(play => ({
        id: play.id,
        title: play.title,
        educationalResources: play.educationalResources,
        curriculum: play.curriculum
      })),
      movies: australianMovies.map(movie => ({
        id: movie.id,
        title: movie.title,
        educationalResources: movie.educationalResources,
        curriculum: movie.curriculum
      }))
    };
    res.json(resources);
  } catch (error) {
    console.error('Error serving resources:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
}); 