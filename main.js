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
