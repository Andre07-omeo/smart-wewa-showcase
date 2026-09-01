import { type FormEvent, type ReactNode, useEffect, useState, useMemo, memo } from 'react';
import { Link } from 'wouter';
import { ArrowRight, Check, Mail, MapPin, MessageCircle, PackageCheck, Phone, Send, Shield, SlidersHorizontal } from 'lucide-react';
import { ButtonLink, Carousel, Eyebrow, SectionHeading, Shell, TrustBar } from '@/components/site';

// ========== HERO SLIDES ==========
const heroSlides = [
  {
    image: '/images/hero-rider.jpeg',
    kicker: 'La référence des motards de Kinshasa',
    title: 'La Route est à nous, la Sécurité est notre Priorité.',
    text: 'Des équipements certifiés, des conseils de terrain et une communauté soudée pour que chaque trajet soit un retour assuré.'
  },
  {
    image: '/images/community-riders.jpg',
    kicker: 'Une communauté qui se protège',
    title: 'Smart Wewa, c\'est la garantie de rouler en confiance.',
    text: 'Retrouvez les bons plans, les rendez-vous et les réflexes qui font la différence sur les routes de Kinshasa.'
  },
];

// ========== TYPES ==========
type Product = {
  title: string;
  price: string;
  category: string;
  images: string[];
  tone: string
};

// ========== DONNÉES AVEC 3 IMAGES PAR PRODUIT ==========
const equipment: Product[] = [
  {
    title: 'Gilets',
    price: '',
    category: 'Gilets',
    images: [
      '/images/gilet-1.jpg',
      '/images/gilet-2.jpg',
      '/images/gilet-3.jpg'
    ],
    tone: 'bg-[#e3e7ef]'
  },
  {
    title: 'Carte biométrique',
    price: '',
    category: 'Carte biométrique',
    images: [
      '/images/carte-1.jpg',
      '/images/carte-2.jpg',
      '/images/carte-3.jpg'
    ],
    tone: 'bg-[#eee9df]'
  },
  {
    title: 'Téléphone',
    price: '',
    category: 'Téléphone',
    images: [
      '/images/telephone-1.jpg',
      '/images/telephone-2.jpg',
      '/images/telephone-3.jpg'
    ],
    tone: 'bg-[#dce5e4]'
  },
];

// ========== COMPOSANT PRODUCT CARD AVEC CARROUSEL ==========
const ProductCard = memo(function ProductCard({ item }: { item: Product }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % item.images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [item.images.length]);

  // Générer des clés uniques pour chaque élément
  const imageKey = (idx: number) => `img-${item.title}-${idx}`;
  const dotKey = (idx: number) => `dot-${item.title}-${idx}`;

  return (
    <div className="group block" data-testid={`card-product-${item.title}`}>
      <div className={`relative aspect-square overflow-hidden rounded-xl ${item.tone}`}>
        {item.images.map((img, idx) => (
          <img
            key={imageKey(idx)}
            src={img}
            alt={`${item.title} - ${idx + 1}`}
            className={`absolute inset-0 h-full w-full object-cover mix-blend-multiply transition-opacity duration-700 ease-in-out ${idx === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            loading="lazy"
          />
        ))}

        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {item.images.map((_, idx) => (
            <span
              key={dotKey(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-4 bg-primary' : 'w-1.5 bg-primary/40'
                }`}
            />
          ))}
        </div>

        <span className="absolute left-3 top-3 rounded-full bg-card/90 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-primary">
          {item.category}
        </span>
      </div>
      <div className="mt-3">
        <h3 className="font-display text-sm font-bold">{item.title}</h3>
        {item.price && <p className="mt-1 text-xs font-bold text-accent">{item.price}</p>}
      </div>
    </div>
  );
});

