import { initialize as initializeTheme, initializeHamburgerMenu } from "../components/toggleTheme.js";
import initializeBackToTop from "../components/backToTop.js";
import { updateToggleIcon } from "../components/toggleTheme.js";
import getCurrentYear from "../components/getCurrentYear.js";

function initialize() {
  initializeTheme();
  initializeHamburgerMenu();
  initializeBackToTop();
  updateToggleIcon(localStorage.getItem("theme") || "dark-mode");
  getCurrentYear();
}

document.addEventListener("DOMContentLoaded", initialize);