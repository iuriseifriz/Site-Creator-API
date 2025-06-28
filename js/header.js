export function initHeader() {
    console.log("=== INICIANDO APP ===");

    const headerBgColorInput = document.getElementById("header-bg-color");
    const headerTextColorInput = document.getElementById("header-text-color");
    const headerItemBgColorInput = document.getElementById("header-item-bg-color");
    const headerBorderRadiusInput = document.getElementById("header-item-border-radius");
    const headerSpacingInput = document.getElementById("header-item-spacing");
    const headerHeightInput = document.getElementById("header-height");
    const headerAlignSelect = document.getElementById("header-align-items");
    const headerTextInput = document.getElementById("header-text");
    console.log("Elemento headerTextInput:", headerTextInput);
    const toggleHeaderLogoBtn = document.getElementById("toggle-header-logo-btn");
    const headerLogoFileInput = document.getElementById("header-logo-file");
    const generatedHeader = document.getElementById("generated-header");

    let headerLogoEnabled = false;
    let headerLogoSrc = null;


    function renderHeader() {
        const headerHeight = `${headerHeightInput.value}px`;
        
        // estilos do container principal
        generatedHeader.style.backgroundColor = headerBgColorInput.value;
        generatedHeader.style.height = headerHeight;
        generatedHeader.style.minHeight = headerHeight;
        generatedHeader.style.display = 'flex';
        generatedHeader.style.alignItems = 'center';
        generatedHeader.style.justifyContent =
        headerAlignSelect.value === "left" ? "flex-start" :
        headerAlignSelect.value === "center" ? "center" : "flex-end";
        generatedHeader.style.padding = '0 20px';
        generatedHeader.style.flexWrap = 'wrap';

        generatedHeader.innerHTML = "";

        // Imagem logo
        if (headerLogoEnabled) {
        const imgContainer = document.createElement("div");
        imgContainer.style.display = 'flex';
        imgContainer.style.alignItems = 'center';
        imgContainer.style.height = `calc(${headerHeight} * 0.8)`;
        
        const img = document.createElement("img");
        img.src = headerLogoSrc || "";
        img.alt = "Logo Cabeçalho";
        img.style.maxHeight = '100%';
        img.style.width = 'auto';
        img.style.marginRight = headerSpacingInput.value + "px";
        
        imgContainer.appendChild(img);
        generatedHeader.appendChild(imgContainer);
        }

        // Texto do cabeçalho
        if (headerTextInput.value.trim() !== "") {
        const textContainer = document.createElement("div");
        textContainer.style.display = 'flex';
        textContainer.style.alignItems = 'center';
        textContainer.style.height = `calc(${headerHeight} * 0.8)`;
        
        const span = document.createElement("span");
        span.textContent = headerTextInput.value;
        span.style.backgroundColor = headerItemBgColorInput.value;
        span.style.color = headerTextColorInput.value;
        span.style.borderRadius = `${headerBorderRadiusInput.value}px`;
        span.style.padding = "6px 12px";
        span.style.lineHeight = '1';
        span.style.display = 'inline-flex';
        span.style.alignItems = 'center';
        
        textContainer.appendChild(span);
        generatedHeader.appendChild(textContainer);
        }
    }

    // event listeners
    headerTextInput.addEventListener("input", renderHeader);

    toggleHeaderLogoBtn.addEventListener("click", () => {
        headerLogoEnabled = !headerLogoEnabled;
        toggleHeaderLogoBtn.textContent = headerLogoEnabled
            ? "Desativar Imagem de Cabeçalho"
            : "Ativar Imagem de Cabeçalho";
        renderHeader();
    });

    headerLogoFileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            headerLogoSrc = event.target.result;
            renderHeader();
        };
        reader.readAsDataURL(file);
        }
    });

    headerTextInput.addEventListener("input", renderHeader);
    headerBgColorInput.addEventListener("input", renderHeader);
    headerTextColorInput.addEventListener("input", renderHeader);
    headerItemBgColorInput.addEventListener("input", renderHeader);
    headerBorderRadiusInput.addEventListener("input", renderHeader);
    headerSpacingInput.addEventListener("input", renderHeader);
    headerHeightInput.addEventListener("input", renderHeader);
    headerAlignSelect.addEventListener("change", renderHeader);

    renderHeader();
}