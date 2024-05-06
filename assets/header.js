
let items = document.querySelectorAll(".header__inline-menu")[1].querySelectorAll("details")

items.forEach(item => {
    item.addEventListener("mouseover", () => {
        item.setAttribute("open", true);

        let dropdownItems = item.querySelectorAll("li");
        dropdownItems.forEach(item => {
            item.addEventListener("mouseover", () => {
                item.classList.add("menu-item-gc-dropdown");
            });
            item.addEventListener("mouseleave", () => {
                item.classList.remove("menu-item-gc-dropdown");
            });
        })

        item.querySelector("ul").addEventListener("mouseleave", () => {
            item.removeAttribute("open");
        });
        item.addEventListener("mouseleave", () => {
            item.removeAttribute("open");
            dropdownItems.forEach(item => {
                item.classList.remove("menu-item-gc-dropdown");
            })
        });
    });

});
