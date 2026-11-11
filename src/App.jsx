const github = 'https://github.com/salimovone'
const projects = [
  {
    name: 'Chess',
    repo: 'chess',
    stack: 'React / TypeScript / Redux',
    description:
      'An interactive chessboard built from individual squares, pieces and shared board state.',
    art: 'chess',
  },
  {
    name: 'Weather',
    repo: 'weather',
    stack: 'React / TypeScript',
    description:
      'A searchable weather interface for current conditions and the daily outlook.',
    art: 'weather',
  },
  {
    name: 'Process Resource Monitor',
    repo: 'ProcessResourceMonitor',
    stack: 'C# / Windows',
    description:
      'A console experiment that measures the private memory used by a running Notepad process.',
    art: 'process',
  },
]

function ProjectArt({ type }) {
  return (
    <div className={'art ' + type} aria-hidden="true">
      {type === 'chess' && <span className="board">♞</span>}
      {type === 'weather' && (
        <span className="sun">
          <i />
        </span>
      )}
      {type === 'process' && (
        <div className="meter">
          {[32, 48, 44, 64, 52, 80, 72, 88, 66, 50, 74, 60].map((value, i) => (
            <i key={i} style={{ height: value + '%' }} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function App() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header>
        <a className="brand" href="#main">
          <img
            src={import.meta.env.BASE_URL + 'mark.svg'}
            width="32"
            height="32"
            alt=""
          />
          salimovone
        </a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
          <a href={github}>GitHub ↗</a>
        </nav>
      </header>
      <main id="main">
        <section className="hero" aria-labelledby="name">
          <div>
            <p className="mono location">
              <span /> Tashkent, Uzbekistan
            </p>
            <h1 id="name">
              Sardor
              <br />
              <em>Salimov.</em>
            </h1>
            <p className="intro">
              Frontend developer building with React and TypeScript, and
              exploring how Windows works beneath the interface.
            </p>
            <a className="button" href="#work">
              Explore my work <span aria-hidden="true">↓</span>
            </a>
          </div>
          <figure>
            <img
              src={import.meta.env.BASE_URL + 'profile-print.svg'}
              alt="An isometric letter S built from stepped layers of blue ink."
            />
          </figure>
        </section>
        <section id="work" aria-labelledby="work-title">
          <div className="heading">
            <h2 id="work-title">Selected work</h2>
            <a href={github + '?tab=repositories'}>All repositories ↗</a>
          </div>
          <div className="projects">
            {projects.map((p) => (
              <a key={p.repo} className="project" href={github + '/' + p.repo}>
                <ProjectArt type={p.art} />
                <p className="mono">{p.stack}</p>
                <h3>
                  {p.name} <span aria-hidden="true">↗</span>
                </h3>
                <p>{p.description}</p>
              </a>
            ))}
          </div>
        </section>
      </main>
      <footer id="contact">
        <div>
          <p className="mono">Contact</p>
          <h2>Get in touch.</h2>
        </div>
        <div className="links">
          <a href="https://www.linkedin.com/in/salimovone/">LinkedIn ↗</a>
          <a href="https://medium.com/@salimovone">Medium ↗</a>
          <a href={github}>GitHub ↗</a>
        </div>
      </footer>
    </>
  )
}
