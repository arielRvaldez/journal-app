import * as jwt_decode from 'jwt-decode';

class AuthService {
  getProfile() {
    const token = this.getToken();
    if (token) {
      return jwt_decode(token); // Using jwt_decode function to decode the token
    } else {
      return null;
    }
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isAuthenticated() { // Add isAuthenticated method
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = jwt_decode(token); // Using jwt_decode function to decode the token
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    localStorage.setItem('id_token', idToken);
    // Redirect to home page after successful login
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    // Redirect to home page after logout
    window.location.assign('/');
  }
}

export default new AuthService();
