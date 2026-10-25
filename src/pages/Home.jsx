import {Link} from "react-router-dom";

function Home() {
    return (
        <main className="home-page">
            <section className="hero">
                <div className="hero-copy">
                    <p className="eyebrow">PERSONAL LEARNING SYSTEM / 01</p>
                    <h1>Smart learning <span>with AI.</span></h1>
                    <p className="hero-description">
                        A focused AI study partner for breaking down difficult topics, finding the gaps,
                        and moving forward with clarity.
                    </p>

                    <div className="hero-actions">
                        <Link className="primary-action" to="/assistant">
                            Start a study session <span aria-hidden="true">-&gt;</span>
                        </Link>
                        <Link className="secondary-action" to="/about">Explore the system</Link>
                    </div>

                    <div className="hero-note">
                        <span className="status-dot" aria-hidden="true" />
                        Built for curious minds · Clear answers, less noise
                    </div>
                </div>

                <aside className="study-preview" aria-label="Study session preview">
                    <div className="preview-topline">
                        <span>SESSION / 01</span>
                        <span className="preview-status">READY</span>
                    </div>
                    <div className="preview-heading">
                        <p className="preview-kicker">TODAY&apos;S FOCUS</p>
                        <h2>Understand the why.</h2>
                        <p>Ask one good question. Build from there.</p>
                    </div>
                    <div className="preview-progress">
                        <div className="progress-label">
                            <span>Learning momentum</span>
                            <strong>72%</strong>
                        </div>
                        <div className="progress-track" aria-label="Learning momentum 72 percent">
                            <span />
                        </div>
                    </div>
                    <div className="preview-topics">
                        <span>JavaScript</span>
                        <span>React</span>
                        <span>Python</span>
                    </div>
                </aside>
            </section>

            <section className="home-stats" aria-label="Study assistant benefits">
                <div>
                    <strong>01</strong>
                    <span>Ask without overthinking</span>
                </div>
                <div>
                    <strong>02</strong>
                    <span>Learn in plain language</span>
                </div>
                <div>
                    <strong>03</strong>
                    <span>Keep your momentum</span>
                </div>
            </section>
        </main>
    );
}

export default Home;