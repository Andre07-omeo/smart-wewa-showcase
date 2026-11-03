import React from 'react';
import { ShieldCheck, Info, ArrowRight } from 'lucide-react';
import { Shell } from '@/components/site';
import './registration-process.css';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface ProcessStep {
  id: string;
  number: number;
  title: string;
  image: string;
  alt: string;
  action: string;
  details?: string[];
  note?: string;
  result: string;
}

// ---------------------------------------------------------------------------
// Données des 6 étapes (dans l'ordre demandé)
// Images : public/images/processus/etape-1.webp … etape-6.webp
// ---------------------------------------------------------------------------
const imageRoot = '/images/processus/';

const steps: readonly ProcessStep[] = [
  {
    id: 'etape-1',
    number: 1,
    title: 'Ouverture du compte et paiement à la banque',
    image: `${imageRoot}motard.jpeg`,
    alt: 'Ouverture de compte et paiement à la banque partenaire',
    action:
      'Le motocycliste se rend à la banque partenaire pour ouvrir son compte et régler les frais de la taxe de numérotation moto.',
    details: [
      'Ouverture du compte bancaire au guichet partenaire.',
      'Paiement des frais de la taxe de numérotation moto.',
      'Remise d’un bordereau de paiement officiel.',
    ],
    note:
      'Conservez précieusement le bordereau : il est indispensable pour la suite.',
    result: 'Compte ouvert · Paiement effectué',
  },
  {
    id: 'etape-2',
    number: 2,
    title: 'Vérification du bordereau provenant de la banque',
    image: `${imageRoot}etape2.jpeg`,
    alt: 'Vérification du bordereau de paiement bancaire',
    action:
      'L’agent du site d’enregistrement saisit le numéro du bordereau dans le système et vérifie que le paiement a bien été enregistré par la banque.',
    details: [
      'Présentation du bordereau au site d’enregistrement.',
      'Saisie du numéro de bordereau par l’agent.',
      'Contrôle automatique du règlement dans le système.',
    ],
    note:
      'Paiement non validé ? Le motocycliste est réorienté vers la banque avant de poursuivre.',
    result: 'Bordereau validé',
  },
  {
    id: 'etape-3',
    number: 3,
    title: 'Enregistrement du motard (ouverture du dossier)',
    image: `${imageRoot}empreintes.jpeg`,
    alt: 'Enregistrement du motard et ouverture du dossier',
    action:
      'L’agent complète les informations du conducteur et procède à la capture du visage et des dix empreintes digitales pour créer un dossier unique et éviter les doublons.',
    details: [
      'Complément et vérification des informations du conducteur.',
      'Capture faciale et enregistrement des empreintes digitales.',
      'Association des données biométriques au dossier du motard.',
    ],
    result: 'Dossier ouvert · Identité enregistrée',
  },
  {
    id: 'etape-4',
    number: 4,
    title: 'Attribution du gilet numéroté',
    image: `${imageRoot}gilet.jpeg`,
    alt: 'Attribution du gilet numéroté et génération du QR code',
    action:
      'Le système attribue au conducteur un numéro unique de gilet, directement lié à son identité. Un QR code unique est généré pour relier le gilet au dossier dans la base de données.',
    details: [
      'Attribution d’un numéro de gilet unique.',
      'Génération du QR code associé au dossier.',
      'Préparation du gilet officiel numéroté.',
    ],
    result: 'Gilet numéroté attribué',
  },
  {
    id: 'etape-5',
    number: 5,
    title: 'Impression de la carte biométrique',
    image: `${imageRoot}etape-5.webp`,
    alt: 'Impression de la carte biométrique',
    action:
      'La carte biométrique du conducteur est émise et imprimée. Elle contient sa photo, son numéro d’identification unique et son QR code.',
    details: [
      'Émission et impression de la carte biométrique.',
      'Intégration de la photo, de l’identifiant unique et du QR code.',
      'Contrôle qualité de la carte imprimée.',
    ],
    result: 'Carte biométrique imprimée',
  },
  {
    id: 'etape-6',
    number: 6,
    title: 'Finalisation et livraison du kit complet',
    image: `${imageRoot}etape-6.webp`,
    alt: 'Livraison du kit complet : gilet et carte biométrique',
    action:
      'Le motocycliste reçoit officiellement son gilet numéroté et sa carte biométrique. Le dossier est clôturé et l’identification Smart Wewa est activée.',
    details: [
      'Remise officielle du gilet numéroté.',
      'Remise de la carte biométrique imprimée.',
      'Clôture du dossier et activation de l’identification.',
    ],
    result: 'Kit complet livré',
  },
];

