import apiService from "./apiService";
import SHA256 from 'crypto-js/sha256';

class AuthService {
    constructor() {
        this.accessToken = localStorage.getItem('accessToken') || null;
    }

    async isAuthenticated() {
        try {
            const token = this.accessToken || localStorage.getItem('accessToken');
            
            if (!token) {
                return false;
            }

            const response = await apiService.verifyUserToken(token);

            if (response.message === "Token is valid") {
                return true;
            }

            this.clearAccessToken();
            return false;
        } catch (error) {
            console.error('Authentication check failed:', error);
            this.clearAccessToken();
            return false;
        }
    }

    async login(username, password) {
        this.clearAccessToken()

        try {
            const hashedPassword = SHA256(password).toString();
            const response = await apiService.loginUser(username, hashedPassword);
            console.log("Login successful:", response);
            this.setAccessToken(response.access_token)
            return true
          } catch (error) {
            console.error("There was an error during login:", error);
            alert("Login failed. Please check your credentials and try again.");
            return false
          }
    }

    logout() {
        this.clearAccessToken()
    }

    setAccessToken(token) {
        this.accessToken = token;
        localStorage.setItem('accessToken', token);
    }

    clearAccessToken() {
        this.accessToken = null;
        localStorage.removeItem('accessToken');
    }
}

const authService = new AuthService();

export default authService;
