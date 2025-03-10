import React, { useState } from "react";
import logo from "../assets/logo.png";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface RegisterPageProps {
  setActiveSection: (section: string) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ setActiveSection }) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/profile/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("form data", formData);

      //THIS IS WHERE THE ERROR IS HAPPENING, not printing response.ok
      if (!response.ok) {
        console.log("response.ok", response.ok);
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }
      console.log("response.json", response.json);

      setMessage("Registration successful!");
      // Clear the form
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "",
      });
      // Redirect to the homepage
      setActiveSection("Home");
    } catch (error: any) {
      console.log("response err");
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="register-page">
      <img src={logo} alt="WorldWinds Logo" className="register-logo" />
      <h2>WorldWinds Registration</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="role">Current Location:</label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Register</button>
      </form>

      <div style={{ marginTop: "1rem" }}>
        <p>
          Already have an account?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveSection("Login");
            }}
          >
            Log in here
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
