function About() {
    return (
        <main className="about-page">
            <section className="about-intro">
                <p className="eyebrow">THE STUDY SPACE</p>
                <h1>Learning, made more <span>focused.</span></h1>
                <p className="about-lede">
                    AI Study Assistant helps students turn difficult questions into clear,
                    useful explanations they can actually learn from.
                </p>
                <div className="about-meta">
                    <span><i className="status-dot" />Built for curious minds</span>
                    <span>01 / About the project</span>
                </div>
            </section>

            <section className="about-details">
                <div>
                    <p className="section-label">WHY IT EXISTS</p>
                    <h2>A calmer way to get unstuck.</h2>
                    <p>
                        Ask a question, choose a subject, and get an answer that meets you
                        at your level. The goal is not just to finish homework, but to make
                        the next concept feel a little less intimidating.
                    </p>
                </div>
                <div className="technology-panel">
                    <p className="section-label">THE TOOLKIT</p>
                    <ul>
                        <li><span>01</span>React</li>
                        <li><span>02</span>Vite</li>
                        <li><span>03</span>React Router</li>
                        <li><span>04</span>Google Gemini AI</li>
                        <li><span>05</span>Fetch API</li>
                        <li><span>06</span>CSS</li>
                    </ul>
                </div>
            </section>

            <footer className="site-footer">
                <div className="footer-brand">
                    <strong>AI<span>.</span>STUDY</strong>
                    <p>Small steps. Clear answers. Better learning.</p>
                </div>
                <div className="footer-links">
                    <a href="/">Home</a>
                    <a href="/assistant">Ask the assistant</a>
                </div>
                <p className="footer-copyright">© 2026 AI Study Assistant</p>
            </footer>
        </main>
    );
}

export default About;