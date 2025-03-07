function Home() {
  return (
    <div className="about-me">
      <div className="about-me-content">
        <div className="about-text">
          <section>
            <label>Country search:</label>
            <input placeholder="Where do you want to go?" />
            <section>
              <button>Add this location to my bucket list</button>
            </section>
          </section>

          <section>
            <label>My dream destinations:</label>
          </section>

          <section>
            <label>
              How's the weather in <input placeholder="Athens" /> today?
            </label>
            <button>Search</button>
          </section>

          <section>
            <button>Reset search</button>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Home;
