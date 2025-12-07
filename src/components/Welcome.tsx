import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, type JSX } from "react";

type FontWeightConfig = {
  min: number;
  max: number;
  default: number;
};

const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
} as const satisfies Record<string, FontWeightConfig>;

type FontWeightType = keyof typeof FONT_WEIGHTS;

const renderText = (
  text: string,
  className: string,
  baseWeight: number = 400
): JSX.Element[] => {
  return [...text].map((char, i) => (
    <span
      key={i}
      className={className}
      style={{ fontVariationSettings: `'wght' ${baseWeight}` }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

const setupTextHover = (
  container: HTMLElement | null,
  type: FontWeightType
): (() => void) | void => {
  if (!container) return;

  const letters = container.querySelectorAll<HTMLSpanElement>("span");
  const { min, max, default: base } = FONT_WEIGHTS[type];

  const animateLetter = (
    letter: HTMLSpanElement,
    weight: number,
    duration: number = 0.25
  ): gsap.core.Tween => {
    return gsap.to(letter, {
      duration,
      ease: "power2.out",
      fontVariationSettings: `'wght' ${weight}`,
    });
  };

  const handleMouseMove = (event: MouseEvent): void => {
    const { left } = container.getBoundingClientRect();
    const mouseX = event.clientX - left;

    letters.forEach((letter) => {
      const { left: letterLeft, width: letterWidth } =
        letter.getBoundingClientRect();

      const letterCenterX = letterLeft - left + letterWidth / 2;
      const distance = Math.abs(mouseX - letterCenterX);

      const intensity = Math.exp(-(distance ** 2) / 2000);
      const weight = min + (max - min) * intensity;

      animateLetter(letter, weight);
    });
  };

  const handleMouseLeave = (): void => {
    letters.forEach((letter) => {
      animateLetter(letter, base, 0.3);
    });
  };

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  };
};

const Welcome: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const cleanupTitle = setupTextHover(titleRef.current, "title");
    const cleanupSubtitle = setupTextHover(subtitleRef.current, "subtitle");

    return () => {
      cleanupTitle?.();
      cleanupSubtitle?.();
    };
  }, []);

  return (
    <section id="welcome">
      <p ref={subtitleRef}>
        {renderText(
          "Hey, I'm Zach! Welcome to my",
          "text-3xl font-georama",
          100
        )}
      </p>
      <h1 className="mt-7" ref={titleRef}>
        {renderText("portfolio", "text-9xl italic font-georama")}
      </h1>

      <div className="small-screen">
        <p>This portfolio is designed for desktop/tablet screens only</p>
      </div>
    </section>
  );
};

export default Welcome;