// ---------------------------------------------------------------------------
// Composant principal
// ---------------------------------------------------------------------------
export function RegistrationProcessPage() {
  return (
    <Shell>
      <main className="registration-process-page container-wide py-12 md:py-16">
        {/* -------------------------------------------------------------- */}
        {/* INTRO / TITRE                                                  */}
        {/* -------------------------------------------------------------- */}
        <section className="mb-10">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-accent">
            Parcours d’acquisition
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold leading-tight tracking-[-.04em] text-primary sm:text-4xl">
            Processus d’acquisition du kit complet
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
            De l’ouverture du compte à la livraison du kit complet (gilet
            numéroté + carte biométrique) : découvrez les six étapes du parcours
            Smart Wewa.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-bold text-primary">
            <ShieldCheck size={15} />
            Un conducteur, une identité, un numéro unique.
          </p>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* GRILLE DES 6 ÉTAPES (avec effet glass)                        */}
        {/* -------------------------------------------------------------- */}
        <section
          className="glass-steps"
          aria-label="Les six étapes du processus d’acquisition"
        >
          {steps.map((step) => (
            <article className="glass-card" key={step.id} id={step.id}>
              {/* Effet lumineux animé */}
              <span className="glass-shine" aria-hidden="true" />

              <div className="glass-card-head">
                <div className="glass-num">{step.number}</div>
                <h2>{step.title}</h2>
              </div>

              <img
                className="glass-photo"
                src={step.image}
                alt={step.alt}
                loading="lazy"
                decoding="async"
              />

              <div className="glass-body">
                <p>
                  <strong>Action :</strong> {step.action}
                </p>

                {step.details && step.details.length > 0 && (
                  <ul className="glass-details">
                    {step.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                )}

                {step.note && (
                  <p className="glass-note">
                    <Info size={14} />
                    <span>{step.note}</span>
                  </p>
                )}

                <p className="glass-result">
                  <ShieldCheck size={14} />
                  {step.result}
                </p>
              </div>
            </article>
          ))}
        </section>

        {/* -------------------------------------------------------------- */}
        {/* AVANTAGES                                                      */}
        {/* -------------------------------------------------------------- */}
        <section className="glass-benefits">
          <h2>Les avantages du dispositif</h2>
          <div className="glass-benefit-grid">
            <div className="glass-benefit">
              <span className="glass-check">✓</span>Sécurité renforcée sur les routes
            </div>
            <div className="glass-benefit">
              <span className="glass-check">✓</span>Lutte contre l’insécurité routière
            </div>
            <div className="glass-benefit">
              <span className="glass-check">✓</span>Traçabilité des motocyclistes
            </div>
            <div className="glass-benefit">
              <span className="glass-check">✓</span>Protection sociale avec assurance
            </div>
            <div className="glass-benefit">
              <span className="glass-check">✓</span>Gestion transparente et efficace
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* ENCART FINAL (CTA)                                             */}
        {/* -------------------------------------------------------------- */}
        <section className="mt-10 rounded-2xl bg-primary p-7 text-primary-foreground md:p-10">
          <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.18em] text-accent">
                Ensemble pour une mobilité urbaine
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-[-.035em] md:text-3xl">
                Plus sûre et mieux contrôlée.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 opacity-90">
                Chaque étape garantit un motocycliste identifié, un gilet
                numéroté et une carte biométrique — au service d’une mobilité
                urbaine sécurisée.
              </p>
            </div>
            <a
              href="/equipements"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-bold text-accent-foreground transition-opacity hover:opacity-90"
            >
              Découvrir les équipements <ArrowRight size={16} />
            </a>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* MENTION                                                        */}
        {/* -------------------------------------------------------------- */}
        <p className="mt-6 flex items-start gap-2 text-xs leading-6 text-muted-foreground">
          <Info size={14} className="mt-1 shrink-0" />
          Cette page présente la procédure. Elle ne réalise ni paiement ni
          collecte de données biométriques en ligne.
        </p>
      </main>
    </Shell>
  );
}