import { useEffect, useMemo, useState } from 'react'
import {
  ArrowDown, ArrowRight, ArrowUpRight, CalendarDays, Check, ChefHat, ChevronDown,
  Clock3, Flower2, Heart, Instagram, MapPin, Menu, Moon, Search, Sparkles, Sun,
  Users, Utensils, X
} from 'lucide-react'

type Category = 'All' | 'Catering' | 'Décor' | 'Packages'
type Service = { id: number; name: string; category: Exclude<Category, 'All'>; price: string; detail: string; image: string; tag?: string }

const photos = {
  hero: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1800&q=88',
  food: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1000&q=85',
  wedding: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85',
  table: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=85',
  floral: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1000&q=85',
  buffet: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=85',
  birthday: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=85',
  decor: 'https://images.unsplash.com/photo-1507504031003-b417219a0chado?auto=format&fit=crop&w=1000&q=85',
}

const services: Service[] = [
  { id: 1, name: 'The Gathered Table', category: 'Catering', price: 'From R 420 / guest', detail: 'Seasonal sharing menu, beautifully plated.', image: photos.food, tag: 'Guest favourite' },
  { id: 2, name: 'The Ceremony Edit', category: 'Décor', price: 'From R 8,500', detail: 'Floral moments, aisle styling and statement backdrops.', image: photos.wedding, tag: 'Bestseller' },
  { id: 3, name: 'The Golden Hour', category: 'Packages', price: 'From R 24,900', detail: 'A considered pairing of food, tablescape and styling.', image: photos.table, tag: 'Curated package' },
  { id: 4, name: 'Garden Brunch', category: 'Catering', price: 'From R 360 / guest', detail: 'Fresh, abundant brunch boards and artisan pastries.', image: photos.buffet },
  { id: 5, name: 'Botanical Stories', category: 'Décor', price: 'From R 6,800', detail: 'Organic florals, layered linens and candlelight.', image: photos.floral },
  { id: 6, name: 'Celebration House', category: 'Packages', price: 'From R 18,500', detail: 'An intimate celebration, styled from welcome to farewell.', image: photos.birthday },
]

const testimonials = [
  { quote: 'Every detail felt intentional. Our guests are still talking about the food and the tablescape.', name: 'Amara & Sizwe', type: 'Wedding celebration' },
  { quote: 'The team understood our brief immediately and made a complex corporate event feel effortless.', name: 'Nandi M.', type: 'Corporate dinner' },
  { quote: 'Beautiful styling, generous food and thoughtful communication from the first call.', name: 'Lebo K.', type: 'Milestone birthday' },
]

