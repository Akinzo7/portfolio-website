const REVEAL_SELECTORS = [
  "main section",
  "main .card",
  "main .container",
  ".about_page_header",
  ".about_top_layout > *",
  ".career_highlights",
  ".career_stat",
  ".about_section",
  ".experience_card",
  ".education_card",
  ".cert_card",
  ".contact_header",
  ".contact_layout > *",
  ".contact_info_card",
  ".faq_section",
  ".faq_card",
  "footer .footer_top",
  "footer .footer_bottom",
];

const SKILL_WIDTH_MAP = {
  beginner: 25,
  intermediate: 50,
  proficient: 75,
  advanced: 95,
};

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function canObserve() {
  return "IntersectionObserver" in window;
}

function assignStagger(elements, stepInSeconds, direction = "up") {
  elements.forEach((element, index) => {
    element.style.setProperty(
      "--stagger-delay",
      `${(index * stepInSeconds).toFixed(2)}s`
    );

    if (direction === "left") {
      element.classList.add("animate-from-left");
    }

    if (direction === "right") {
      element.classList.add("animate-from-right");
    }
  });
}

function initializeHeroSequence(reducedMotion) {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  const heroItems = [
    hero.querySelector(".name"),
    hero.querySelector(".role"),
    hero.querySelector(".description"),
    ...hero.querySelectorAll(".btn"),
    hero.querySelector(".social-links"),
  ].filter(Boolean);

  const heroPhoto = hero.querySelector("img");

  if (reducedMotion) {
    hero.classList.add("hero-is-ready");
    return;
  }

  heroItems.forEach((item, index) => {
    item.classList.add("hero-load-item");
    item.style.setProperty("--hero-delay", `${(index * 0.12 + 0.05).toFixed(2)}s`);
  });

  if (heroPhoto) {
    heroPhoto.classList.add("hero-load-photo");
    heroPhoto.style.setProperty(
      "--hero-photo-delay",
      `${(heroItems.length * 0.12 + 0.08).toFixed(2)}s`
    );
  }

  requestAnimationFrame(() => {
    hero.classList.add("hero-is-ready");
  });
}

function collectRevealTargets() {
  const targets = new Set();

  REVEAL_SELECTORS.forEach((selector) => {
    document.querySelectorAll(selector).forEach((target) => {
      targets.add(target);
    });
  });

  return [...targets];
}

function initializeScrollReveal(reducedMotion) {
  const revealTargets = collectRevealTargets();
  if (!revealTargets.length) return;

  assignStagger(document.querySelectorAll(".skill_container .card"), 0.12, "left");
  assignStagger(document.querySelectorAll(".grid-container .container"), 0.1, "up");
  assignStagger(document.querySelectorAll("#articles-container .card"), 0.1, "up");

  if (reducedMotion || !canObserve()) {
    revealTargets.forEach((target) => {
      target.classList.remove("animate-hidden");
      target.classList.add("animate-visible");
    });
    return;
  }

  revealTargets.forEach((target) => {
    target.classList.add("animate-hidden");
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.remove("animate-hidden");
        entry.target.classList.add("animate-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  revealTargets.forEach((target) => revealObserver.observe(target));
}

function getSkillTargetWidth(skillBar) {
  const matchingLevel = Object.keys(SKILL_WIDTH_MAP).find((level) =>
    skillBar.classList.contains(level)
  );

  return matchingLevel ? SKILL_WIDTH_MAP[matchingLevel] : 0;
}

function animateSkillBars(skillBars) {
  requestAnimationFrame(() => {
    skillBars.forEach((skillBar, index) => {
      const targetWidth = skillBar.dataset.targetWidth || "0";
      skillBar.style.transitionDelay = `${(index * 0.08).toFixed(2)}s`;
      skillBar.style.width = `${targetWidth}%`;
    });
  });
}

function initializeSkillBars(reducedMotion) {
  const skillsSection = document.querySelector("#skills");
  const skillBars = [...document.querySelectorAll(".skill-level")];

  if (!skillsSection || !skillBars.length) return;

  skillBars.forEach((skillBar) => {
    const targetWidth = getSkillTargetWidth(skillBar);
    skillBar.dataset.targetWidth = String(targetWidth);

    if (reducedMotion) {
      skillBar.style.width = `${targetWidth}%`;
      return;
    }

    skillBar.style.width = "0%";
  });

  if (reducedMotion) return;

  if (!canObserve()) {
    animateSkillBars(skillBars);
    return;
  }

  const skillBarObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        animateSkillBars(skillBars);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.3 }
  );

  skillBarObserver.observe(skillsSection);
}

function initializeSectionHeadingReveal(reducedMotion) {
  const sectionHeadings = [...document.querySelectorAll(".section-head")];
  if (!sectionHeadings.length) return;

  if (reducedMotion || !canObserve()) {
    sectionHeadings.forEach((heading) => heading.classList.add("heading-visible"));
    return;
  }

  const headingObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("heading-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.5,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  sectionHeadings.forEach((heading) => headingObserver.observe(heading));
}

function initializeThemeToggleSpin(reducedMotion) {
  const themeToggleButtons = document.querySelectorAll(".theme-toggle");
  if (!themeToggleButtons.length) return;

  themeToggleButtons.forEach((button) => {
    const icon = button.querySelector("img");
    if (!icon) return;

    icon.addEventListener("animationend", () => {
      icon.classList.remove("theme-icon-spin");
    });

    button.addEventListener("click", () => {
      if (reducedMotion) return;

      icon.classList.remove("theme-icon-spin");
      void icon.offsetWidth;
      icon.classList.add("theme-icon-spin");
    });
  });
}

export default function initializeAnimations() {
  const reducedMotion = prefersReducedMotion();

  if (!reducedMotion) {
    document.documentElement.classList.add("js-animations-enabled");
  }

  initializeHeroSequence(reducedMotion);
  initializeScrollReveal(reducedMotion);
  initializeSkillBars(reducedMotion);
  initializeSectionHeadingReveal(reducedMotion);
  initializeThemeToggleSpin(reducedMotion);
}
