import { useEffect, useRef } from "react";
import { Application, Graphics, Container } from "pixi.js";
import { BloomFilter } from "@pixi/filter-bloom";
import {
  generateGlitterParticles,
  generateHeartParticles,
} from "../engine/heartMath";

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
        background: "#000000",
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

      const heart = new Graphics();
      const glitter = new Graphics();

      glitter.filters = [
        new BloomFilter({
          strength: 1.5,
          blur: 6,
          quality: 4,
        }),
      ];

      stage.addChild(heart);
      stage.addChild(glitter);

      app.ticker.add((ticker) => {
        const elapsed = ticker.lastTime / 1000;

        const scale = 1 + Math.sin(elapsed * 3.5) * 0.08;

        heart.clear();
        glitter.clear();

        // body
        heartParticles.forEach((p) => {
          const alpha = p.alpha * (0.7 + 0.3 * Math.cos(elapsed * 2 + p.phase));

          heart.circle(p.x * scale, p.y * scale, p.size * scale);

          heart.fill({
            color: 0xff2d55,
            alpha,
          });
        });

        // glitter
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
