export default function getCurrentYear() {
    // get current year
const currentYear = document.getElementById("current_year");
if(!currentYear) return;
currentYear.textContent = new Date().getFullYear();
}