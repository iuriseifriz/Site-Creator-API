export function initFooter() {

function renderFooter() {
    const footer = document.getElementById('generated-footer');

    // Configuração do rodapé
    footer.style.backgroundColor = document.getElementById('footer-bg-color').value;
    footer.style.color = document.getElementById('footer-text-color').value;
    footer.style.fontSize = document.getElementById('footer-font-size').value + 'px';
    footer.style.textAlign = document.getElementById('footer-align').value;
    footer.style.padding = '20px';

    footer.style.display = 'flex';
    footer.style.flexDirection = 'column';
    footer.style.alignItems = 
    document.getElementById('footer-align').value === 'left' ? 'flex-start' :
    document.getElementById('footer-align').value === 'center' ? 'center' : 'flex-end';

    // Processa a imagem do rodapé
    const footerImage = document.getElementById('footer-image-preview');
    if (footerImage && footerImage.src) {
    footerImage.style.maxHeight = '80px';
    footerImage.style.marginBottom = '10px';
    footerImage.style.display = 'block';
    } else {
    const existingImg = footer.querySelector('img');
    if (existingImg) {
        existingImg.remove();
    }
    }

    const footerText = document.getElementById('footer-text-content') || document.createElement('div');
    footerText.textContent = document.getElementById('footer-text').value;
    footerText.style.margin = '0';

    footer.innerHTML = '';
    if (footerImage && footerImage.src) {
    footer.appendChild(footerImage.cloneNode(true));
    }
    footer.appendChild(footerText);
}

function atualizarFooter() {
    const texto = document.getElementById('footer-text').value;
    const tamanho = document.getElementById('footer-font-size').value + 'px';
    const corTexto = document.getElementById('footer-text-color').value;
    const corFundo = document.getElementById('footer-bg-color').value;
    const alinhamento = document.getElementById('footer-align').value;

    const footer = document.getElementById('generated-footer');
    footer.innerText = texto;
    footer.style.fontSize = tamanho;
    footer.style.color = corTexto;
    footer.style.backgroundColor = corFundo;
    footer.style.textAlign = alinhamento;
}

    //event listeners
    document.getElementById('footer-text').addEventListener('input', renderFooter);
    document.getElementById('footer-font-size').addEventListener('input', renderFooter);
    document.getElementById('footer-text-color').addEventListener('input', renderFooter);
    document.getElementById('footer-bg-color').addEventListener('input', renderFooter);
    document.getElementById('footer-align').addEventListener('change', renderFooter);
    window.onload = atualizarFooter;

    renderFooter();
    atualizarFooter();
}