import Home from "./pages/Home";
import BucketList from "./pages/bucketList";
import Login from "./pages/login";
import Footer from "./components/footer";
import Header from "./components/header";
import Register from "./pages/register";
import { useState } from "react";

import "./index.css";

// import "./App.css";

function App() {
  const [activeSection, setActiveSection] = useState("Register");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div>
      {/* Render Header only if authenticated */}
      {isAuthenticated && <Header setActiveSection={setActiveSection} />}
      <main>
        {activeSection === "Home" && isAuthenticated && <Home />}
        {activeSection === "Bucket List" && isAuthenticated && <BucketList />}
        {activeSection === "Login" && (
          <Login
            setIsAuthenticated={setIsAuthenticated}
            setActiveSection={setActiveSection}
          />
        )}
        {activeSection === "Register" && (
          <Register setActiveSection={setActiveSection} />
        )}
      </main>
      <Footer
        setActiveSection={setActiveSection}
        setIsAuthenticated={setIsAuthenticated}
      />
    </div>
  );
}

export default App;
