export function initExport() {

    ////////// Botões ///////////

    function mostrarCodigo() {
        const codigoCompleto = gerarCodigoCompleto();
        const codePreview = document.getElementById('code-preview');
        codePreview.textContent = codigoCompleto;
        codePreview.style.display = 'block';
    }

    function salvarLocalStorage() {
        try {
            const codigoCompleto = gerarCodigoCompleto();
            localStorage.setItem('siteHTML', codigoCompleto);
            mostrarStatus('Código salvo com sucesso!', 'success');
        } catch (error) {
            mostrarStatus('Erro ao salvar: ' + error.message, 'error');
        }
    }

    function carregarLocalStorage() {
        try {
            const codigoSalvo = localStorage.getItem('siteHTML');
            if (codigoSalvo) {
                const codePreview = document.getElementById('code-preview');
                codePreview.textContent = codigoSalvo;
                codePreview.style.display = 'block';
                mostrarStatus('Código carregado com sucesso!', 'success');
            } else {
                mostrarStatus('Nenhum código salvo encontrado', 'error');
            }
        } catch (error) {
            mostrarStatus('Erro ao carregar: ' + error.message, 'error');
        }
    }

    function limparLocalStorage() {
        try {
            localStorage.removeItem('siteHTML');
            mostrarStatus('Armazenamento limpo com sucesso!', 'success');
        } catch (error) {
            mostrarStatus('Erro ao limpar: ' + error.message, 'error');
        }
    }

    //////  geração de código //////////

        function gerarCodigoCompleto() {
        // clona elementos e remove event listeners
        const header = document.getElementById('generated-header').cloneNode(true);
        const menu = document.getElementById('generated-menu').cloneNode(true);
        const gallery = document.getElementById('gallery-container').cloneNode(true);
        const form = document.getElementById('form-container').cloneNode(true);
        const footer = document.getElementById('generated-footer').cloneNode(true);

        // processa imagens
        processarImagensParaBase64(header);
        processarImagensParaBase64(menu);
        processarImagensParaBase64(gallery);
        processarImagensParaBase64(footer);

        // gera HTML
        return `<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Site Gerado</title>
<style>${gerarCSS()}</style>
</head>
<body>
${header.outerHTML}
${menu.outerHTML}
<main style="min-height: 60vh; padding: 20px;">
${gallery.outerHTML}
${form.outerHTML}
</main>
${footer.outerHTML}
</body>
</html>`;
    }

    // processar imagens
    function processarImagensParaBase64(element) {
        const images = element.getElementsByTagName('img');
        for (let img of images) {
            if (img.src && !img.src.startsWith('data:')) {
                try {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = img.naturalWidth;
                    canvas.height = img.naturalHeight;
                    ctx.drawImage(img, 0, 0);
                    img.src = canvas.toDataURL('image/png');
                } catch (e) {
                    console.error('Erro ao converter imagem:', e);
                }
            }
        }
    }

    function gerarCSS() {
        return `
/* ========== ESTILOS GERAIS ========== */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: white;
}

/* ========== CABEÇALHO ========== */
.generated-header {
    background-color: ${document.getElementById('header-bg-color').value};
    color: ${document.getElementById('header-text-color').value};
    min-height: ${document.getElementById('header-height').value}px; /* Altura mínima garantida */
    height: auto;
    display: flex;
    align-items: center;
    padding: 0 20px;
    gap: ${document.getElementById('header-item-spacing').value}px;
    justify-content: ${document.getElementById('header-align-items').value === 'left' ? 'flex-start' :
                document.getElementById('header-align-items').value === 'center' ? 'center' : 'flex-end'};
    flex-wrap: wrap;
    border-bottom: 2px solid #ccc;
}

/* ========== MENU ========== */
.generated-menu {
    background-color: ${document.getElementById('menu-bg-color').value};
    min-height: ${document.getElementById('menu-height').value}px;
    height: ${document.getElementById('menu-height').value}px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box; /* Importante: inclui padding na altura total */
}

.menu-items {
    display: flex;
    gap: ${document.getElementById('menu-item-spacing').value}px;
    width: 100%;
    height: 100%; /* Ocupa toda a altura do menu */
    align-items: center; /* Centraliza verticalmente os itens */
}

.menu-item {
    background-color: ${document.getElementById('menu-item-bg-color').value};
    color: ${document.getElementById('menu-text-color').value};
    border-radius: ${document.getElementById('menu-item-border-radius').value}px;
    padding: 0 20px;
    height: ${document.getElementById('menu-height').value - 10}px; /* Ajuste fino */
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
}

/* ========== GALERIA ========== */
.gallery-container {
    display: flex;
    flex-wrap: wrap;
    gap: ${document.getElementById('gallery-spacing').value}px;
    padding: 20px;
    justify-content: ${document.getElementById('gallery-align').value};
    background-color: transparent;
}

.gallery-card {
    background-color: ${document.getElementById('card-bg-color').value};
    border: 1px solid ${document.getElementById('card-border-color').value};
    border-radius: ${document.getElementById('card-border-radius').value}px;
    width: ${document.getElementById('card-width').value}px;
    height: ${document.getElementById('card-height').value}px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

/* ========== FORMULÁRIO ========== */
.form-container {
    background-color: ${document.getElementById('form-bg-color').value};
    border: 1px solid ${document.getElementById('form-border-color').value};
    border-radius: ${document.getElementById('form-border-radius').value}px;
    padding: 20px;

        
    margin: 20px auto; /* Centraliza horizontalmente */
    width: 90%; /* Largura responsiva */
    max-width: 600px; 
}

.form-title {
    color: ${document.getElementById('form-title-color').value};
    font-size: 20px;
    text-align: center;
    margin-bottom: 20px;
}

.form-field {
    margin-bottom: 15px;
    background-color: ${document.getElementById('form-field-bg-color').value};
    padding: 10px;
    border-radius: 5px;
}

/* ===== CAMPOS DO FORMULÁRIO ===== */
.form-field-input, .form-field-select, .form-field textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: ${document.getElementById('form-field-bg-color').value};
    color: #333;
    box-sizing: border-box;
}

.form-field-label {
    color: ${document.getElementById('form-label-color').value};
    font-weight: bold;
    margin-bottom: 5px;
    display: block;
}


/* ========== RODAPÉ ========== */
.generated-footer {
    background-color: ${document.getElementById('footer-bg-color').value};
    color: ${document.getElementById('footer-text-color').value};
    padding: 20px;
    text-align: ${document.getElementById('footer-align').value};
    font-size: ${document.getElementById('footer-font-size').value}px;
}
`;
    }

    function cssTextFromStyle(style) {
        return Array.from(style)
            .filter(prop => !prop.startsWith('-'))
            .map(prop => `${prop}: ${style.getPropertyValue(prop)};`)
            .join('\n      ');
    }

    function cssTextFromStyle(style) {
        return Array.from(style)
            .filter(prop => !prop.startsWith('-'))
            .map(prop => `${prop}: ${style.getPropertyValue(prop)};`)
            .join('\n      ');
    }



    function mostrarStatus(mensagem, tipo) {
        const statusElement = document.getElementById('status-message');
        statusElement.textContent = mensagem;
        statusElement.className = 'status-message ' + tipo;
        statusElement.style.opacity = 1;

        setTimeout(() => {
            statusElement.style.opacity = 0;
        }, 3000);
    }




    document.getElementById('show-code-btn').addEventListener('click', mostrarCodigo);
    document.getElementById('save-code-btn').addEventListener('click', salvarLocalStorage);
    document.getElementById('load-code-btn').addEventListener('click', carregarLocalStorage);
    document.getElementById('clear-code-btn').addEventListener('click', limparLocalStorage);

}