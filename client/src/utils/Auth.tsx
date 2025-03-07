import { jwtDecode, JwtPayload } from "jwt-decode";

class AuthService {
  getProfile() {
    const token = this.getToken();
    return token ? jwtDecode<JwtPayload>(token) : null;
  }

  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.exp) {
        return decoded.exp * 1000 < Date.now();
      }
      return false;
    } catch (error) {
      return true;
    }
  }

  getToken(): string {
    return localStorage.getItem("token") || "";
  }

  login(idToken: string) {
    localStorage.setItem("token", idToken);
    window.location.assign("/");
  }

  logout() {
    localStorage.removeItem("token");
    window.location.assign("/login");
  }
}

export default new AuthService();
