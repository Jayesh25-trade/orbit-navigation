import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Leaf, MoveUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import skinCare from "@/assets/skin-care.jpg.asset.json";
import allergyCare from "@/assets/allergy-care.jpg.asset.json";
import migraineCare from "@/assets/migraine-care-v2.jpg.asset.json";
import pcodCare from "@/assets/pcod-care-v2.jpg.asset.json";
import kidneyCare from "@/assets/kidney-care-v2.jpg.asset.json";
import digestionCare from "@/assets/digestion-care-v2.jpg.asset.json";
import mentalHealthCare from "@/assets/mental-health-care.jpg.asset.json";
import wellbeingCare from "@/assets/wellbeing-care.jpg.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Whole-person care | Antar Wellness" },
      { name: "description", content: "Explore thoughtful, whole-person care for the concerns that shape everyday wellbeing." },
      { property: "og:title", content: "Whole-person care | Antar Wellness" },
      { property: "og:description", content: "Explore thoughtful, whole-person care for the concerns that shape everyday wellbeing." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

type Concern = {
  name: string;
  eyebrow: string;
  description: string;
  image: string;
  imageAlt: string;
};

const concerns: Concern[] = [
  {
    name: "Skin & Vitiligo",
    eyebrow: "Skin health",
    description: "Specialised care for vitiligo, psoriasis, eczema, acne, fungal infections and recurring skin concerns.",
    image: skinCare.url,
    imageAlt: "Close view of hands with vitiligo being cared for",
  },
  {
    name: "Respiratory & Allergies",
    eyebrow: "Breathe easier",
    description: "Gentle, personalised support for allergies, recurring colds, sinus concerns and respiratory wellbeing.",
    image: allergyCare.url,
    imageAlt: "Woman resting at home with allergy symptoms",
  },
  {
    name: "Migraine & Headache",
    eyebrow: "Quiet relief",
    description: "A considered approach to migraines, recurring headaches, tension and the patterns behind them.",
    image: migraineCare.url,
    imageAlt: "Woman resting quietly with a headache",
  },
  {
    name: "PCOD & Hormonal Health",
    eyebrow: "Hormonal balance",
    description: "Support for PCOD, cycle health, energy, metabolism and the whole picture of hormonal wellbeing.",
    image: pcodCare.url,
    imageAlt: "Woman discussing hormonal health with a clinician",
  },
  {
    name: "Kidney Stones",
    eyebrow: "Kidney care",
    description: "Personalised guidance for kidney stones, urinary health and sustainable changes that support recovery.",
    image: kidneyCare.url,
    imageAlt: "Man experiencing discomfort in his lower back",
  },
  {
    name: "Acidity & Digestion",
    eyebrow: "Digestive health",
    description: "Care for acidity, reflux, bloating and digestive discomfort that helps you feel at home in your body.",
    image: digestionCare.url,
    imageAlt: "Woman experiencing digestive discomfort at a dining table",
  },
  {
    name: "Paediatric Illnesses",
    eyebrow: "Growing well",
    description: "Warm, attentive care for childhood illnesses, immunity, development and the questions parents carry.",
    image: wellbeingCare.url,
    imageAlt: "Mother and child sharing a calm moment at home",
  },
  {
    name: "Mental Health Care",
    eyebrow: "Emotional wellbeing",
    description: "A safe, human space for anxiety, stress, low mood and the inner life that deserves to be heard.",
    image: mentalHealthCare.url,
    imageAlt: "Woman speaking with a mental health professional",
  },
];

function Index() {
  const [active, setActive] = useState(0);
  const selected = concerns[active];
  const wheelRotation = -active * 45;

  const goTo = (index: number) => {
    setActive((index + concerns.length) % concerns.length);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "ArrowDown") goTo(active + 1);
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") goTo(active - 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  const wheelStops = useMemo(
    () => concerns.map((concern, index) => ({ concern, index, angle: index * 45 })),
    [],
  );

  return (
    <main className="care-page">
      <header className="care-header">
        <a href="#top" className="brand-mark" aria-label="Antar Wellness home">
          <span className="brand-mark__leaf"><Leaf size={15} strokeWidth={1.7} /></span>
          <span>ANTAR <em>wellness</em></span>
        </a>
        <div className="header-note"><span className="header-note__dot" /> Integrative care, thoughtfully personal</div>
        <Button className="header-button" size="sm">Book a consultation <MoveUpRight size={14} /></Button>
      </header>

      <section id="top" className="care-layout" aria-label="Explore care concerns">
        <div className="intro-column">
          <p className="eyebrow"><span>01</span> Areas of care</p>
          <h1>Care centered on <em>the whole person.</em></h1>
          <p className="intro-copy">Find a path that feels personal. Choose a concern to discover how our practitioners can help you return to balance.</p>
          <div className="intro-rule" />
          <p className="wheel-hint"><span className="wheel-hint__line" /> Turn the wheel to explore</p>
        </div>

        <div className="wheel-column">
          <div className="wheel-stage" style={{ "--wheel-rotation": `${wheelRotation}deg` } as React.CSSProperties}>
            <div className="wheel-pointer" aria-hidden="true"><span /></div>
            <div className="wheel-orbit" aria-hidden="true" />
            <div className="wheel" role="tablist" aria-label="Care concerns">
              {wheelStops.map(({ concern, index, angle }) => (
                <button
                  key={concern.name}
                  type="button"
                  role="tab"
                  aria-selected={active === index}
                  aria-label={`Show ${concern.name}`}
                  className={`wheel-stop ${active === index ? "is-active" : ""}`}
                  style={{ "--angle": `${angle}deg` } as React.CSSProperties}
                  onClick={() => goTo(index)}
                >
                  <span className="wheel-stop__number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="wheel-stop__label">{concern.name}</span>
                  <span className="wheel-stop__dot">{active === index ? <Check size={12} /> : null}</span>
                </button>
              ))}
            </div>
            <div className="wheel-center" aria-live="polite">
              <span className="wheel-center__small">Selected concern</span>
              <strong>{selected.name}</strong>
              <span className="wheel-center__count">{String(active + 1).padStart(2, "0")} <i>/</i> 08</span>
            </div>
          </div>
          <div className="wheel-controls" aria-label="Wheel controls">
            <Button variant="outline" size="icon" aria-label="Previous concern" onClick={() => goTo(active - 1)}><ArrowLeft /></Button>
            <span>Use the arrows or select a concern</span>
            <Button variant="outline" size="icon" aria-label="Next concern" onClick={() => goTo(active + 1)}><ArrowRight /></Button>
          </div>
        </div>

        <article className="concern-card" key={selected.name}>
          <div className="concern-image-wrap">
            <img src={selected.image} alt={selected.imageAlt} className="concern-image" />
            <span className="image-tag">{selected.eyebrow}</span>
          </div>
          <div className="concern-card__body">
            <p className="concern-index">{String(active + 1).padStart(2, "0")} / 08</p>
            <h2>{selected.name}</h2>
            <p>{selected.description}</p>
            <Button className="consultation-button">Book consultation <MoveUpRight size={16} /></Button>
          </div>
        </article>
      </section>
      <footer className="care-footer"><span>ANTAR WELLNESS</span><span>Care that begins with listening</span><span>Scroll to explore <ArrowRight size={14} /></span></footer>
    </main>
  );
}