function App() {
  const [category, setCategory] = useState<Category>('All')
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dark, setDark] = useState(false)
  const [saved, setSaved] = useState<number[]>([])
  const [toast, setToast] = useState('')
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  const filtered = useMemo(() => services.filter(s =>
    (category === 'All' || s.category === category) &&
    `${s.name} ${s.detail} ${s.category}`.toLowerCase().includes(query.toLowerCase())
  ), [category, query])

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('.reveal')
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target) }
    }), { threshold: 0.12 })
    nodes.forEach(node => observer.observe(node))
    return () => observer.disconnect()
  }, [category])

  useEffect(() => {
    document.body.classList.toggle('dark', dark)
    return () => document.body.classList.remove('dark')
  }, [dark])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setBookingOpen(false); setLoginOpen(false); setSearchOpen(false) } }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(''), 3200) }
  const toggleSaved = (id: number) => setSaved(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  return (
    <div className="site-shell">
      <header className="header">
        <a className="brand" href="#home" aria-label="ÉVÉNTE home">ÉVÉNTE<span>.</span></a>
        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
          <a href="#services" onClick={() => setMenuOpen(false)}>Explore</a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>Our approach</a>
          <a href="#stories" onClick={() => setMenuOpen(false)}>Stories</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <div className="header-actions">
          <button className="icon-button" aria-label="Search services" onClick={() => setSearchOpen(true)}><Search size={18}/></button>
          <button className="icon-button theme-button" aria-label="Toggle theme" onClick={() => setDark(!dark)}>{dark ? <Sun size={18}/> : <Moon size={18}/>}</button>
          <button className="text-button login-button" onClick={() => setLoginOpen(true)}>Sign in</button>
          <button className="button button-dark header-cta" onClick={() => setBookingOpen(true)}>Plan your event <ArrowUpRight size={15}/></button>
          <button className="icon-button menu-toggle" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
        </div>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line"/> THE ART OF GATHERING</div>
            <h1>Make room for<br/><em>moments</em> that matter.</h1>
            <p className="hero-description">Thoughtfully curated catering and event styling for the celebrations you’ll remember long after the last guest leaves.</p>
            <div className="hero-actions">
              <button className="button button-dark" onClick={() => setBookingOpen(true)}>Start planning <ArrowUpRight size={16}/></button>
              <a className="underlined-link" href="#services">Discover our services <ArrowDown size={14}/></a>
            </div>
            <div className="hero-note"><div className="avatar-stack"><span>A</span><span>S</span><span>N</span></div><div><strong>Made personal, always.</strong><small>Events with your story at the centre.</small></div></div>
          </div>
          <div className="hero-visual">
            <img src={photos.hero} alt="Elegant event table setting with flowers and warm candlelight"/>
            <div className="hero-image-label"><Sparkles size={15}/><span>THE DETAILS MAKE THE DAY</span></div>
            <div className="hero-stamp"><span>GOOD<br/>THINGS<br/><i>GATHER</i></span><Flower2 size={23}/></div>
          </div>
          <div className="hero-bottom"><span>01 / 04</span><span className="scroll-hint">SCROLL TO EXPLORE <span/></span><span>DURBAN · SOUTH AFRICA</span></div>
        </section>

        <section className="intro section-wrap reveal" id="experience">
          <div className="intro-kicker">A LITTLE MORE THAN AN EVENT</div>
          <div className="intro-content">
            <h2>Good gatherings<br/>are <em>never</em> accidental.</h2>
            <div className="intro-text"><p>We bring the right people, flavours and finishing touches together. From the first moodboard to the final toast, our team makes the process feel as considered as the occasion itself.</p><a href="#contact" className="circle-link" aria-label="Talk to our team"><ArrowUpRight/></a></div>
          </div>
        </section>

        <section className="services-section" id="services">
          <div className="section-wrap">
            <div className="section-heading reveal">
              <div><div className="eyebrow"><span className="eyebrow-line"/> THE COLLECTION</div><h2>Find your kind<br/>of <em>celebration.</em></h2></div>
              <p>Start with a service, or let us bring the whole picture together. Every experience is tailored to your people and your place.</p>
            </div>
            <div className="catalog-toolbar reveal">
              <div className="filters" role="group" aria-label="Filter services">
                {(['All', 'Catering', 'Décor', 'Packages'] as Category[]).map(c => <button key={c} className={`filter-chip ${category === c ? 'active' : ''}`} onClick={() => setCategory(c)}>{c}</button>)}
              </div>
              <span className="result-count">{filtered.length.toString().padStart(2, '0')} EXPERIENCES</span>
            </div>
            <div className="service-grid">
              {filtered.map((service, index) => <article className="service-card reveal" key={service.id}>
                <div className="service-image"><img src={service.image} alt={service.name}/>{service.tag && <span className="service-tag">{service.tag}</span>}<button className={`save-button ${saved.includes(service.id) ? 'saved' : ''}`} aria-label="Save service" onClick={() => toggleSaved(service.id)}><Heart size={17} fill={saved.includes(service.id) ? 'currentColor' : 'none'}/></button><span className="service-index">0{index + 1}</span></div>
                <div className="service-meta"><span>{service.category.toUpperCase()}</span><span>{service.price}</span></div>
                <div className="service-title-row"><h3>{service.name}</h3><button className="arrow-link" aria-label={`Enquire about ${service.name}`} onClick={() => setBookingOpen(true)}><ArrowUpRight size={18}/></button></div>
                <p>{service.detail}</p>
              </article>)}
              {filtered.length === 0 && <div className="empty-state">No experiences found. Try another search or category.</div>}
            </div>
            <div className="catalog-bottom"><span>CAN’T FIND WHAT YOU’RE IMAGINING?</span><button className="underlined-link" onClick={() => setBookingOpen(true)}>Tell us what you have in mind <ArrowUpRight size={15}/></button></div>
          </div>
        </section>

        <section className="feature section-wrap reveal">
          <div className="feature-image"><img src={photos.birthday} alt="Beautifully styled celebration table with floral arrangements"/></div>
          <div className="feature-copy"><div className="eyebrow"><span className="eyebrow-line"/> THE ÉVÉNTE DIFFERENCE</div><h2>From first idea<br/>to <em>final flourish.</em></h2><p>One thoughtful team. A clear process. A celebration that feels unmistakably yours.</p>
            <div className="steps"><div><span>01</span><div><strong>Tell us your story</strong><small>Share the occasion, the feeling and the little details.</small></div></div><div><span>02</span><div><strong>We shape the vision</strong><small>Receive a considered proposal made around your brief.</small></div></div><div><span>03</span><div><strong>Enjoy every moment</strong><small>We take care of the details while you make memories.</small></div></div></div>
            <button className="button button-outline" onClick={() => setBookingOpen(true)}>Let’s create something <ArrowUpRight size={15}/></button>
          </div>
        </section>

        <section className="quote-section" id="stories">
          <div className="section-wrap quote-inner reveal">
            <div className="eyebrow"><span className="eyebrow-line"/> KIND WORDS</div>
            <div className="quote-mark">“</div>
            <blockquote>{testimonials[activeTestimonial].quote}</blockquote>
            <div className="quote-footer"><div><strong>{testimonials[activeTestimonial].name}</strong><span>{testimonials[activeTestimonial].type}</span></div><div className="quote-controls"><button onClick={() => setActiveTestimonial((activeTestimonial + testimonials.length - 1) % testimonials.length)} aria-label="Previous testimonial">←</button><span>0{activeTestimonial + 1} / 0{testimonials.length}</span><button onClick={() => setActiveTestimonial((activeTestimonial + 1) % testimonials.length)} aria-label="Next testimonial">→</button></div></div>
          </div>
        </section>

        <section className="contact-section section-wrap" id="contact">
          <div className="contact-card reveal"><div className="contact-image"><img src={photos.table} alt="Elegant dinner table ready for guests"/></div><div className="contact-copy"><div className="eyebrow"><span className="eyebrow-line"/> YOUR DATE, YOUR WAY</div><h2>Let’s make<br/><em>something</em> lovely.</h2><p>Have a date in mind? Tell us a little about your event and we’ll take it from there.</p><button className="button button-dark" onClick={() => setBookingOpen(true)}>Enquire about your date <ArrowUpRight size={16}/></button></div></div>
        </section>
      </main>

      <footer className="footer">
        <div className="section-wrap footer-main"><div><a className="brand footer-brand" href="#home">ÉVÉNTE<span>.</span></a><p>Thoughtful gatherings.<br/>Beautifully brought together.</p></div><div className="footer-links"><div><strong>EXPLORE</strong><a href="#services">Catering & décor</a><a href="#experience">Our approach</a><a href="#stories">Kind words</a></div><div><strong>GET IN TOUCH</strong><a href="mailto:hello@evente.co.za">hello@evente.co.za</a><a href="#contact">Durban, South Africa</a><a href="#contact">Book a consultation</a></div></div></div>
        <div className="section-wrap footer-bottom"><span>© 2025 ÉVÉNTE STUDIO. ALL RIGHTS RESERVED.</span><span>MADE FOR THE MOMENTS THAT MATTER.</span><a href="#home">BACK TO TOP ↑</a></div>
      </footer>

      {searchOpen && <div className="overlay" onMouseDown={e => { if (e.target === e.currentTarget) setSearchOpen(false) }}><div className="search-panel modal-panel"><button className="modal-close" onClick={() => setSearchOpen(false)} aria-label="Close search"><X/></button><div className="eyebrow">FIND YOUR EXPERIENCE</div><h2>What are you dreaming of?</h2><div className="search-field"><Search/><input autoFocus placeholder="Try ‘wedding’, ‘brunch’ or ‘florals’" value={query} onChange={e => setQuery(e.target.value)}/><button onClick={() => { setSearchOpen(false); document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' }) }}>Search</button></div><div className="quick-search">{['Wedding', 'Corporate', 'Birthday', 'Catering'].map(t => <button key={t} onClick={() => { setQuery(t); setCategory('All'); setSearchOpen(false); document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' }) }}>{t}</button>)}</div></div></div>}

      {loginOpen && <div className="overlay" onMouseDown={e => { if (e.target === e.currentTarget) setLoginOpen(false) }}><div className="modal-panel login-panel"><button className="modal-close" onClick={() => setLoginOpen(false)} aria-label="Close sign in"><X/></button><div className="eyebrow">WELCOME BACK</div><h2>Your celebrations,<br/><em>all in one place.</em></h2><p className="modal-sub">Customer accounts are coming soon. You can still send an enquiry today.</p><button className="button button-dark full-button" onClick={() => { setLoginOpen(false); setBookingOpen(true) }}>Start a booking enquiry <ArrowUpRight size={15}/></button><small className="fine-print">Account sign-in will be enabled when authentication is connected.</small></div></div>}

      {bookingOpen && <div className="overlay" onMouseDown={e => { if (e.target === e.currentTarget) setBookingOpen(false) }}><BookingModal onClose={() => setBookingOpen(false)} onSubmit={() => { setBookingOpen(false); notify('Your enquiry is ready for the ÉVÉNTE team. Connect the API to save it.') }}/></div>}
      {toast && <div className="toast"><Check size={17}/>{toast}</div>}
    </div>
  )
}

function BookingModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', event: 'Wedding', date: '', guests: '50–100', location: 'Durban', budget: 'R 15,000 – R 30,000', details: '' })
  const update = (key: keyof typeof form, value: string) => setForm(prev => ({ ...prev, [key]: value }))
  const valid = form.name.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && form.date
  return <div className="modal-panel booking-panel"><button className="modal-close" onClick={onClose} aria-label="Close booking form"><X/></button><div className="booking-heading"><div className="eyebrow">LET’S GET THE DETAILS</div><h2>Tell us about<br/><em>your occasion.</em></h2><p>Share a few details and our team will follow up with next steps.</p></div>
    <form onSubmit={e => { e.preventDefault(); if (valid) onSubmit() }}>
      <div className="form-grid"><label>Your name<input required value={form.name} onChange={e => update('name', e.target.value)} placeholder="Full name"/></label><label>Email address<input required type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@example.com"/></label><label>Type of event<select value={form.event} onChange={e => update('event', e.target.value)}>{['Wedding', 'Birthday', 'Corporate event', 'Private dinner', 'Baby shower', 'Other'].map(x => <option key={x}>{x}</option>)}</select></label><label>Preferred date<input required type="date" min={new Date().toISOString().slice(0,10)} value={form.date} onChange={e => update('date', e.target.value)}/></label><label>Guest count<select value={form.guests} onChange={e => update('guests', e.target.value)}>{['Under 30', '30–50', '50–100', '100–150', '150–250', '250+'].map(x => <option key={x}>{x}</option>)}</select></label><label>Event location<input value={form.location} onChange={e => update('location', e.target.value)} placeholder="City or venue"/></label><label className="wide-label">Estimated budget<select value={form.budget} onChange={e => update('budget', e.target.value)}>{['Under R 10,000', 'R 10,000 – R 15,000', 'R 15,000 – R 30,000', 'R 30,000 – R 60,000', 'R 60,000+', 'Not sure yet'].map(x => <option key={x}>{x}</option>)}</select></label><label className="wide-label">What are you imagining?<textarea rows={3} value={form.details} onChange={e => update('details', e.target.value)} placeholder="Tell us about the atmosphere, catering or décor you have in mind..."/></label></div>
      <div className="form-footer"><span><LockIcon/> Your details are only used to respond to this enquiry.</span><button className="button button-dark" disabled={!valid}>Send enquiry <ArrowUpRight size={15}/></button></div>
    </form>
  </div>
}
function LockIcon() { return <Check size={13}/> }

export default App
