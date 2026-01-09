import { articles } from "../data/projects.js";
import { initialize } from "../components/toggleTheme.js";

const container = document.getElementById("articles-container");

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

  container.innerHTML = articleCardHTML;
});

document.addEventListener("DOMContentLoaded", initialize);