// ========== PAGE D'ACCUEIL ==========
export function HomePage() {
  return (
    <Shell>
      <main>
        {/* HERO SECTION */}
        <section className="site-grid overflow-hidden">
          <div className="container-wide grid items-center gap-10 py-12 md:grid-cols-[.8fr_1.2fr] md:py-20">
            <div className="reveal order-2 md:order-1">
              <h1 className="font-display max-w-xl text-5xl font-bold leading-[.92] tracking-[-.065em] text-primary md:text-7xl">
                Un motard identifié,<br />
                <span className="text-accent">une route sécurisée.</span>
              </h1>
              <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">
                Smart Wewa, c'est la garantie de rouler en confiance. Des équipements testés,
                une communauté vigilante et des conseils qui sauvent des vies.
              </p>
            </div>
            <div className="reveal delay-2 order-1 md:order-2">
              <Carousel slides={heroSlides} />
            </div>
          </div>
        </section>

        {/* SECTION FEATURES */}
        <section className="container-wide py-10 md:py-15">
          <div className="grid items-end gap-8 md:grid-cols-[1fr_auto]">
            <SectionHeading
              eyebrow="Pourquoi Smart Wewa ?"
              title="La sécurité n'est jamais un luxe. C'est une habitude."
              text="Nous sélectionnons avec rigueur des équipements fiables et partageons des conseils pratiques pour que chaque motard rentre chez lui en toute sérénité."
            />
            <ButtonLink href="/a-propos" secondary>Découvrir Smart Wewa</ButtonLink>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <Feature
              icon={<Shield />}
              title="Sécurité avant tout"
              text="La carte biométrique Smart Wewa, c'est votre passeport sécurisé sur la route. Associée à notre gilet haute visibilité, elle vous protège et vous identifie en toute circonstance. Parce qu'un motard visible et reconnu est un motard protégé."
            />
            <Feature
              icon={<PackageCheck />}
              title="Équipement certifié"
              text="Chez Smart Wewa, chaque équipement est choisi avec soin pour répondre aux réalités des routes de Kinshasa. La fiabilité et la sécurité sont nos seuls critères de sélection."
            />
            <Feature
              icon={<MessageCircle />}
              title="Communauté solidaire"
              text="Des annonces utiles, des partenaires de confiance et des histoires de terrain. La force du collectif au service de votre sécurité."
            />
          </div>
        </section>

        {/* SECTION EQUIPEMENTS */}
        <section className="bg-[#e9edf2] py-20 md:py-24">
          <div className="container-wide grid items-center gap-12 md:grid-cols-[.75fr_1.25fr]">
            <div>
              <SectionHeading
                eyebrow="Notre sélection"
                title="Smart Wewa, c'est vous"
                text="Votre gilet vous rend visible. Votre carte biométrique vous rend unique. Ensemble, nous faisons de la route un espace plus sûr."
              />
              <div className="mt-7">
                <ButtonLink href="/equipements">Voir tous les équipements</ButtonLink>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 md:gap-5">
              {equipment.map((item) => (
                <ProductCard key={item.title} item={item} />
              ))}
            </div>
          </div>
        </section>

        {/* SECTION COMMUNAUTÉ */}
        <section className="container-wide pb-20 md:pb-28">
          <Carousel slides={[
            {
              image: '/images/community-riders.jpg',
              kicker: 'Le mouvement Smart Wewa',
              title: 'La sécurité est une affaire de tous.',
              text: 'Chaque semaine, nous partageons des itinéraires sécurisés, des conseils de prévention et des rendez-vous pour renforcer la solidarité entre motards.'
            },
            {
              image: '/images/hero-rider.jpg',
              kicker: 'La parole du terrain',
              title: 'Les bons gestes se transmettent.',
              text: 'Un conseil donné au bon moment peut sauver une vie. C\'est pourquoi nous croyons en la force de l\'entraide.'
            }
          ]} compact />
        </section>

        <Newsletter />
      </main>
    </Shell>
  );
}

