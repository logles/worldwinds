const Login: React.FC = () => {
  return (
    <div className="about-me">
      <h1>Login Page</h1>
      <p>Welcome! Please log in to access your account.</p>
      <form>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" placeholder="Enter your username" />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
