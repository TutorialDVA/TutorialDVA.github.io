import axios from 'axios';
import { CharacterState } from '../redux/slices/characterSlice';

let API_URL = 'https://arixal.pythonanywhere.com/api';
if (process.env.NODE_ENV === 'development') {
    API_URL = 'http://localhost:5050/api'
} else {
    API_URL = 'https://arixal.pythonanywhere.com/api';
}

export const submitCharacter = async (characterData: CharacterState) => {
    try {
        // Prepare data in the format expected by the backend
        const submitData = {
            character_data: characterData
        };

        // Make POST request to the API
        const response = await axios.post(`${API_URL}/characters`, submitData);

        // Handle success
        console.log('Response:', response.data);
        return response.data
    } catch (error) {
        // Handle error
        console.error('Error submitting character:', error);
    }
}

export const getCharacter = async (id: string) => {
    try {
        // Make POST request to the API
        const response = await axios.get(`${API_URL}/characters/${id}`);

        // Handle success
        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        // Handle error
        console.error('Error retrieving character:', error);
    }
}
