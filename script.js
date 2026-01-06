import projects from "./data/projects.js";

// Smooth scrolling and active link highlighting

const links = document.querySelectorAll(".navbar-links a, .menu-links a");
links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }

    links.forEach((otherLink) => {
      otherLink.classList.remove("active");
    });
    link.classList.add("active");
  });
});

// Hamburger menu

function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

function initializeHamburgerMenu() {
  const hamburgerIcon = document.querySelector(".hamburger-icon");
  if (hamburgerIcon) {
    hamburgerIcon.addEventListener("click", toggleMenu);
  }
}

// Theme toggle
function initializeThemeToggle() {
  const savedTheme = localStorage.getItem("theme") || "dark-mode";
  const body = document.body;

  body.classList.add(savedTheme);
  const themeToggles = document.querySelectorAll(".theme-toggle");

  console.log(themeToggles  );
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
function updateToggleIcon(theme) {
  const nodeImg = document.querySelector('img[alt="nodejs icon"]');
  const githubImg = document.querySelector('img[alt="github icon"]');
  
  const themeButtons = document.querySelectorAll(".theme-toggle img");
  
  if (theme === "dark-mode") {
    themeButtons.forEach(img => {
      img.src = "./Assets/dark.png";
      img.alt = "Dark Mode";
    });
    nodeImg.src = "./images/nodejs.png";
    githubImg.src = "./images/github_white.png";
  } else {
    themeButtons.forEach(img => {
      img.src = "./Assets/bright.png";
      img.alt = "Light Mode";
    });
    nodeImg.src = "./images/NODE.png";
    githubImg.src = "./images/github.png";
  }
}

// Sticky navbar
window.addEventListener("scroll", () => {
  const navbar = document.querySelector("nav");
  navbar.classList.toggle("sticky", window.scrollY > 200);
});

// Projects iteration

let projectCardHTML = "";
projects.forEach((project) => {
  console.log(project);
  const {
    id,
    title,
    img,
    stack,
    stack_type,
    progress,
    liveLink,
    githubLink,
    description,
  } = project;

  projectCardHTML += `
  <div class="container">
     <div class="project_img" style="background: #333;">
        <img src="${img}" loading="lazy" alt="project of ${title}" />
      </div>
      <div class="project">
        <div class="project_status">
          <div class="stack_type">${stack_type}</div>
          <div class="project_progress ${progress}">${progress}</div>
        </div>
        <div class="project_details">
          <h2 class="project_title">${title} </h2>
          <p class="project_info">
            ${description}
          </p>
        </div>
        <div class="project_stack">
          ${stack.map((tech) => `<p>${tech}</p>`).join("")}
        </div>
        <div class="project_display">
          <div class="project_links"><a href="${liveLink}" target="_blank">view live <img src="./Assets/right-arrow.png" alt="" /></a
          ></div><a target="_blank" class="github_icon" href="${githubLink}"
            >
</a>
        </div>
      </div>
    </div>
  `;
});

const container = document.querySelector(".js-grid-container");
container.innerHTML = projectCardHTML;

function initialize() {
  initializeHamburgerMenu();
  initializeThemeToggle();
}

document.addEventListener("DOMContentLoaded", initialize);
