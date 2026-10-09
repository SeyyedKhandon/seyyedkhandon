/** Marks the top-bar link of the section you are reading. */
export function initScrollSpy(): void {
  if (!('IntersectionObserver' in window)) return;

  const links = [...document.querySelectorAll<HTMLAnchorElement>('.nav-links a')];
  const sections = links.map((link) => document.querySelector<HTMLElement>(link.hash));

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        links.forEach((link, i) => link.classList.toggle('current', sections[i] === entry.target));
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  sections.forEach((section) => section && observer.observe(section));
}
