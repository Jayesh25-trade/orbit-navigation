# Orbit Navigation

<section class="ccm-11" aria-label="360 degree wheel navigation demo">

  <div class="ccm-11__stage">

    <div class="ccm-11__pointer" aria-hidden="true"></div>

    <nav class="ccm-11__machine" style="--n:8" aria-label="Sections">

      <ul class="ccm-11__wheel">

        <li style="--i:0"><button type="button" class="ccm-11__stop is-active" aria-pressed="true">Home</button></li>

        <li style="--i:1"><button type="button" class="ccm-11__stop" aria-pressed="false">Series</button></li>

        <li style="--i:2"><button type="button" class="ccm-11__stop" aria-pressed="false">Films</button></li>

        <li style="--i:3"><button type="button" class="ccm-11__stop" aria-pressed="false">Live</button></li>

        <li style="--i:4"><button type="button" class="ccm-11__stop" aria-pressed="false">Sports</button></li>

        <li style="--i:5"><button type="button" class="ccm-11__stop" aria-pressed="false">Kids</button></li>

        <li style="--i:6"><button type="button" class="ccm-11__stop" aria-pressed="false">Music</button></li>

        <li style="--i:7"><button type="button" class="ccm-11__stop" aria-pressed="false">My list</button></li>

      </ul>

      <div class="ccm-11__face"><em>Now browsing</em><strong class="ccm-11__current">Home</strong>

        <div class="ccm-11__steer"><button type="button" class="ccm-11__prev" aria-label="Previous section">←</button><button type="button" class="ccm-11__next" aria-label="Next section">→</button></div>

      </div>

      <p class="ccm-11__live" aria-live="polite"></p>

    </nav>

  </div>

</section>

<!-- Attribution — feel free to remove if you adapt this demo. -->

<a href="https://codefronts.com/navigation/css-circular-menus/full-circle-wheel/?utm_source=codepen&utm_medium=ribbon&utm_campaign=full-circle-wheel" target="_blank" rel="noopener" style="position:fixed;bottom:10px;right:12px;z-index:99999;font:600 11px/1 -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;color:#a78bfa;background:rgba(15,15,25,0.78);padding:6px 10px;border-radius:999px;text-decoration:none;border:1px solid rgba(167,139,250,0.32);backdrop-filter:blur(6px);letter-spacing:0.02em;">✦ View original on CodeFronts</a>

.ccm-11,
.ccm-11 *,
.ccm-11 *::before,
.ccm-11 *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.ccm-11 {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 50% 30%,oklch(0.28 0.02 20),oklch(0.18 0.015 15) 70%);
  --brand: oklch(0.72 0.19 25);
  --ink: oklch(0.93 0.005 25);
  font-family: 'Segoe UI',system-ui,sans-serif;
  color: var(--ink);
}

.ccm-11__stage {
  width: 100%;
  height: 100vh;
  position: relative;
  display: grid;
  place-items: center;
  border-radius: 20px;
  background: radial-gradient(circle at 50% 30%,oklch(0.28 0.02 20),oklch(0.18 0.015 15) 70%);
  overflow: hidden;
}

.ccm-11__pointer {
  position: absolute;
  left: 50%;
  top: calc(50% - 196px);
  translate: -50% 0;
  width: 0;
  height: 0;
  border: 9px solid transparent;
  border-top: 13px solid var(--brand);
  filter: drop-shadow(0 2px 6px oklch(0.72 0.19 25 / .6));
  z-index: 3;
}

.ccm-11__machine {
  position: relative;
  width: 340px;
  height: 340px;
  display: grid;
  place-items: center;
}

.ccm-11__wheel {
  position: absolute;
  inset: 0;
  list-style: none;
  border-radius: 50%;
  border: 1px solid oklch(0.5 0.05 25 / .4);
  rotate: var(--rot,0deg);
  transition: rotate .7s cubic-bezier(.3,1,.35,1);
}

.ccm-11__wheel li {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  pointer-events: none;
  --a: calc((360deg / var(--n)) * var(--i) - 90deg);
  translate: calc(cos(var(--a)) * 170px) calc(sin(var(--a)) * 170px);
}

