import { type ReactNode, useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowRight, ChevronLeft, ChevronRight, Clock3, Facebook, Instagram, MapPin, Menu, Phone, Play, Search, ShieldCheck, Sparkles, Star, X, Youtube } from 'lucide-react';

export const navItems = [
  { href: '/', label: 'Accueil' },
  { href: '/equipements', label: 'Équipements' },
  { href: '/annonces', label: 'Annonces' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/contact', label: 'Contact' },
];

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 group" data-testid="link-logo">
      <span className={`relative grid h-10 w-10 place-items-center rounded-xl ${inverse ? 'bg-accent' : 'bg-primary'} text-primary-foreground overflow-hidden`}>
        <span className="absolute -right-3 -top-3 h-7 w-7 rounded-full border-4 border-primary-foreground/20" />
        <span className="font-display text-lg font-bold italic">W</span>
      </span>
      <span className={`font-display leading-[.86] tracking-[-.06em] ${inverse ? 'text-white' : 'text-primary'}`}>
        <span className="block text-[17px] font-bold">SMART</span>
        <span className="block text-[17px] font-bold text-accent">WEWA</span>
      </span>
    </Link>
  );
}

export function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="container-wide flex h-[76px] items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-7 md:flex" aria-label="Navigation principale">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`} className={`relative py-2 text-[13px] font-semibold transition-colors hover:text-primary ${location === item.href ? 'text-primary' : 'text-muted-foreground'}`}>
              {item.label}
              {location === item.href && <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-accent" />}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <a href="tel:+243812345678" className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-primary" data-testid="link-header-phone">
            <Phone size={14} /> +243 81 234 56 78
          </a>
          <Link href="/contact" className="rounded-lg bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-[0_8px_20px_rgba(28,61,133,.18)] transition-transform hover:-translate-y-0.5" data-testid="link-header-contact">Parlons-nous</Link>
        </div>
        <button type="button" className="grid h-10 w-10 place-items-center rounded-lg border border-border md:hidden" onClick={() => setOpen(!open)} aria-label="Ouvrir le menu" data-testid="button-menu">
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-border bg-background px-5 py-4 md:hidden" aria-label="Navigation mobile">
          {navItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="block border-b border-border/60 py-3 text-sm font-semibold" data-testid={`link-mobile-${item.label.toLowerCase().replaceAll(' ', '-')}`}>{item.label}</Link>)}
          <Link href="/contact" onClick={() => setOpen(false)} className="mt-4 block rounded-lg bg-primary px-4 py-3 text-center text-sm font-bold text-primary-foreground" data-testid="link-mobile-contact">Parlons-nous</Link>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-wide grid gap-10 py-14 md:grid-cols-[1.35fr_.8fr_.8fr_1fr]">
        <div>
          <Logo inverse />
          <p className="mt-5 max-w-xs text-sm leading-6 text-primary-foreground/70">La référence des motards de Kinshasa. De bons équipements, de bonnes infos, et une communauté qui veille les uns sur les autres.</p>
          <div className="mt-6 flex gap-2">
            {[{ label: 'Facebook', icon: Facebook }, { label: 'Instagram', icon: Instagram }, { label: 'YouTube', icon: Youtube }].map(({ label, icon: Icon }) => <a key={label} href="#" aria-label={label} className="grid h-9 w-9 place-items-center rounded-full border border-primary-foreground/20 transition-colors hover:bg-accent" data-testid={`link-footer-${label.toLowerCase()}`}><Icon size={15} /></a>)}
          </div>
        </div>
        <div><p className="mb-4 text-xs font-bold uppercase tracking-[.18em] text-accent">Découvrir</p>{navItems.slice(1, 4).map((item) => <Link key={item.href} href={item.href} className="mb-3 block text-sm text-primary-foreground/70 hover:text-white" data-testid={`link-footer-nav-${item.label}`}>{item.label}</Link>)}</div>
        <div><p className="mb-4 text-xs font-bold uppercase tracking-[.18em] text-accent">Le terrain</p><p className="mb-3 text-sm text-primary-foreground/70">Conseils sécurité</p><p className="mb-3 text-sm text-primary-foreground/70">Points relais</p><p className="mb-3 text-sm text-primary-foreground/70">Devenir partenaire</p></div>
        <div><p className="mb-4 text-xs font-bold uppercase tracking-[.18em] text-accent">Nous trouver</p><div className="mb-3 flex gap-2 text-sm text-primary-foreground/70"><MapPin size={15} className="mt-0.5 shrink-0 text-accent" /> Kinshasa, République démocratique du Congo</div><a href="mailto:contact@smartwewa.cd" className="mb-3 block text-sm text-primary-foreground/70 hover:text-white" data-testid="link-footer-email">contact@smartwewa.cd</a><a href="tel:+243812345678" className="block text-sm text-primary-foreground/70 hover:text-white" data-testid="link-footer-phone">+243 81 234 56 78</a></div>
      </div>
      <div className="border-t border-primary-foreground/10"><div className="container-wide flex flex-col justify-between gap-2 py-5 text-xs text-primary-foreground/50 md:flex-row"><span>© 2025 Smart Wewa. Fait à Kinshasa.</span><span>Rouler mieux commence par se préparer.</span></div></div>
    </footer>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  return <div className="noise min-h-[100dvh] bg-background"><Header />{children}<Footer /></div>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.22em] text-accent"><span className="h-1.5 w-1.5 rounded-full bg-accent" />{children}</p>;
}

export function SectionHeading({ eyebrow, title, text, align = 'left' }: { eyebrow: string; title: string; text?: string; align?: 'left' | 'center' }) {
  return <div className={`${align === 'center' ? 'mx-auto text-center' : ''} max-w-2xl`}><Eyebrow>{eyebrow}</Eyebrow><h2 className="font-display text-3xl font-bold leading-[1.05] tracking-[-.045em] text-foreground md:text-5xl">{title}</h2>{text && <p className="mt-5 max-w-xl text-[15px] leading-7 text-muted-foreground">{text}</p>}</div>;
}

export function ButtonLink({ href, children, secondary = false }: { href: string; children: ReactNode; secondary?: boolean }) {
  return <Link href={href} className={`group inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-bold transition-all hover:-translate-y-0.5 ${secondary ? 'border border-border bg-card text-foreground hover:border-primary/40' : 'bg-primary text-primary-foreground shadow-[0_10px_24px_rgba(28,61,133,.2)] hover:bg-[#163267]'}`} data-testid={`link-cta-${href.replaceAll('/', '') || 'home'}`}>{children}<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></Link>;
}

type Slide = { image: string; kicker: string; title: string; text: string };
export function Carousel({ slides, compact = false }: { slides: Slide[]; compact?: boolean }) {
  const [current, setCurrent] = useState(0);
  useEffect(() => { const timer = window.setInterval(() => setCurrent((i) => (i + 1) % slides.length), 5000); return () => window.clearInterval(timer); }, [slides.length]);
  const slide = slides[current];
  return <div className={`group relative overflow-hidden rounded-2xl ${compact ? 'aspect-[1.35] md:aspect-[1.7]' : 'min-h-[520px] md:min-h-[650px]'}`} data-testid="carousel-showcase">
    {slides.map((item, index) => <img key={item.image} src={item.image} alt={item.title} className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${index === current ? 'opacity-100' : 'opacity-0'}`} />)}
    <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/35 to-transparent" />
    <div className={`relative flex h-full flex-col justify-end ${compact ? 'p-6' : 'p-7 md:p-14'} text-white`}>
      <div key={current} className="reveal max-w-xl"><p className="mb-3 text-xs font-bold uppercase tracking-[.2em] text-orange-200">{slide.kicker}</p><h3 className={`${compact ? 'text-2xl' : 'text-4xl md:text-6xl'} font-display font-bold leading-[.95] tracking-[-.06em]`}>{slide.title}</h3><p className="mt-4 max-w-md text-sm leading-6 text-white/75">{slide.text}</p></div>
      <div className="mt-7 flex items-center justify-between"><div className="flex gap-1.5">{slides.map((item, index) => <button key={item.image} type="button" onClick={() => setCurrent(index)} className={`h-1 rounded-full transition-all ${index === current ? 'w-9 bg-accent' : 'w-4 bg-white/40 hover:bg-white/70'}`} aria-label={`Aller à la diapositive ${index + 1}`} data-testid={`button-slide-${index}`} />)}</div><div className="flex gap-2"><button type="button" onClick={() => setCurrent((current - 1 + slides.length) % slides.length)} className="grid h-9 w-9 place-items-center rounded-full border border-white/30 bg-white/10 hover:bg-white/20" aria-label="Diapositive précédente" data-testid="button-carousel-previous"><ChevronLeft size={17} /></button><button type="button" onClick={() => setCurrent((current + 1) % slides.length)} className="grid h-9 w-9 place-items-center rounded-full border border-white/30 bg-white/10 hover:bg-white/20" aria-label="Diapositive suivante" data-testid="button-carousel-next"><ChevronRight size={17} /></button></div></div>
    </div>
  </div>;
}

export function TrustBar() {
  return <div className="border-y border-border bg-card"><div className="container-wide grid grid-cols-2 divide-x divide-y divide-border md:grid-cols-4 md:divide-y-0">{[['10K+', 'motards accompagnés'], ['500+', 'équipements disponibles'], ['200+', 'partenaires locaux'], ['50K+', 'annonces publiées']].map(([value, label], index) => <div key={label} className="flex items-center gap-3 px-4 py-5 md:px-7"><span className="font-display text-2xl font-bold text-primary">{value}</span><span className="max-w-[100px] text-[11px] leading-4 text-muted-foreground">{label}</span>{index === 0 && <Star size={14} className="ml-auto text-accent" />}</div>)}</div></div>;
}

export const Arrow = ArrowRight;
export { Clock3, MapPin, Play, Search, ShieldCheck, Sparkles };