import projects from "./data/projects.js";

// Smooth scrolling and active link highlighting

const links = document.querySelectorAll(".navbar-links a, .menu-links a");
links.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
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

window.toggleMenu = function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

window.addEventListener("scroll", () => {
  const navbar = document.querySelector("nav");
  navbar.classList.toggle("sticky", window.scrollY > 200);
});



// Projects iteration

let projectCardHTML="";
projects.forEach((project) => {
    console.log(project);
    const { id, title, img, stack,stack_type, progress, liveLink, githubLink, description } = project;

  projectCardHTML += `
  <div class="container">
     <div class="project_img">
        <img src="${img}" alt="project of ${title}" />
      </div>
      <div class="project">
        <div class="project_status">
          <div class="stack_type">${stack_type}</div>
          <div class="project_progress">${progress}</div>
        </div>
        <div class="project_details">
          <h2 class="project_title">${title} </h2>
          <p class="project_info">
            ${description}
          </p>
        </div>
        <div class="project_stack">
          ${stack.map(tech => `<p>${tech}</p>`).join('')}
        </div>
        <div class="project_display">
          <a href="${liveLink}">view live</a
          ><a class="github_icon" href="${githubLink}"
            >
            <img src="./Assets/github-mark-white.png" alt="" 
          /></a>
        </div>
      </div>
    </div>
  `;
});

const container = document.querySelector(".js-grid-container");
container.innerHTML = projectCardHTML;  