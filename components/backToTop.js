export default function initializeBackToTop() {
  const backToTopButton = document.querySelector(".back_to_top");

  if(!backToTopButton) return;

  backToTopButton.style.display = "none";

  window.addEventListener("scroll", () => {
    window.scrollY > 500
      ? (backToTopButton.style.display = "flex")
      : (backToTopButton.style.display = "none");
  });

  

  backToTopButton.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