.ccm-11__stop {
  pointer-events: auto;
  border: 1px solid oklch(0.5 0.05 25 / .5);
  border-radius: 999px;
  padding: 9px 16px;
  background: oklch(0.26 0.02 20 / .85);
  color: oklch(0.8 0.02 25);
  font: 600 13px/1 'Segoe UI',system-ui,sans-serif;
  letter-spacing: .02em;
  cursor: pointer;
  white-space: nowrap;
  rotate: calc(var(--rot,0deg) * -1);
  transition: rotate .7s cubic-bezier(.3,1,.35,1),background .25s,color .25s,border-color .25s,scale .25s;
}

.ccm-11__stop:hover {
  border-color: var(--brand);
  color: #fff;
}

.ccm-11__stop:focus-visible {
  outline: 3px solid var(--brand);
  outline-offset: 3px;
}

.ccm-11__stop.is-active {
  background: var(--brand);
  border-color: var(--brand);
  color: oklch(0.2 0.03 25);
  scale: 1.12;
  box-shadow: 0 0 24px -4px oklch(0.72 0.19 25 / .7);
}

.ccm-11__face {
  position: relative;
  z-index: 2;
  display: grid;
  justify-items: center;
  gap: 4px;
  width: 190px;
  height: 190px;
  border-radius: 50%;
  place-content: center;
  text-align: center;
  background: radial-gradient(circle at 38% 30%,oklch(0.3 0.02 20),oklch(0.21 0.015 15));
  border: 1px solid oklch(0.5 0.05 25 / .4);
  box-shadow: inset 0 1px 0 oklch(1 0 0 / .1),0 20px 50px -20px oklch(0 0 0 / .8);
}

.ccm-11__face em {
  font-style: normal;
  font-size: 10px;
  letter-spacing: .22em;
  text-transform: uppercase;
  color: oklch(0.62 0.04 25);
}

.ccm-11__current {
  font-size: 25px;
  letter-spacing: -.01em;
}

.ccm-11__steer {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.ccm-11__steer button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid oklch(0.5 0.05 25 / .5);
  background: oklch(0.28 0.02 20);
  color: var(--ink);
  font-size: 15px;
  cursor: pointer;
  transition: background .2s,border-color .2s;
}

.ccm-11__steer button:hover {
  background: var(--brand);
  border-color: var(--brand);
  color: oklch(0.2 0.03 25);
}

.ccm-11__steer button:focus-visible {
  outline: 3px solid var(--brand);
  outline-offset: 2px;
}

.ccm-11__live {
  position: absolute;
  width: 1px;
  height: 1px;
  clip-path: inset(50%);
  overflow: hidden;
  white-space: nowrap;
}

@media (prefers-reduced-motion: reduce) {
  .ccm-11 * {
    transition-duration: .01s !important;
  }
}


(() => {

  const machine = document.querySelector('.ccm-11__machine');

  const wheel = machine.querySelector('.ccm-11__wheel');

  const stops = [...machine.querySelectorAll('.ccm-11__stop')];

  const current = machine.querySelector('.ccm-11__current');

  const live = machine.querySelector('.ccm-11__live');

  const n = stops.length, step = 360 / n;

  let rot = 0, active = 0;

  const setStopRot = () => stops.forEach((s) => s.style.rotate = (-rot) + 'deg');

  const goTo = (idx) => {

    idx = ((idx % n) + n) % n;

    const target = -idx * step;

    let delta = target - (((rot % 360) + 360) % 360 === 0 ? 0 : rot % 360);

    delta = ((delta % 360) + 540) % 360 - 180;

    rot += delta;

    wheel.style.setProperty('--rot', rot + 'deg');

    setStopRot();

    stops.forEach((s, k) => { s.classList.toggle('is-active', k === idx); s.setAttribute('aria-pressed', String(k === idx)); });

    active = idx;

    current.textContent = stops[idx].textContent;

    live.textContent = stops[idx].textContent + ' selected';

  };

  stops.forEach((s, k) => s.addEventListener('click', () => goTo(k)));

  machine.querySelector('.ccm-11__prev').addEventListener('click', () => goTo(active - 1));

  machine.querySelector('.ccm-11__next').addEventListener('click', () => goTo(active + 1));

})();

check this code .. then i iwll tell you what to do

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f2bd1b82-fac5-47e9-b367-eeb5f86baecc).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
