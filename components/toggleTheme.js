// shared.js - Fixed version
export function initializeThemeToggle() {
  const savedTheme = localStorage.getItem("theme") || "dark-mode";
  const body = document.body;

  body.classList.add(savedTheme);
  const themeToggles = document.querySelectorAll(".theme-toggle");

  themeToggles.forEach(button => {
    button.addEventListener("click", () => {
      if (body.classList.contains("dark-mode")) {
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
        localStorage.setItem("theme", "light-mode");
        updateToggleIcon("light-mode");
      } else {
        body.classList.remove("light-mode");
        body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark-mode");
        updateToggleIcon("dark-mode");
      }
    });
  });
}

export function updateToggleIcon(theme) {
  const themeButtons = document.querySelectorAll(".theme-toggle img");
  
  // Determine if we're on blog.html or index.html
  const isBlogPage = window.location.pathname.includes("blog.html");
  
  if (theme === "dark-mode") {
    themeButtons.forEach(img => {
      // Use correct path based on current page
      img.src = isBlogPage ? "../assets/dark.png" : "./assets/dark.png";
      img.alt = "Dark Mode";
    });
    
    // Update other icons only if they exist (on index.html)
    const nodeImg = document.querySelector('img[alt="nodejs icon"]');
    const githubImg = document.querySelector('img[alt="github icon"]');
    if (nodeImg) nodeImg.src = "./images/nodejs.png";
    if (githubImg) githubImg.src = "./images/github_white.png";
    
  } else {
    themeButtons.forEach(img => {
      img.src = isBlogPage ? "../assets/bright.png" : "./assets/bright.png";
      img.alt = "Light Mode";
    });
    
    // Update other icons only if they exist (on index.html)
    const nodeImg = document.querySelector('img[alt="nodejs icon"]');
    const githubImg = document.querySelector('img[alt="github icon"]');
    if (nodeImg) nodeImg.src = "./images/NODE.png";
    if (githubImg) githubImg.src = "./images/github.png";
  }
}

export function initialize() {
  const savedTheme = localStorage.getItem("theme") || "dark-mode";
  updateToggleIcon(savedTheme);
  initializeThemeToggle();
}

// Optional: Add hamburger menu initialization for blog page
export function initializeHamburgerMenu() {
  function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    if (menu && icon) {
      menu.classList.toggle("open");
      icon.classList.toggle("open");
    }
  }

  const hamburgerIcon = document.querySelector(".hamburger-icon");
  if (hamburgerIcon) {
    hamburgerIcon.addEventListener("click", toggleMenu);
  }
}