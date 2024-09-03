import config from '../config/config.json';

// There's currently only the dev environment
const apiBaseUrl = config.dev.api_configs.apiBaseUrl;

class ApiService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async registerUser(username, email, password) {
        const url = `${this.baseUrl}/register`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password,
                }),
            });
            
            if (!response.ok) {
                const errorText = await response.text(); 
                throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error registering user:', error);
            throw error;
        }
    }

    async loginUser(username, password) {
        const url = `${this.baseUrl}/login`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    hashed_password: password,
                }),
            });
            
            if (!response.ok) {
                const errorText = await response.text(); 
                throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error registering user:', error);
            throw error;
        }
    }

    async verifyUserToken(token) {
        const url = `${this.baseUrl}/verify-token`;

        if (!token) {
            throw new Error('No token found in local storage');
        }

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error verifying token:', error);
            throw error;
        }
    }
}

const apiService = new ApiService(apiBaseUrl);

export default apiService;
