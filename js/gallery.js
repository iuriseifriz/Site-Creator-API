export function initGallery() {
    const galleryContainer = document.getElementById("gallery-container");
    const addCardBtn = document.getElementById("add-card-btn");
    const cardBgColorInput = document.getElementById("card-bg-color");
    const cardBorderColorInput = document.getElementById("card-border-color");
    const cardBorderRadiusInput = document.getElementById("card-border-radius");
    const cardWidthInput = document.getElementById("card-width");
    const cardHeightInput = document.getElementById("card-height");
    const cardTextBgColorInput = document.getElementById("card-text-bg-color");
    const cardTextColorInput = document.getElementById("card-text-color");
    const cardTextFontSizeInput = document.getElementById("card-text-font-size");
    const gallerySpacingInput = document.getElementById("gallery-spacing");
    const galleryAlignSelect = document.getElementById("gallery-align");

    // Array dos cards da galeria
    let galleryCards = [];

    function createGalleryCard(cardData, index) {
        const card = document.createElement("div");
        card.className = "gallery-card";
        card.style.backgroundColor = cardBgColorInput.value;
        card.style.borderColor = cardBorderColorInput.value;
        card.style.borderStyle = "solid";
        card.style.borderRadius = `${cardBorderRadiusInput.value}px`;
        card.style.width = `${cardWidthInput.value}px`;
        card.style.height = `${cardHeightInput.value}px`;
        card.style.display = "flex";
        card.style.flexDirection = "column";

        const img = document.createElement("img");
        img.src = cardData.imageSrc || "";
        img.alt = "Imagem do Card";
        img.style.height = "140px";
        img.style.width = "100%";
        img.style.objectFit = "cover";

        // input para trocar imagem
        img.addEventListener("click", () => {

        // input file temporário
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*";
        fileInput.style.display = "none";
        fileInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                galleryCards[index].imageSrc = ev.target.result;
                renderGallery();
            };
            reader.readAsDataURL(file);
            }
        });
        document.body.appendChild(fileInput);
        fileInput.click();
        document.body.removeChild(fileInput);
        });

        card.appendChild(img);

        // Container dos textos do card
        const textsContainer = document.createElement("div");
        textsContainer.className = "card-texts";
        textsContainer.style.backgroundColor = cardTextBgColorInput.value;
        textsContainer.style.color = cardTextColorInput.value;
        textsContainer.style.fontSize = `${cardTextFontSizeInput.value}px`;
        textsContainer.style.flexGrow = "1";
        textsContainer.style.display = "flex";
        textsContainer.style.flexDirection = "column";
        textsContainer.style.justifyContent = "center";

        // Texto 1 - título
        const text1Input = document.createElement("input");
        text1Input.type = "text";
        text1Input.placeholder = "Título";
        text1Input.value = cardData.text1 || "";
        text1Input.addEventListener("input", (e) => {
        galleryCards[index].text1 = e.target.value;
        });
        textsContainer.appendChild(text1Input);

        // Texto 2 - descrição
        const text2Input = document.createElement("input");
        text2Input.type = "text";
        text2Input.placeholder = "Descrição";
        text2Input.value = cardData.text2 || "";
        text2Input.addEventListener("input", (e) => {
        galleryCards[index].text2 = e.target.value;
        });
        textsContainer.appendChild(text2Input);

        card.appendChild(textsContainer);

        // Botão para excluir card
        const controlsDiv = document.createElement("div");
        controlsDiv.className = "card-controls";

        const delBtn = document.createElement("button");
        delBtn.textContent = "Excluir";
        delBtn.addEventListener("click", () => {
        galleryCards.splice(index, 1);
        renderGallery();
        });

        controlsDiv.appendChild(delBtn);
        card.appendChild(controlsDiv);

        return card;
    }

    
    function renderGallery() {
        galleryContainer.style.justifyContent = galleryAlignSelect.value;
        galleryContainer.style.gap = `${gallerySpacingInput.value}px`;
        galleryContainer.innerHTML = "";

        galleryCards.forEach((cardData, index) => {
        const card = createGalleryCard(cardData, index);
        galleryContainer.appendChild(card);
        });
    }

    addCardBtn.addEventListener("click", () => {
        galleryCards.push({
            imageSrc: "",
            text1: "",
            text2: "",
        });
        renderGallery();
    });

    renderGallery();
}