// ========== COMPOSANT FEATURE ==========
function Feature({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
      <div className="mb-8 grid h-11 w-11 place-items-center rounded-lg bg-[#e6ebf5] text-primary">{icon}</div>
      <h3 className="font-display text-xl font-bold tracking-[-.04em]">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
      <Link href="/a-propos" className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-primary" data-testid={`link-feature-${title}`}>
        En savoir plus <ArrowRight size={14} />
      </Link>
    </div>
  );
}

// ========== PAGE ÉQUIPEMENTS ==========
export function EquipementsPage() {
  const [category, setCategory] = useState('Tous');
  const categories = ['Tous', 'Gilets', 'Carte biométrique', 'Téléphone'];

  // Utiliser useMemo pour éviter les recalculs inutiles
  const visible = useMemo(() => {
    return category === 'Tous'
      ? equipment
      : equipment.filter((p) => p.category === category);
  }, [category]);

  // Fonction pour changer de catégorie
  const handleCategoryChange = (selectedCategory: string) => {
    setCategory(selectedCategory);
  };

  return (
    <Shell>
      <main className="site-grid">
        {/* ===== SECTION TITRE ===== */}
        <div className="container-wide pt-16 md:pt-24 pb-6 md:pb-10">
          <div className="max-w-3xl mx-auto text-center reveal">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="h-px w-12 bg-accent/30" />
              <span className="text-xs font-bold uppercase tracking-[.22em] text-accent">Smart Wewa</span>
              <span className="h-px w-12 bg-accent/30" />
            </div>

            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-[-.06em] text-primary md:text-7xl">
              Bien équipé, <br className="hidden sm:block" />
              <span className="text-accent">mieux protégé.</span>
            </h1>

            <div className="mt-4 flex justify-center">
              <span className="inline-block h-1 w-16 rounded-full bg-accent" />
            </div>

            <p className="mt-6 max-w-2xl mx-auto text-base leading-7 text-muted-foreground">
              Découvrez notre sélection d'équipements pour rouler avec confiance, que ce soit pour le travail ou le plaisir.
            </p>
          </div>
        </div>

        {/* ===== FILTRES / CATÉGORIES (NON CLIQUABLES) ===== */}
        <div className="container-wide pb-6 md:pb-8">
          <div className="flex flex-wrap justify-center gap-2 overflow-x-auto pb-2">
            {categories.map((item) => {
              const count = item === 'Tous'
                ? equipment.length
                : equipment.filter(p => p.category === item).length;

              const isActive = category === item;

              return (
                <span
                  key={item}
                  className={`whitespace-nowrap rounded-full border px-5 py-2.5 text-xs font-bold cursor-default select-none transition-all duration-200 ${isActive
                    ? 'border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20'
                    : 'border-border bg-card text-muted-foreground/60'
                    }`}
                  data-testid={`button-category-${item}`}
                >
                  {item}
                  <span className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[9px] ${isActive
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                    }`}>
                    {count}
                  </span>
                </span>
              );
            })}
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground">
              Affichage de <span className="font-bold text-primary">{visible.length}</span> équipement{visible.length > 1 ? 's' : ''}
              {category !== 'Tous' && (
                <span> dans la catégorie <span className="font-bold text-accent">{category}</span></span>
              )}
            </p>
          </div>
        </div>
        {/* ===== GRILLE PRODUITS ===== */}
        <div className="container-wide pb-16 md:pb-24">
          {visible.length > 0 ? (
            <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
              {visible.map((item) => (
                <ProductCard key={item.title} item={item} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-border bg-card/50 p-16 text-center transition-all hover:border-primary/30">
              <SlidersHorizontal className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 font-display text-xl font-bold text-foreground">Aucun équipement dans cette catégorie</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Essayez une autre catégorie ou revenez plus tard pour découvrir nos nouveautés.
              </p>
              <button
                onClick={() => handleCategoryChange('Tous')}
                className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-primary/90"
              >
                Voir tous les équipements
              </button>
            </div>
          )}
        </div>
      </main>
    </Shell>
  );
}

// ========== PAGE À PROPOS ==========
export function AboutPage() {
  return (
    <Shell>
      <main>
        <section className="site-grid">
          <div className="container-wide grid items-center gap-12 py-16 md:grid-cols-[.85fr_1.15fr] md:py-24">
            <div>
              <Eyebrow>Notre histoire</Eyebrow>
              <h1 className="font-display text-5xl font-bold leading-[.94] tracking-[-.06em] text-primary md:text-7xl">
                La route est notre terrain,<br />
                <span className="text-accent">la sécurité notre engagement.</span>
              </h1>
              <p className="mt-7 max-w-lg text-base leading-7 text-muted-foreground">
                Smart Wewa est né d'une conviction : chaque motard mérite de rouler en confiance. 
                Nous sommes une communauté qui veille, des équipements qui protègent et des réflexes 
                qui sauvent. Parce qu'à Kinshasa, la route se partage et la sécurité se construit ensemble.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/contact">Rejoindre la communauté</ButtonLink>
                <ButtonLink href="/equipements" secondary>Explorer nos équipements</ButtonLink>
              </div>
            </div>
            <div className="relative">
              <img src="/images/community-riders.jpg" alt="Groupe de motards Smart Wewa à Kinshasa" className="aspect-[4/3] w-full rounded-2xl object-cover" />
              <div className="absolute -bottom-5 -left-5 rounded-xl bg-accent p-5 text-white shadow-xl">
                <p className="font-display text-3xl font-bold">2027</p>
                <p className="mt-1 text-xs text-white/80">Smart Wewa</p>
              </div>
            </div>
          </div>
        </section>

        <section className="container-wide grid gap-10 py-20 md:grid-cols-3 md:py-28">
          <AboutValue 
            number="01" 
            title="Écouter le terrain" 
            text="Nos meilleures idées naissent au bord de la route, pas dans une salle de réunion. Chaque motard est une source d'inspiration."
          />
          <AboutValue 
            number="02" 
            title="La fiabilité avant tout" 
            text="Nous ne recommandons que ce que nous avons testé et approuvé. Un équipement doit tenir ses promesses, un conseil doit sauver des vies."
          />
          <AboutValue 
            number="03" 
            title="Avancer ensemble" 
            text="Un motard bien équipé devient un repère pour les autres. C'est ainsi que nous faisons grandir la sécurité sur les routes de Kinshasa."
          />
        </section>

        {/* ===== SECTION NOTRE PROMESSE ===== */}
        <section className="bg-background py-20 border-t border-border">
          <div className="container-wide grid items-center gap-10 md:grid-cols-[1fr_auto]">
            <div>
              <Eyebrow>Notre promesse</Eyebrow>
              <h2 className="font-display max-w-2xl text-4xl font-bold leading-none tracking-[-.05em] text-primary md:text-6xl">
                Sur la route, <br className="hidden sm:block" />
                <span className="text-accent">la confiance est notre carburant.</span>
              </h2>
            </div>
            <div className="max-w-xs border-l border-primary/20 pl-6 text-sm leading-6 text-muted-foreground">
              Nous construisons des outils, des liens et des réflexes pour que chaque motard rentre chez lui en toute sérénité.
            </div>
          </div>
        </section>
      </main>
    </Shell>
  );
}

function AboutValue({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <div className="border-t-2 border-primary pt-5">
      <span className="font-mono text-xs font-bold text-accent">{number}</span>
      <h3 className="mt-7 font-display text-2xl font-bold tracking-[-.04em]">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
    </div>
  );
}
// ========== PAGE CONTACT ==========
export function ContactPage() {
  const [sent, setSent] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); };

  return (
    <Shell>
      <main className="site-grid">
        <div className="container-wide grid gap-12 py-16 md:grid-cols-[.8fr_1.2fr] md:py-24">
          <div>
            <Eyebrow>On est à votre écoute</Eyebrow>
            <h1 className="font-display text-5xl font-bold leading-[.94] tracking-[-.06em] text-primary md:text-7xl">
              Restons connectés,<br />
              <span className="text-accent">la route est plus sûre.</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">
              Une question sur nos équipements, une suggestion pour la communauté ou un partenariat ? 
              Notre équipe est à votre écoute depuis Kinshasa.
            </p>
            <div className="mt-10 space-y-5">
              <ContactDetail icon={<MapPin />} label="Notre base" text="Kinshasa, République démocratique du Congo" />
              <ContactDetail icon={<Phone />} label="Téléphone" text="+243 81 234 56 78" />
              <ContactDetail icon={<Mail />} label="Email" text="contact@smartwewa.cd" />
            </div>
            <img src="/images/contact-kinshasa.jpg" alt="Kinshasa, ville de Smart Wewa" className="mt-10 aspect-[16/8] w-full rounded-xl object-cover" />
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-[0_20px_50px_rgba(31,48,83,.08)] md:p-10">
            {sent ? (
              <div className="flex min-h-[450px] flex-col items-center justify-center text-center">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-[#e1eee7] text-[#25724b]">
                  <Check size={28} />
                </div>
                <h2 className="mt-6 font-display text-3xl font-bold tracking-[-.04em]">Message bien reçu !</h2>
                <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
                  Merci pour votre message. Un membre de la communauté Smart Wewa vous répondra dès que possible.
                </p>
                <button 
                  type="button" 
                  onClick={() => setSent(false)} 
                  className="mt-7 text-sm font-bold text-primary underline underline-offset-4 hover:text-accent transition-colors" 
                  data-testid="button-contact-new"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Nom complet
                  </label>
                  <input 
                    id="name" 
                    required 
                    placeholder="Votre nom" 
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/10" 
                    data-testid="input-contact-name" 
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Email
                  </label>
                  <input 
                    id="email" 
                    type="email" 
                    required 
                    placeholder="vous@exemple.com" 
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/10" 
                    data-testid="input-contact-email" 
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Sujet
                  </label>
                  <select 
                    id="subject" 
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary" 
                    data-testid="select-contact-subject"
                  >
                    <option>Une question générale</option>
                    <option>Devenir partenaire Smart Wewa</option>
                    <option>Conseil sur un équipement</option>
                    <option>Rejoindre la communauté</option>
                    <option>Suggestions pour la route</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Votre message
                  </label>
                  <textarea 
                    id="message" 
                    required 
                    rows={5} 
                    placeholder="Partagez-nous tout..." 
                    className="w-full resize-none rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/10" 
                    data-testid="textarea-contact-message" 
                  />
                </div>
                <button 
                  type="submit" 
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground transition-all hover:bg-[#163267] hover:shadow-lg" 
                  data-testid="button-contact-submit"
                >
                  Envoyer le message <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </Shell>
  );
}

function ContactDetail({ icon, label, text }: { icon: ReactNode; label: string; text: string }) {
  return (
    <div className="flex gap-3">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#e6ebf5] text-primary">{icon}</div>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="mt-1 text-sm font-semibold">{text}</p>
      </div>
    </div>
  );
}

// ========== NEWSLETTER ==========
function Newsletter() {
  const [done, setDone] = useState(false);
  return (
    <section className="bg-[#e9edf2]">
      <div className="container-wide flex flex-col justify-between gap-7 py-12 md:flex-row md:items-center">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-[-.04em] md:text-3xl">Les bons réflexes, directement dans votre boîte.</h2>
        </div>
        {done ? (
          <p className="flex items-center gap-2 text-sm font-bold text-[#25724b]">
c:\Users\omeon\Downloads\Moto_Gilet_Rouge_Fidele_4K (2).png          </p>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="flex w-full max-w-md gap-2">
            <input required type="email" placeholder="Votre adresse email" className="min-w-0 flex-1 rounded-lg border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary" data-testid="input-newsletter-email" />
            <button type="submit" className="rounded-lg bg-accent px-4 py-3 text-sm font-bold text-white" data-testid="button-newsletter-submit">S'inscrire</button>
          </form>
        )}
      </div>
    </section>
  );
}