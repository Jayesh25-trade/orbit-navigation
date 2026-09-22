import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Leaf, MoveUpRight } from "lucide-react";
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
  short: string;
  eyebrow: string;
  description: string;
  image: string;
  imageAlt: string;
};

const concerns: Concern[] = [
  {
    name: "Skin & Vitiligo",
    short: "Skin",
    eyebrow: "Skin health",
    description: "Specialised care for vitiligo, psoriasis, eczema, acne, fungal infections and recurring skin concerns.",
    image: skinCare.url,
    imageAlt: "Close view of hands with vitiligo being cared for",
  },
  {
    name: "Respiratory & Allergies",
    short: "Allergies",
    eyebrow: "Breathe easier",
    description: "Gentle, personalised support for allergies, recurring colds, sinus concerns and respiratory wellbeing.",
    image: allergyCare.url,
    imageAlt: "Woman resting at home with allergy symptoms",
  },
  {
    name: "Migraine & Headache",
    short: "Migraine",
    eyebrow: "Quiet relief",
    description: "A considered approach to migraines, recurring headaches, tension and the patterns behind them.",
    image: migraineCare.url,
    imageAlt: "Woman resting quietly with a headache",
  },
  {
    name: "PCOD & Hormonal Health",
    short: "PCOD",
    eyebrow: "Hormonal balance",
    description: "Support for PCOD, cycle health, energy, metabolism and the whole picture of hormonal wellbeing.",
    image: pcodCare.url,
    imageAlt: "Woman discussing hormonal health with a clinician",
  },
  {
    name: "Kidney Stones",
    short: "Kidney",
    eyebrow: "Kidney care",
    description: "Personalised guidance for kidney stones, urinary health and sustainable changes that support recovery.",
    image: kidneyCare.url,
    imageAlt: "Man experiencing discomfort in his lower back",
  },
  {
    name: "Acidity & Digestion",
    short: "Digestion",
    eyebrow: "Digestive health",
    description: "Care for acidity, reflux, bloating and digestive discomfort that helps you feel at home in your body.",
    image: digestionCare.url,
    imageAlt: "Woman experiencing digestive discomfort at a dining table",
  },
  {
    name: "Paediatric Illnesses",
    short: "Paediatric",
    eyebrow: "Growing well",
    description: "Warm, attentive care for childhood illnesses, immunity, development and the questions parents carry.",
    image: wellbeingCare.url,
    imageAlt: "Woman relaxing with tea beside a window and indoor plants",
  },
  {
    name: "Mental Health Care",
    short: "Mental health",
    eyebrow: "Emotional wellbeing",
    description: "A safe, human space for anxiety, stress, low mood and the inner life that deserves to be heard.",
    image: mentalHealthCare.url,
    imageAlt: "Woman speaking with a mental health professional",
  },
];

const N = concerns.length;
const STEP = 360 / N;

function Index() {
  const [active, setActive] = useState(0);
  const rotationRef = useRef(0);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const animatingRef = useRef(false);
  const hoveringRef = useRef(false);
  const reducedRef = useRef(false);

  const applyRotation = (value: number) => {
    rotationRef.current = value;
    stageRef.current?.style.setProperty("--rot", `${value}deg`);
  };

  const indexFor = (rotation: number) =>
    ((Math.round(-rotation / STEP) % N) + N) % N;

  // One rAF loop drives both the slow continuous drift and click animations.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncReduced = () => {
      reducedRef.current = mq.matches;
      if (mq.matches) animatingRef.current = false;
    };
    syncReduced();
    mq.addEventListener("change", syncReduced);

    stageRef.current?.style.setProperty("--rot", `${rotationRef.current}deg`);

    const SPEED = 360 / 84; // one full turn in roughly 84 seconds
    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      if (!animatingRef.current && !reducedRef.current && !hoveringRef.current) {
        applyRotation(rotationRef.current - SPEED * dt);
        const idx = indexFor(rotationRef.current);
        setActive((prev) => (prev === idx ? prev : idx));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      mq.removeEventListener("change", syncReduced);
    };
  }, []);

  const goTo = (index: number) => {
    const idx = ((index % N) + N) % N;
    const from = rotationRef.current;
    const delta = (((-idx * STEP - from) % 360) + 540) % 360 - 180;
    setActive(idx);
    if (reducedRef.current || delta === 0) {
      applyRotation(from + delta);
      return;
    }
    const start = performance.now();
    const duration = 900;
    animatingRef.current = true;
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      applyRotation(from + delta * eased);
      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        animatingRef.current = false;
      }
    };
    requestAnimationFrame(step);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "ArrowDown") goTo(active + 1);
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") goTo(active - 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const selected: Concern = concerns[active] ?? concerns[0]!;

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
          <p className="wheel-hint"><span className="wheel-hint__line" /> Turn the wheel to explore</p>
        </div>

        <div className="wheel-column">
          <div
            ref={stageRef}
            className="wheel-stage"
            style={{ "--n": N } as React.CSSProperties}
            onPointerEnter={() => { hoveringRef.current = true; }}
            onPointerLeave={() => { hoveringRef.current = false; }}
          >
            <div className="wheel-pointer" aria-hidden="true" />
            <ul className="wheel" role="tablist" aria-label="Care concerns">
              {concerns.map((concern, index) => (
                <li key={concern.name} style={{ "--i": index } as React.CSSProperties}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={active === index}
                    aria-label={`Show ${concern.name}`}
                    className={`wheel-stop ${active === index ? "is-active" : ""}`}
                    onClick={() => goTo(index)}
                  >
                    <span className="wheel-stop__number">{String(index + 1).padStart(2, "0")}</span>
                    {concern.short}
                  </button>
                </li>
              ))}
            </ul>
            <div className="wheel-center" aria-live="polite">
              <span className="wheel-center__small">Selected concern</span>
              <strong>{selected.name}</strong>
              <span className="wheel-center__count">{String(active + 1).padStart(2, "0")} <i>/</i> {String(N).padStart(2, "0")}</span>
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
            <p className="concern-index">{String(active + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}</p>
            <h2>{selected.name}</h2>
            <p>{selected.description}</p>
            <Button className="consultation-button">Book consultation <MoveUpRight size={16} /></Button>
          </div>
        </article>
      </section>

      <footer className="care-footer">
        <span>ANTAR WELLNESS</span>
        <span>Care that begins with listening</span>
        <span>Scroll to explore <ArrowRight size={14} /></span>
      </footer>
    </main>
  );
}
