import axios from 'axios';
import { australianPlays, australianMovies } from '../models/AustralianContent';

const API_URL = 'http://localhost:3001/api/australian-content';

export const australianContentService = {
    // Fetch all plays
    getAllPlays: async () => {
        try {
            const response = await axios.get(`${API_URL}/plays`);
            return response.data.length > 0 ? response.data : australianPlays;
        } catch (error) {
            console.error('Error fetching plays:', error);
            return australianPlays; // Return static data on error
        }
    },

    // Fetch a specific play
    getPlayById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/plays/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching play:', error);
            throw error;
        }
    },

    // Fetch all movies
    getAllMovies: async () => {
        try {
            const response = await axios.get(`${API_URL}/movies`);
            return response.data.length > 0 ? response.data : australianMovies;
        } catch (error) {
            console.error('Error fetching movies:', error);
            return australianMovies; // Return static data on error
        }
    },

    // Fetch a specific movie
    getMovieById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/movies/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching movie:', error);
            throw error;
        }
    },

    // Search across plays and movies
    search: async (query) => {
        try {
            const response = await axios.get(`${API_URL}/search`, {
                params: { query }
            });
            return response.data;
        } catch (error) {
            console.error('Error searching content:', error);
            // Return filtered static data on error
            const searchValue = query.toLowerCase();
            return {
                plays: australianPlays.filter(play =>
                    play.title.toLowerCase().includes(searchValue) ||
                    play.playwright.toLowerCase().includes(searchValue) ||
                    play.themes.some(theme => theme.toLowerCase().includes(searchValue))
                ),
                movies: australianMovies.filter(movie =>
                    movie.title.toLowerCase().includes(searchValue) ||
                    movie.director.toLowerCase().includes(searchValue) ||
                    movie.themes.some(theme => theme.toLowerCase().includes(searchValue))
                )
            };
        }
    },

    // Fetch educational resources
    getEducationalResources: async () => {
        try {
            const response = await axios.get(`${API_URL}/resources`);
            return response.data;
        } catch (error) {
            console.error('Error fetching educational resources:', error);
            throw error;
        }
    }
}; 