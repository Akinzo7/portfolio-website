const links = document.querySelectorAll('.navbar-links a');

links.forEach(link => {
    link.addEventListener('click', () => {
        links.forEach(otherLink => {
            otherLink.classList.remove('active');
        });
        link.classList.add('active');
    });
});

function toggleMenu() {
    const menu = document.querySelector('.menu-links');
    const icon = document.querySelector('.hamburger-icon');
    menu.classList.toggle('open');
    icon.classList.toggle('open');
}