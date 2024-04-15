
let items = document.querySelectorAll(".header__inline-menu")[1].querySelectorAll("details")

items.forEach(item => {
    item.addEventListener("mouseover", () => {
        item.setAttribute("open", true);
        item.querySelector("ul").addEventListener("mouseleave", () => {
            item.removeAttribute("open");
        });
        item.addEventListener("mouseleave", () => {
            item.removeAttribute("open");
        });
    });

});
