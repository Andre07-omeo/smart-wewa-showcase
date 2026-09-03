import { type FormEvent, type ReactNode, useEffect, useState, useMemo, memo } from 'react';
import { Link } from 'wouter';
import { 
  ArrowRight, 
  Check, 
  Mail, 
  MapPin, 
  MessageCircle, 
  PackageCheck, 
  Phone, 
  Send, 
  Shield, 
  SlidersHorizontal,
  PenTool,
  Printer,
  Laptop,
  Package,
  Award,
  Truck,
  Users,
  Star
} from 'lucide-react';
import { ButtonLink, Carousel, Eyebrow, SectionHeading, Shell, TrustBar } from '@/components/site';

// ========== HERO SLIDES ==========
const heroSlides = [
  {
    image: '/images/hero-rider.png',
    kicker: 'La référence des motards de Kinshasa',
    title: 'La Route est à nous, la Sécurité est notre Priorité.',
    text: 'Des équipements certifiés, des conseils de terrain et une communauté soudée pour que chaque trajet soit un retour assuré.'
  },
  {
    image: '/images/community-riders.PNG',
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

// ========== DONNÉES PRODUITS ==========
const equipment: Product[] = [
  {
    title: 'Gilets',
    price: '',
    category: 'Gilets',
    images: [
      '/images/gilet-1.PNG',
      '/images/2.PNG',
      '/images/gilet-2.PNG',
      '/images/4.PNG',
      '/images/gilet-3.PNG',
      '/images/1.PNG',
      '/images/gilet-4.PNG',
      '/images/3.PNG'
    ],
    tone: 'bg-[#e3e7ef]'
  },
  {
    title: 'Carte biométrique',
    price: '',
    category: 'Carte biométrique',
    images: [
      '/images/carte-1.PNG',
      '/images/Verso.PNG',
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

// ========== COMPOSANT PRODUCT CARD ==========
const ProductCard = memo(function ProductCard({ item }: { item: Product }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % item.images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [item.images.length]);

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
            className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ease-in-out ${
              idx === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
          />
        ))}

        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {item.images.map((_, idx) => (
            <span
              key={dotKey(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-4 bg-primary' : 'w-1.5 bg-primary/40'
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

// ========== COMPOSANT FEATURE ==========
function Feature({ icon, title, text, className = "", iconBg = "bg-[#e6ebf5]" }: { icon: ReactNode; title: string; text: string; className?: string; iconBg?: string }) {
  return (
    <div className={`rounded-xl border border-border p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg ${className || "bg-card"}`}>
      <div className={`mb-8 grid h-11 w-11 place-items-center rounded-lg ${iconBg}`}>
        {icon}
      </div>
      <h3 className={`font-display text-xl font-bold tracking-[-.04em] ${className?.includes("bg-[#2d3748]") ? "text-white" : ""}`}>{title}</h3>
      <p className={`mt-3 text-sm leading-6 ${className?.includes("bg-[#2d3748]") ? "text-gray-300" : "text-muted-foreground"}`}>{text}</p>
      <Link href="/a-propos" className={`mt-6 inline-flex items-center gap-2 text-xs font-bold ${className?.includes("bg-[#2d3748]") ? "text-white/80 hover:text-white" : "text-primary"}`} data-testid={`link-feature-${title}`}>
        En savoir plus <ArrowRight size={14} />
      </Link>
    </div>
  );
}

// ========== PAGE D'ACCUEIL ==========
export function HomePage() {
  return (
    <Shell>
      <main className="bg-gray-200">
        {/* HERO SECTION */}
        <section className="site-grid overflow-hidden">
          <div className="container-wide grid items-center gap-10 py-12 md:grid-cols-[.8fr_1.2fr] md:py-20">
            <div className="reveal order-2 md:order-1">
              <h1 className="font-display max-w-xl text-5xl font-bold leading-[.92] tracking-[-.065em] text-primary md:text-7xl">
                Un motard reconnu,<br />
                <span className="text-accent">un citoyen protégé.</span>
              </h1>
              <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">
                SmartWewa est votre allié sur la route. Des équipements certifiés,
                une communauté solidaire et des conseils avisés pour que chaque trajet
                soit placé sous le signe de la sérénité.
              </p>
              {/* ===== BOUTONS PRÉ-INSCRIPTION & INSCRIPTION ===== */}
              <div className="mt-8 flex flex-wrap gap-4">
                <a 
                  href="https://forms.gle/votre-lien-preinscription" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#D4A017] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#b8890f] hover:shadow-lg hover:-translate-y-1"
                >
                  Pré-inscription <ArrowRight size={16} />
                </a>
                <a 
                  href="https://votre-site-externe.com/inscription" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#2d3748] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#1a202c] hover:shadow-lg hover:-translate-y-1"
                >
                  S'inscrire <ArrowRight size={16} />
                </a>
              </div>
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
              title="La sécurité n'est pas une option, c'est notre engagement commun."
              text="Nous vous offrons bien plus qu'un équipement : une véritable assurance pour l'esprit. Chaque produit est rigoureusement sélectionné, chaque conseil est une expérience de terrain, pour que votre seul souci soit le plaisir de la route."
            />
            <ButtonLink href="/a-propos" secondary>Découvrir SmartWewa</ButtonLink>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <Feature
              icon={<Shield className="text-white" />}
              title="Votre sécurité, notre raison d'être."
              text="La carte biométrique SmartWewa, c'est votre identité en mouvement. Couplée à notre gilet haute visibilité, elle fait de vous un acteur visible et respecté sur la voie publique. Parce qu'un motard qui se sait protégé, roule en confiance."
              className="bg-[#2d3748] text-white"
              iconBg="bg-[#D4A017]"
            />
            <Feature
              icon={<PackageCheck className="text-white" />}
              title="La fiabilité au service de votre quotidien."
              text="Chez SmartWewa, chaque équipement est choisi avec soin pour répondre aux réalités des routes de Kinshasa. La fiabilité et la sécurité sont nos seuls critères de sélection."
              className="bg-[#2d3748] text-white"
              iconBg="bg-[#D4A017]"
            />
            <Feature
              icon={<MessageCircle className="text-white" />}
              title="La force d'une communauté qui veille."
              text="Des annonces utiles, des partenaires de confiance et des histoires de terrain. La force du collectif au service de votre sécurité."
              className="bg-[#2d3748] text-white"
              iconBg="bg-[#D4A017]"
            />
          </div>
        </section>

        {/* SECTION EQUIPEMENTS */}
        <section className="bg-gray-200 py-20 md:py-24">
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
              image: '/images/community-riders.PNG',
              kicker: 'Le mouvement Smart Wewa',
              title: 'La sécurité est une affaire de tous.',
              text: 'Chaque semaine, nous partageons des itinéraires sécurisés, des conseils de prévention et des rendez-vous pour renforcer la solidarité entre motards.'
            },
            {
              image: '/images/hero-rider.png',
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

// ========== PAGE ÉQUIPEMENTS ==========
export function EquipementsPage() {
  return (
    <Shell>
      <main className="site-grid bg-gray-200">
        {/* ===== SECTION TITRE ===== */}
        <div className="container-wide pt-16 md:pt-24 pb-6 md:pb-10">
          <div className="max-w-3xl mx-auto text-center reveal">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="h-px w-12 bg-accent/30" />
              <span className="text-xs font-bold uppercase tracking-[.22em] text-accent">Smart Wewa</span>
              <span className="h-px w-12 bg-accent/30" />
            </div>

            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-[-.06em] text-primary md:text-6xl">
              De la conception <br className="hidden sm:block" />
              <span className="text-accent">à votre sécurité.</span>
            </h1>

            <div className="mt-4 flex justify-center">
              <span className="inline-block h-1 w-16 rounded-full bg-accent" />
            </div>

            <p className="mt-6 max-w-2xl mx-auto text-base leading-7 text-muted-foreground">
              Découvrez les coulisses de Smart Wewa étape par étape : de la conception de nos équipements 
              jusqu'à leur livraison finale.
            </p>
          </div>
        </div>

        {/* ===== ÉTAPE 1 : CONCEPTION & CONFECTION ===== */}
        <div className="container-wide pb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="rounded-lg bg-[#D4A017] p-2">
              <PenTool className="h-5 w-5 text-white" />
            </div>
            <span className="inline-block rounded-full bg-[#D4A017] px-3 py-1 text-xs font-bold text-white">
              Étape 1
            </span>
            <h2 className="font-display text-2xl font-bold text-[#2d3748]">Conception & Confection</h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl overflow-hidden h-72 md:h-96 bg-gray-100">
              <img src="/images/conception-1.jpg" alt="Conception" className="h-full w-full object-cover" />
            </div>
            <div className="rounded-xl overflow-hidden h-72 md:h-96 bg-gray-100">
              <img src="/images/conception-2.jpg" alt="Confection" className="h-full w-full object-cover" />
            </div>
            <div className="rounded-xl overflow-hidden h-72 md:h-96 bg-gray-100">
              <img src="/images/conception-3.jpg" alt="Modèles" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>

        {/* ===== ÉTAPE 2 : PRODUCTION & ATELIER ===== */}
        <div className="container-wide pb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="rounded-lg bg-[#D4A017] p-2">
              <Printer className="h-5 w-5 text-white" />
            </div>
            <span className="inline-block rounded-full bg-[#D4A017] px-3 py-1 text-xs font-bold text-white">
              Étape 2
            </span>
            <h2 className="font-display text-2xl font-bold text-[#2d3748]">Production & Atelier</h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl overflow-hidden h-72 md:h-96 bg-gray-100">
              <img src="/images/production-1.jpg" alt="Machine impression" className="h-full w-full object-cover" />
            </div>
            <div className="rounded-xl overflow-hidden h-72 md:h-96 bg-gray-100">
              <img src="/images/production-2.jpg" alt="Atelier" className="h-full w-full object-cover" />
            </div>
            <div className="rounded-xl overflow-hidden h-72 md:h-96 bg-gray-100">
              <img src="/images/production-3.jpg" alt="Contrôle qualité" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>

        {/* ===== ÉTAPE 3 : ÉQUIPEMENT DE TERRAIN (10 PHOTOS) ===== */}
        <div className="container-wide pb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="rounded-lg bg-[#D4A017] p-2">
              <Laptop className="h-5 w-5 text-white" />
            </div>
            <span className="inline-block rounded-full bg-[#D4A017] px-3 py-1 text-xs font-bold text-white">
              Étape 3
            </span>
            <h2 className="font-display text-2xl font-bold text-[#2d3748]">Équipement de Terrain</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            <div className="rounded-xl overflow-hidden h-48 md:h-56 bg-gray-100">
              <img src="/images/terrain-1.PNG" alt="Téléphone" className="h-full w-full object-cover" />
            </div>
            <div className="rounded-xl overflow-hidden h-48 md:h-56 bg-gray-100">
              <img src="/images/terrain-2.PNG" alt="Ordinateur" className="h-full w-full object-cover" />
            </div>
            <div className="rounded-xl overflow-hidden h-48 md:h-56 bg-gray-100">
              <img src="/images/terrain-3.PNG" alt="Capteur empreinte" className="h-full w-full object-cover" />
            </div>
            <div className="rounded-xl overflow-hidden h-48 md:h-56 bg-gray-100">
              <img src="/images/terrain-4.PNG" alt="Caméra" className="h-full w-full object-cover" />
            </div>
            <div className="rounded-xl overflow-hidden h-48 md:h-56 bg-gray-100">
              <img src="/images/terrain-5.jpg" alt="Imprimante" className="h-full w-full object-cover" />
            </div>
            <div className="rounded-xl overflow-hidden h-48 md:h-56 bg-gray-100">
              <img src="/images/terrain-6.jpg" alt="Scanner" className="h-full w-full object-cover" />
            </div>
            <div className="rounded-xl overflow-hidden h-48 md:h-56 bg-gray-100">
              <img src="/images/terrain-7.jpg" alt="Tablette" className="h-full w-full object-cover" />
            </div>
            <div className="rounded-xl overflow-hidden h-48 md:h-56 bg-gray-100">
              <img src="/images/terrain-8.jpg" alt="Drone" className="h-full w-full object-cover" />
            </div>
            <div className="rounded-xl overflow-hidden h-48 md:h-56 bg-gray-100">
              <img src="/images/terrain-9.jpg" alt="GPS" className="h-full w-full object-cover" />
            </div>
            <div className="rounded-xl overflow-hidden h-48 md:h-56 bg-gray-100">
              <img src="/images/terrain-10.jpg" alt="Kit sécurité" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>

        {/* ===== ÉTAPE 4 : PRODUITS FINIS ===== */}
        <div className="container-wide pb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="rounded-lg bg-[#D4A017] p-2">
              <Package className="h-5 w-5 text-white" />
            </div>
            <span className="inline-block rounded-full bg-[#D4A017] px-3 py-1 text-xs font-bold text-white">
              Étape 4
            </span>
            <h2 className="font-display text-2xl font-bold text-[#2d3748]">Produits Finis</h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl overflow-hidden h-72 md:h-96 bg-gray-100">
              <img src="/images/produits-1.jpg" alt="Autocollants" className="h-full w-full object-cover" />
            </div>
            <div className="rounded-xl overflow-hidden h-72 md:h-96 bg-gray-100">
              <img src="/images/produits-2.jpg" alt="Gilets" className="h-full w-full object-cover" />
            </div>
            <div className="rounded-xl overflow-hidden h-72 md:h-96 bg-gray-100">
              <img src="/images/produits-3.jpg" alt="Cartes biométriques" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>

        {/* ===== SECTION STATS ===== */}
        <div className="container-wide pb-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-[#2d3748] p-6 text-center text-white transition-all hover:scale-105 hover:shadow-xl">
              <p className="font-display text-3xl font-bold text-[#D4A017]">4</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-gray-400">Étapes de production</p>
            </div>
            <div className="rounded-xl bg-[#2d3748] p-6 text-center text-white transition-all hover:scale-105 hover:shadow-xl">
              <p className="font-display text-3xl font-bold text-[#D4A017]">100%</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-gray-400">Qualité certifiée</p>
            </div>
            <div className="rounded-xl bg-[#2d3748] p-6 text-center text-white transition-all hover:scale-105 hover:shadow-xl">
              <p className="font-display text-3xl font-bold text-[#D4A017]">2027</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-gray-400">L'année Smart Wewa</p>
            </div>
          </div>
        </div>

        {/* ===== SECTION APPEL À L'ACTION ===== */}
        <div className="container-wide pb-16 md:pb-24">
          <div className="rounded-2xl bg-gradient-to-r from-[#2d3748] to-[#1a202c] p-8 md:p-12 text-center">
            <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
              Prêt à rejoindre la révolution Smart Wewa ?
            </h2>
            <p className="mt-3 text-gray-300 max-w-2xl mx-auto">
              Équipez-vous avec des produits conçus pour les motards de Kinshasa, 
              par des motards de Kinshasa.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 rounded-lg bg-[#D4A017] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#b8890f] hover:shadow-lg hover:-translate-y-1"
              >
                Commander maintenant <ArrowRight size={16} />
              </Link>
              <Link 
                href="/a-propos" 
                className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-white/20 hover:-translate-y-1"
              >
                En savoir plus
              </Link>
            </div>
          </div>
        </div>
      </main>
    </Shell>
  );
}

// ========== PAGE À PROPOS ==========
export function AboutPage() {
  return (
    <Shell>
      <main className="bg-gray-200">
        <section className="site-grid">
          <div className="container-wide grid items-center gap-12 py-16 md:grid-cols-[.85fr_1.15fr] md:py-24">
            <div>
              <Eyebrow>Notre histoire</Eyebrow>
              <h1 className="font-display text-3xl font-bold leading-[.94] tracking-[-.06em] text-primary md:text-5xl">
                Chaque motard est un citoyen,{' '}
                <span className="text-accent">chaque trajet une responsabilité partagée.</span>
              </h1>
              <p className="mt-5 max-w-lg text-sm leading-6 text-muted-foreground md:text-base">
                Smart Wewa est né d'une évidence : le motard est un acteur essentiel de la mobilité urbaine. Il mérite reconnaissance, protection et confiance. Nous sommes une communauté qui agit, des équipements qui garantissent et des connaissances qui préservent. À Kinshasa, la route est l'affaire de tous, et c'est ensemble que nous bâtissons une mobilité plus sûre et plus humaine.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/contact">Rejoindre la communauté</ButtonLink>
                <ButtonLink href="/equipements" secondary>Explorer nos équipements</ButtonLink>
              </div>
            </div>
            <div className="relative">
              <img src="/images/community-riders.PNG" alt="Groupe de motards Smart Wewa à Kinshasa" className="aspect-[4/3] w-full rounded-2xl object-cover" />
              <div className="absolute -bottom-5 -left-5 rounded-xl bg-accent p-5 text-white shadow-xl">
                <p className="font-display text-3xl font-bold">2027</p>
                <p className="mt-1 text-xs text-white/80">SmartWewa</p>
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
        <section className="bg-gray-200 py-20 border-t border-border">
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
      <main className="site-grid bg-gray-200">
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
            <img src="/images/IMG_0342.PNG" alt="Kinshasa, ville de Smart Wewa" className="mt-10 aspect-[16/8] w-full rounded-xl object-cover" />
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-[0_20px_50px_rgba(31,48,83,.08)] md:p-6">
            {sent ? (
              <div className="flex min-h-[250px] flex-col items-center justify-center text-center">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-[#e1eee7] text-[#25724b]">
                  <Check size={24} />
                </div>
                <h2 className="mt-4 font-display text-xl font-bold tracking-[-.04em]">Message bien reçu !</h2>
                <p className="mt-2 max-w-sm text-sm leading-5 text-muted-foreground">
                  Merci pour votre message. Un membre de la communauté vous répondra dès que possible.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-4 text-sm font-bold text-primary underline underline-offset-4 hover:text-accent transition-colors"
                  data-testid="button-contact-new"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label htmlFor="name" className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Nom complet
                  </label>
                  <input
                    id="name"
                    required
                    placeholder="Votre nom"
                    className="w-full rounded-lg border border-input bg-background px-3.5 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/10"
                    data-testid="input-contact-name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="vous@exemple.com"
                    className="w-full rounded-lg border border-input bg-background px-3.5 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/10"
                    data-testid="input-contact-email"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Sujet
                  </label>
                  <select
                    id="subject"
                    className="w-full rounded-lg border border-input bg-background px-3.5 py-2 text-sm outline-none focus:border-primary"
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
                  <label htmlFor="message" className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Votre message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={3}
                    placeholder="Partagez-nous tout..."
                    className="w-full resize-none rounded-lg border border-input bg-background px-3.5 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/10"
                    data-testid="textarea-contact-message"
                  />
                </div>
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-all hover:bg-[#163267] hover:shadow-lg"
                  data-testid="button-contact-submit"
                >
                  Envoyer le message <Send size={15} />
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
    <section className="bg-gray-200">
      <div className="container-wide flex flex-col justify-between gap-7 py-12 md:flex-row md:items-center">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-[-.04em] md:text-3xl">Les bons réflexes, directement dans votre boîte.</h2>
        </div>
        {done ? (
          <p className="flex items-center gap-2 text-sm font-bold text-[#25724b]">
            ✅ Inscrit !
          </p>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="flex w-full max-w-md gap-2">
            <input required type="email" placeholder="Votre adresse email" className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-primary" data-testid="input-newsletter-email" />
            <button type="submit" className="rounded-lg bg-accent px-4 py-3 text-sm font-bold text-white hover:bg-accent/90 transition-colors" data-testid="button-newsletter-submit">S'inscrire</button>
          </form>
        )}
      </div>
    </section>
  );
}