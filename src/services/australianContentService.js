import axios from 'axios';

const API_URL = 'http://localhost:3001/api/australian-content';

export const australianContentService = {
    // Fetch all plays
    getAllPlays: async () => {
        try {
            const response = await axios.get(`${API_URL}/plays`);
            return response.data;
        } catch (error) {
            console.error('Error fetching plays:', error);
            throw error;
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
            return response.data;
        } catch (error) {
            console.error('Error fetching movies:', error);
            throw error;
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
            throw error;
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