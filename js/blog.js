import { articles } from "../data/projects.js";
import { initialize as initializeThemeToggle,initializeHamburgerMenu } from "../components/toggleTheme.js";
import initializeBackToTop from "../components/backToTop.js";

const container = document.getElementById("articles-container");


function renderArticles() {
  const container = document.getElementById("articles-container");
  
  if (!container) {
    console.error("Articles container not found!");
    return;
  }
  
  container.innerHTML = "";
  
  if (!articles || articles.length === 0) {
    container.style.display = "block";
    container.innerHTML = `
      <div style="text-align: center; padding: 50px; color: #666;">
        <i class="fa-regular fa-newspaper" style="font-size: 3rem; margin-bottom: 20px; opacity: 0.5;"></i>
        <p style="font-size: 1.2rem; margin-bottom: 10px;">No articles available at the moment.</p>
        <p style="font-size: 1rem; opacity: 0.8;">Please check back later!</p>
      </div>
    `;
    return; 
  }
  
  let articleCardHTML = "";
  articles.forEach(article => {
    const {url, title, description, date} = article;
    articleCardHTML += `
      <a href="${url}" target="_blank" class="card">
        <h3 class="card-title">${title}</h3>
        <p class="card-description">${description}</p>
        <div class="card-footer">
          <div class="date">
            <i class="fa-regular fa-calendar"></i>
            <time datetime="${date}">${date}</time>
          </div>
          <i class="fa-solid fa-up-right-from-square"></i>
        </div>
      </a>
    `;
  });
  
  container.innerHTML = articleCardHTML;
}

function initialize() {
    initializeThemeToggle();
    initializeHamburgerMenu();
    initializeBackToTop();
    renderArticles();
}

document.addEventListener("DOMContentLoaded", initialize);