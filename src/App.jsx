import { useEffect, useRef } from 'react'

const github = 'https://github.com/salimovone'
const projects = [
  {
    slug: 'shared-memory',
    repo: 'Inter-process-communication',
    name: 'Shared memory',
    stack: 'C# / Inter-process communication',
    description:
      'A producer and a consumer exchange data through a shared ring buffer.',
  },
  {
    slug: 'kernel-driver',
    repo: 'first_driver',
    name: 'First kernel driver',
    stack: 'C++ / Windows',
    description:
      'A Windows driver project with separate kernel-mode and user-mode programs.',
  },
  {
    slug: 'memory-counter',
    repo: 'ProcessResourceMonitor',
    name: 'Process Resource Monitor',
    stack: 'C# / Performance counters',
    description:
      'A console tool that reads the private working set of a running Notepad process in megabytes.',
  },
]

export default function App() {
  const plate = useRef(null)

  useEffect(() => {
    let cancelled = false
    let dispose
    import('./monogram.js')
      .then(({ mountMonogram }) => {
        if (!cancelled) dispose = mountMonogram(plate.current)
      })
      .catch(() => {
        // The SVG remains visible if the module or WebGL is unavailable.
      })
    return () => {
      cancelled = true
      dispose?.()
    }
  }, [])

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
              Systems developer working with C++ and C# on Windows drivers,
              shared memory and process diagnostics.
            </p>
            <a className="button" href="#work">
              Explore my work <span aria-hidden="true">↓</span>
            </a>
          </div>
          <figure>
            <div className="monogram" ref={plate}>
              <img
                src={import.meta.env.BASE_URL + 'profile-print.svg'}
                alt="An isometric letter S built from stepped layers of blue ink."
              />
            </div>
          </figure>
        </section>
        <section id="work" aria-labelledby="work-title">
          <div className="heading">
            <h2 id="work-title">Systems projects</h2>
            <a href={github + '?tab=repositories'}>All repositories ↗</a>
          </div>
          <div className="projects">
            {projects.map((p) => (
              <a key={p.repo} className="project" href={github + '/' + p.repo}>
                <h3>
                  <img
                    className="project-art"
                    src={import.meta.env.BASE_URL + p.slug + '.svg'}
                    alt={p.name}
                  />
                </h3>
                <p className="mono">{p.stack}</p>
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
