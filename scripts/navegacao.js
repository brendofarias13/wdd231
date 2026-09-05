const menuButton = document.querySelector("#menuButton");
const mainNav = document.querySelector("#mainNav");

menuButton.addEventListener("click", () => {

    const open = mainNav.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", open);

    menuButton.textContent = open ? "✕" : "☰";

});