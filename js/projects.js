import projects from "../data/projects.js";
import {
  initializeThemeToggle,
  initializeHamburgerMenu,
  updateToggleIcon,
} from "../components/toggleTheme.js";
import initializeBackToTop from "../components/backToTop.js";
import getCurrentYear from "../components/getCurrentYear.js";

let projectCardHTML = "";

// Iterate over all projects without slicing
projects.forEach((project) => {
  const {
    id, title, img, stack, stack_type, progress, liveLink, githubLink, description,
  } = project;

  projectCardHTML += `
  <div class="container">
     <div class="project_img" style="background: #333;">
        <img src=".${img}" loading="lazy" alt="project of ${title}" />
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
          <div class="project_links"><a href="${liveLink}" target="_blank">view live <img src="../assets/right-arrow.png" alt="" /></a
          ></div><a target="_blank" class="github_icon" href="${githubLink}"
            ></a>
        </div>
      </div>
    </div>
  `;
});

// Inject into the new container
const container = document.querySelector(".js-all-projects-container");
if (container) {
    container.innerHTML = projectCardHTML;
}

function initialize() {
  initializeHamburgerMenu();
  initializeThemeToggle();
  initializeBackToTop();
  updateToggleIcon(localStorage.getItem("theme") || "dark-mode");
  getCurrentYear();
}

document.addEventListener("DOMContentLoaded", initialize);