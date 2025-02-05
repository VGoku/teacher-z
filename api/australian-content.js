import { australianPlays, australianMovies, educationalPlatforms } from '../src/models/AustralianContent';

export default function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PUT,DELETE');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle OPTIONS request for CORS preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { query } = req.query;
    const path = req.url.split('?')[0];

    try {
        switch (path) {
            case '/api/australian-content/plays':
                res.status(200).json(australianPlays);
                break;

            case '/api/australian-content/movies':
                res.status(200).json(australianMovies);
                break;

            case '/api/australian-content/search':
                if (!query) {
                    res.status(400).json({ message: 'Search query is required' });
                    return;
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
                res.status(200).json(searchResults);
                break;

            case '/api/australian-content/resources':
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
                res.status(200).json(resources);
                break;

            default:
                res.status(404).json({ message: 'Route not found' });
        }
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
} 