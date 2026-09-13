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
