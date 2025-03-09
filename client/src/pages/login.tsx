import { useState } from "react";
import { login } from "../api/authAPI";
import { UserLogin } from "../interfaces/UserLogin";

interface LoginProps {
  setActiveSection: (section: string) => void;
  setIsAuthenticated: (auth: boolean) => void;
}

const Login = ({ setActiveSection, setIsAuthenticated }: LoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userInfo: UserLogin = {
      username,
      password,
    };

    const response = await login(userInfo);
    console.log(response); // Handle response as needed

    // Assuming the response has a success property
    if (response.success) {
      setIsAuthenticated(true);
      setActiveSection("Home");
    } else {
      console.error("Login failed", response);
    }
  };

  return (
    <div className="about-me">
      <h1>Login</h1>
      <p>Welcome! Please log in to access your account.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
