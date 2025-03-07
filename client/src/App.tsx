import Home from "./pages/Home";
import BucketList from "./pages/bucketList";
import Login from "./pages/login";
import Footer from "./components/footer";
import Header from "./components/header";
import { useState } from "react";

function App() {
  const [activeSection, setActiveSection] = useState("Home");

  return (
    <div>
      <Header setActiveSection={setActiveSection} />{" "}
      <main>
        {activeSection === "Home" && <Home />}
        {activeSection === "Bucket List" && <BucketList />}
        {activeSection === "Login" && <Login />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
