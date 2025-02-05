const express = require('express');
const router = express.Router();
const { australianPlays, australianMovies } = require('../models/australianContent');

// Get all content
router.get('/', (req, res) => {
    res.json({
        plays: australianPlays,
        movies: australianMovies
    });
});

// Get all plays
router.get('/plays', (req, res) => {
    res.json(australianPlays);
});

// Get a specific play
router.get('/plays/:id', (req, res) => {
    const play = australianPlays.find(p => p.id === req.params.id);
    if (!play) {
        return res.status(404).json({ message: 'Play not found' });
    }
    res.json(play);
});

// Get all movies
router.get('/movies', (req, res) => {
    res.json(australianMovies);
});

// Get a specific movie
router.get('/movies/:id', (req, res) => {
    const movie = australianMovies.find(m => m.id === req.params.id);
    if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie);
});

// Get content by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const content = [...australianPlays, ...australianMovies].find(item => item.id === id);

    if (!content) {
        return res.status(404).json({ message: 'Content not found' });
    }

    res.json(content);
});

// Search across both plays and movies
router.get('/search', (req, res) => {
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
});

// Get educational resources
router.get('/resources', (req, res) => {
    const resources = {
        plays: australianPlays.map(play => ({
            id: play.id,
            title: play.title,
            educationalResources: play.educationalResources,
            curriculumOutcomes: play.curriculumOutcomes
        })),
        movies: australianMovies.map(movie => ({
            id: movie.id,
            title: movie.title,
            educationalResources: movie.educationalResources,
            curriculumOutcomes: movie.curriculumOutcomes
        }))
    };
    res.json(resources);
});

// Get curriculum information for content
router.get('/:id/curriculum', (req, res) => {
    const { id } = req.params;
    const content = [...australianPlays, ...australianMovies].find(item => item.id === id);

    if (!content) {
        return res.status(404).json({ message: 'Content not found' });
    }

    res.json(content.curriculum);
});

// Filter content by curriculum year level
router.get('/curriculum/:year', (req, res) => {
    const { year } = req.params;
    const results = [...australianPlays, ...australianMovies].filter(item =>
        item.curriculum.year.includes(year)
    );

    res.json(results);
});

module.exports = router; 