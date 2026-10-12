import { useEffect, useState } from 'react'
import './App.css'

const skills = [
  { name: 'React', category: 'Frontend Framework', icon: '⚛️', level: '90%' },
  { name: 'CSS3', category: 'Styling', icon: '🎨', level: '95%' },
  { name: 'Responsive Design', category: 'Design', icon: '📱', level: '88%' },
  { name: 'JavaScript', category: 'Programming', icon: '🚀', level: '85%' },
  { name: 'Figma', category: 'Design Tools', icon: '🎯', level: '80%' },
  { name: 'Node.js', category: 'Backend', icon: '🌐', level: '75%' },
]

const projects = [
  {
    title: 'E-Commerce Platform', category: 'Full-Stack', filter: 'fullstack', color: '4f46e5',
    image: 'E-Commerce+App', alt: 'E-Commerce Platform',
    description: 'A modern e-commerce platform built with React and Node.js, featuring shopping cart, payment integration, and admin dashboard.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
  },
  {
    title: 'Weather Dashboard', category: 'Frontend', filter: 'frontend', color: '059669',
    image: 'Weather+App', alt: 'Weather Dashboard',
    description: 'Clean and intuitive weather dashboard with location search, 7-day forecast, and beautiful animations.',
    tags: ['JavaScript', 'CSS3', 'API'],
  },
  {
    title: 'Task Management App', category: 'Web App', filter: 'webapp', color: 'dc2626',
    image: 'Task+Manager', alt: 'Task Management App',
    description: 'Productivity app with drag-and-drop functionality, project collaboration, and deadline tracking.',
    tags: ['React', 'TypeScript', 'Firebase'],
  },
  {
    title: 'Creative Portfolio', category: 'Design', filter: 'design', color: '7c3aed',
    image: 'Portfolio+Site', alt: 'Portfolio Website',
    description: 'Responsive portfolio website for a graphic designer with interactive galleries and smooth animations.',
    tags: ['HTML5', 'CSS3', 'GSAP'],
  },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')
  const [formValues, setFormValues] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const validateField = (name, value) => {
    const trimmedValue = value.trim()
    if (name === 'name') return trimmedValue.length < 2 ? 'Name must be at least 2 characters' : ''
    if (name === 'email') return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue) ? 'Please enter a valid email address' : ''
    if (name === 'message') return trimmedValue.length < 10 ? 'Message must be at least 10 characters' : ''
    return ''
  }

  const handleNavClick = (event) => {
    event.preventDefault()
    const target = document.querySelector(event.currentTarget.getAttribute('href'))
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMenuOpen(false)
  }

  const handleFilterClick = (filter) => setActiveFilter(filter)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: validateField(name, value) }))
    setSubmitted(false)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    const nextErrors = Object.fromEntries(
      ['name', 'email', 'message'].map((name) => [name, validateField(name, formValues[name])]),
    )
    setErrors(nextErrors)

    if (Object.values(nextErrors).every((error) => !error)) {
      setSubmitted(true)
      setFormValues({ name: '', email: '', subject: '', message: '' })
      setErrors({})
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100
      document.querySelectorAll('section').forEach((section) => {
        const isActive = scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight
        if (isActive) {
          document.querySelectorAll('.nav-link').forEach((link) => link.classList.remove('active'))
          document.querySelector(`.nav-link[href="#${section.id}"]`)?.classList.add('active')
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const visibleProjects = activeFilter === 'all'
    ? projects
    : projects.filter((project) => project.filter === activeFilter)

  return (
    <div className="portfolio">
      <nav id="navbar">
        <div className="nav-brand"><span>Alex Johnson</span></div>
        <ul className={menuOpen ? 'nav-menu active' : 'nav-menu'}>
          {['home', 'about', 'skills', 'projects', 'contact'].map((section) => (
            <li key={section}><a href={`#${section}`} className="nav-link" onClick={handleNavClick}>{section[0].toUpperCase() + section.slice(1)}</a></li>
          ))}
        </ul>
        <button type="button" className={menuOpen ? 'nav-toggle active' : 'nav-toggle'} aria-label="Toggle navigation menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          <span></span><span></span><span></span>
        </button>
      </nav>

      <section id="home" className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Alex Johnson</h1>
          <p className="hero-subtitle">Frontend Developer &amp; UI Designer</p>
          <p className="hero-tagline">Creating beautiful, responsive web experiences with modern technologies</p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary" onClick={handleNavClick}>View Projects</a>
            <a href="#contact" className="btn btn-secondary" onClick={handleNavClick}>Get In Touch</a>
          </div>
        </div>
      </section>

      <section id="about" className="section">
        <div className="container">
          <h2>About Me</h2>
          <div className="about-grid">
            <div className="about-text">
              <p>I&apos;m a passionate frontend developer with 3 years of experience creating engaging digital experiences. I specialize in React, modern CSS, and responsive design patterns that work beautifully across all devices.</p>
              <div className="about-details">
                <div className="detail-item"><span className="detail-icon">📍</span><span>San Francisco, CA</span></div>
                <div className="detail-item"><span className="detail-icon">✉️</span><a href="mailto:alex@example.com">alex@example.com</a></div>
                <div className="detail-item"><span className="detail-icon">📱</span><span>(555) 123-4567</span></div>
              </div>
            </div>
            <div className="about-availability">
              <h3>Currently Available For:</h3>
              <div className="availability-tags"><span className="tag tag-available">Freelance</span><span className="tag tag-available">Full-Time</span><span className="tag tag-available">Remote</span></div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="section section-alt">
        <div className="container">
          <h2>Skills &amp; Technologies</h2>
          <div className="skills-grid">
            {skills.map((skill) => (
              <div className="skill-card" key={skill.name}>
                <div className="skill-header"><span className="skill-icon">{skill.icon}</span><h3 className="skill-name">{skill.name}</h3></div>
                <div className="skill-category">{skill.category}</div>
                <div className="skill-level"><div className="skill-progress" style={{ '--skill-level': skill.level }}></div></div>
                <span className="skill-percentage">{skill.level}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="section">
        <div className="container">
          <h2>Featured Projects</h2>
          <div className="filter-buttons" aria-label="Project filters">
            {[['all', 'All Projects'], ['frontend', 'Frontend'], ['fullstack', 'Full-Stack'], ['design', 'Design'], ['webapp', 'Web App']].map(([filter, label]) => (
              <button type="button" key={filter} className={activeFilter === filter ? 'filter-btn active' : 'filter-btn'} onClick={() => handleFilterClick(filter)}>{label}</button>
            ))}
          </div>
          <div className="projects-grid">
            {visibleProjects.map((project) => (
              <article className="project-card" data-category={project.filter} key={project.title}>
                <div className="project-image">
                  <img src={`https://via.placeholder.com/400x250/${project.color}/ffffff?text=${project.image}`} alt={project.alt} />
                  <div className="project-overlay"><div className="project-links"><a href="#projects" className="project-link">🔗 Live Demo</a><a href="#projects" className="project-link">💻 Code</a></div></div>
                </div>
                <div className="project-content">
                  <div className="project-header"><h3 className="project-title">{project.title}</h3><span className="project-category">{project.category}</span></div>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tags">{project.tags.map((tag) => <span className="project-tag" key={tag}>{tag}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section section-alt">
        <div className="container">
          <h2>Get In Touch</h2>
          <div className="contact-content">
            <p>I&apos;m always interested in hearing about new opportunities and projects. Feel free to reach out!</p>
            <form id="contact-form" className="contact-form" onSubmit={handleFormSubmit} noValidate>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input type="text" id="name" name="name" value={formValues.name} onChange={handleInputChange} className={errors.name ? 'error' : formValues.name ? 'success' : ''} aria-describedby={errors.name ? 'name-error' : undefined} />
                  {errors.name && <span id="name-error" className="error-message">{errors.name}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input type="email" id="email" name="email" value={formValues.email} onChange={handleInputChange} className={errors.email ? 'error' : formValues.email ? 'success' : ''} aria-describedby={errors.email ? 'email-error' : undefined} />
                  {errors.email && <span id="email-error" className="error-message">{errors.email}</span>}
                </div>
                <div className="form-group form-group-full"><label htmlFor="subject">Subject</label><input type="text" id="subject" name="subject" value={formValues.subject} onChange={handleInputChange} /></div>
                <div className="form-group form-group-full">
                  <label htmlFor="message">Message *</label>
                  <textarea id="message" name="message" rows="5" value={formValues.message} onChange={handleInputChange} className={errors.message ? 'error' : formValues.message ? 'success' : ''} aria-describedby={errors.message ? 'message-error' : undefined}></textarea>
                  {errors.message && <span id="message-error" className="error-message">{errors.message}</span>}
                </div>
                <div className="form-group form-group-full"><button type="submit" className="btn btn-primary">Send Message</button></div>
              </div>
              {submitted && <div className="success-message" role="status">Thank you! Your message has been sent successfully.</div>}
            </form>
          </div>
        </div>
      </section>

      <footer className="footer"><div className="container"><div className="footer-content"><p>© 2024 Alex Johnson. All rights reserved.</p><div className="social-links"><a href="#home" className="social-link">GitHub</a><a href="#home" className="social-link">LinkedIn</a><a href="#home" className="social-link">Twitter</a><a href="#home" className="social-link">Dribbble</a></div></div></div></footer>
    </div>
  )
}

export default App
