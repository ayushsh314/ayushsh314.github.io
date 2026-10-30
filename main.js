const links = document.querySelectorAll(".rail a");
const sections = document.querySelectorAll(".section");

function setCurrent(id) {
  links.forEach(link => {
    link.classList.toggle("current", link.getAttribute("href") === "#" + id);
  });
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) setCurrent(entry.target.id);
  });
}, { rootMargin: "-20% 0px -70% 0px" });

sections.forEach(section => observer.observe(section));

// Logos are hotlinked, so fall back to a monogram if one fails to load.
document.querySelectorAll(".logo").forEach(slot => {
  const img = slot.querySelector("img");
  if (!img) {
    slot.classList.add("fallback");
    return;
  }
  img.addEventListener("error", () => slot.classList.add("fallback"));
  if (img.complete && img.naturalWidth === 0) slot.classList.add("fallback");
});

// Project demos loop muted while on screen; a click plays one with sound.
const demos = document.querySelectorAll(".demo");
const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setSound(button, on) {
  const video = button.querySelector("video");
  video.muted = !on;
  button.classList.toggle("sound", on);
  button.setAttribute("aria-pressed", String(on));
}

demos.forEach(button => {
  const video = button.querySelector("video");
  button.setAttribute("aria-pressed", "false");
  if (calm) button.classList.add("paused");

  button.addEventListener("click", () => {
    const on = video.paused || video.muted;
    demos.forEach(other => { if (other !== button) setSound(other, false); });
    setSound(button, on);
    if (on) {
      if (video.paused) video.currentTime = 0;
      button.classList.remove("paused");
      video.play().catch(() => {});
    } else if (calm) {
      video.pause();
      button.classList.add("paused");
    }
  });
});

if (!calm) {
  const player = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const video = entry.target.querySelector("video");
      if (entry.isIntersecting) {
        video.play().catch(() => {});
      } else {
        video.pause();
        setSound(entry.target, false);
      }
    });
  }, { threshold: 0.25 });
  demos.forEach(button => player.observe(button));
}
