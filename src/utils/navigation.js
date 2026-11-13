/**
 * Navigation & Section Transition Utility
 * Provides robust smooth scrolling with exact document offset calculations,
 * avoiding offsetParent traps when sections are wrapped in positioned containers.
 * Dispatches global transition events to synchronize HUD telemetry and section arrival animations.
 */

export const SECTION_METADATA = {
  hero: { id: 'hero', code: '00', title: 'TOP / HERO', label: 'Top' },
  about: { id: 'about', code: '01', title: 'ABOUT ARCHITECT', label: 'About' },
  metrics: { id: 'metrics', code: '02', title: 'MEASURED IMPACT', label: 'Impact' },
  experience: { id: 'experience', code: '03', title: 'CAREER TIMELINE', label: 'Experience' },
  projects: { id: 'projects', code: '04', title: 'CASE STUDIES', label: 'Projects' },
  skills: { id: 'skills', code: '05', title: 'SKILL MATRIX', label: 'Skills' },
  credentials: { id: 'credentials', code: '06', title: 'CREDENTIALS & RESEARCH', label: 'Credentials' },
  achievements: { id: 'achievements', code: '07', title: 'HONORS & REVIEWS', label: 'Achievements' },
  contact: { id: 'contact', code: '08', title: 'DISPATCH CONTACT', label: 'Contact' },
};

export const smoothScrollTo = (targetSelectorOrId, event = null) => {
  if (event && typeof event.preventDefault === 'function') {
    event.preventDefault();
  }

  if (typeof window === 'undefined') return;

  const rawId = targetSelectorOrId.startsWith('#')
    ? targetSelectorOrId.slice(1)
    : targetSelectorOrId;

  const targetElement =
    document.getElementById(rawId) ||
    document.getElementById(`deck-${rawId}`) ||
    document.querySelector(targetSelectorOrId);


  if (!targetElement) {
    console.warn(`[Navigation] Target element "${targetSelectorOrId}" not found in DOM.`);
    return;
  }

  // Exact absolute document coordinate (immune to positioned parent offsetParent traps)
  const navOffset = 76;
  const elementPosition = targetElement.getBoundingClientRect().top;
  const offsetPosition = Math.max(0, elementPosition + window.scrollY - navOffset);

  // Dispatch transition event before starting scroll
  const meta = SECTION_METADATA[rawId] || { id: rawId, code: '00', title: rawId.toUpperCase(), label: rawId };
  
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('section-transition', {
        detail: {
          targetId: rawId,
          code: meta.code,
          title: meta.title,
          timestamp: Date.now(),
        },
      })
    );
  }

  // Perform smooth scroll
  try {
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  } catch {
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Visual arrival feedback on the target element
  targetElement.classList.add('section-arrived-pulse');
  setTimeout(() => {
    targetElement.classList.remove('section-arrived-pulse');
  }, 2200);
};
