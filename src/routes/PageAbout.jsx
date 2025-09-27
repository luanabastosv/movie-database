function PageAbout() {
  return (
    <main>
      <section className="about-card">
        <div className="about-content">
          <h2>About MUVI</h2>
          <p>
            Muvi is your ultimate destination for discovering, exploring, and
            diving deep into the world of cinema. Whether you’re a casual
            viewer, film student, or hardcore cinephile, Muvi offers a dynamic,
            user-friendly database that brings movies to life through rich
            metadata, curated content, and intelligent search tools. Dive into
            detailed movie pages complete with a lot of information. 
          </p>
          <p className="tmdb">This product uses the TMDb API but is not endorsed or certified by TMDb.</p>
          <img src="/assets/images/tmdb-logo.svg" alt="TMDB Logo" />
        </div>
      </section>
    </main>
  );
}

export default PageAbout;
