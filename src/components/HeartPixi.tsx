import { useEffect, useRef } from "react";
import { Application, Graphics, Container, BlurFilter } from "pixi.js";
import {
  generateGlitterParticles,
  generateHeartParticles,
  generateDustParticles,
} from "../engine/heartMath";
import { heartbeat } from "../engine/heartbeat";

function HeartPixi() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;

    if (!wrapper) return;

    let mounted = true;

    const init = async () => {
      const app = new Application();

      await app.init({
        resizeTo: window,
        backgroundAlpha: 0,
        antialias: true,
      });

      if (!mounted) {
        app.destroy();
        return;
      }

      wrapper.appendChild(app.canvas);

      const stage = new Container();

      stage.x = window.innerWidth / 2;
      stage.y = window.innerHeight / 2;

      app.stage.addChild(stage);

      const heartParticles = generateHeartParticles(3500);
      const glitterParticles = generateGlitterParticles(700);
      const dustParticles = generateDustParticles(300);

      const dust = new Graphics();
      const heart = new Graphics();
      const glitter = new Graphics();

      glitter.filters = [new BlurFilter({ strength: 4 })];
      dust.filters = [new BlurFilter({ strength: 2 })];

      // render order
      stage.addChild(dust);
      stage.addChild(heart);
      stage.addChild(glitter);

      app.ticker.add((ticker) => {
        const elapsed = ticker.lastTime / 1000;

        const scale = heartbeat(elapsed);

        dust.clear();
        heart.clear();
        glitter.clear();

        // ambient dust
        dustParticles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;

          const alpha = p.alpha * (0.5 + 0.5 * Math.cos(elapsed + p.phase));

          dust.circle(p.x, p.y, p.size);

          dust.fill({
            color: 0xff8cb4,
            alpha,
          });

          // wrap around screen
          if (p.x > window.innerWidth / 2) {
            p.x = -window.innerWidth / 2;
          }

          if (p.x < -window.innerWidth / 2) {
            p.x = window.innerWidth / 2;
          }

          if (p.y > window.innerHeight / 2) {
            p.y = -window.innerHeight / 2;
          }

          if (p.y < -window.innerHeight / 2) {
            p.y = window.innerHeight / 2;
          }
        });

        // heart body
        heartParticles.forEach((p) => {
          const alpha = p.alpha * (0.7 + 0.3 * Math.cos(elapsed * 2 + p.phase));

          heart.circle(p.x * scale, p.y * scale, p.size * scale);

          heart.fill({
            color: 0xff2d55,
            alpha,
          });
        });

        // glitter particles
        glitterParticles.forEach((p) => {
          const alpha = p.alpha * (0.4 + 0.6 * Math.cos(elapsed * 5 + p.phase));

          glitter.circle(p.x * scale, p.y * scale, p.size * scale);

          glitter.fill({
            color: 0xff8cb4,
            alpha,
          });
        });
      });

      return () => {
        app.destroy(true);
      };
    };

    let cleanup: (() => void) | undefined;

    init().then((fn) => {
      cleanup = fn;
    });

    return () => {
      mounted = false;
      cleanup?.();
    };
  }, []);

  return <div ref={wrapperRef} className="absolute inset-0" />;
}

export default HeartPixi;
