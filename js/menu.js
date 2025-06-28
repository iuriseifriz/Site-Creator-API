export function initMenu() {
    const menuBgColorInput = document.getElementById("menu-bg-color");
    const menuTextColorInput = document.getElementById("menu-text-color");
    const menuItemBgColorInput = document.getElementById("menu-item-bg-color");
    const menuBorderRadiusInput = document.getElementById("menu-item-border-radius");
    const menuSpacingInput = document.getElementById("menu-item-spacing");
    const menuHeightInput = document.getElementById("menu-height");
    const menuAlignSelect = document.getElementById("align-items");
    const addItemInput = document.getElementById("add-item");
    const addItemBtn = document.getElementById("add-item-btn");
    const clearItemsBtn = document.getElementById("clear-items-btn");
    const toggleLogoBtn = document.getElementById("toggle-logo-btn");
    const logoFileInput = document.getElementById("logo-file");
    const generatedMenu = document.getElementById("generated-menu");
    const menuList = document.getElementById("menu-list");

    let menuItems = [];
    let menuLogoEnabled = false;
    let menuLogoSrc = null;

    //implementação da função renderMenu
    function renderMenu() {
        // Define a altura do menu principal
        const menuHeight = `${menuHeightInput.value}px`;
        generatedMenu.style.backgroundColor = menuBgColorInput.value;
        generatedMenu.style.height = menuHeight;
        generatedMenu.style.minHeight = menuHeight;
        generatedMenu.style.alignItems = 'center'; 

        // alinhamento dos itens
        menuList.style.justifyContent =
        menuAlignSelect.value === "left" ? "flex-start" :
        menuAlignSelect.value === "center" ? "center" : "flex-end";

        menuList.style.height = '100%';
        menuList.style.alignItems = 'center';

        menuList.innerHTML = "";

        // Logotipo
        if (menuLogoEnabled) {
        const logoDiv = document.createElement("div");
        logoDiv.className = "menu-logo";
        logoDiv.style.height = `calc(${menuHeight} - 10px)`;
        logoDiv.style.display = 'flex';
        logoDiv.style.alignItems = 'center';

        if (menuLogoSrc) {
            const img = document.createElement("img");
            img.src = menuLogoSrc;
            img.alt = "Logotipo";
            img.style.maxHeight = `calc(${menuHeight} - 5px)`;
            img.style.width = 'auto';
            img.className = "logo-img";
            logoDiv.appendChild(img);
        } else {
            logoDiv.textContent = "LOGO";
        }
        menuList.appendChild(logoDiv);
        }

        // Itens do menu
        menuItems.forEach((item) => {
        const div = document.createElement("div");
        div.className = "menu-item";
        div.textContent = item;
        div.style.backgroundColor = menuItemBgColorInput.value;
        div.style.color = menuTextColorInput.value;
        div.style.borderRadius = `${menuBorderRadiusInput.value}px`;
        div.style.marginRight = `${menuSpacingInput.value}px`;
        div.style.padding = '0 15px';
        div.style.height = `calc(${menuHeight} - 10px)`;
        div.style.display = 'flex';
        div.style.alignItems = 'center';
        menuList.appendChild(div);
        });
}

    // event listeners
    addItemBtn.addEventListener("click", () => {
        const newItem = addItemInput.value.trim();
        if (newItem) {
            menuItems.push(newItem);
            addItemInput.value = "";
            renderMenu();
        }
    });


    clearItemsBtn.addEventListener("click", () => {
        menuItems = [];
        renderMenu();
    });

    toggleLogoBtn.addEventListener("click", () => {
        menuLogoEnabled = !menuLogoEnabled;
        toggleLogoBtn.textContent = menuLogoEnabled
        ? "Desativar Logotipo"
        : "Ativar Logotipo";
        renderMenu();
    });

    logoFileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            menuLogoSrc = event.target.result;
            renderMenu();
        };
        reader.readAsDataURL(file);
        }
    });

    menuBgColorInput.addEventListener("input", renderMenu);
    menuTextColorInput.addEventListener("input", renderMenu);
    menuItemBgColorInput.addEventListener("input", renderMenu);
    menuBorderRadiusInput.addEventListener("input", renderMenu);
    menuSpacingInput.addEventListener("input", renderMenu);
    menuHeightInput.addEventListener("input", renderMenu);
    menuAlignSelect.addEventListener("change", renderMenu);

    renderMenu();
}