import { setupTabs } from './tabs.js';
import { initHeader } from './header.js';
import { initMenu } from './menu.js';
import { initGallery } from './gallery.js';
import { initForm } from './form.js';
import { initFooter } from './footer.js';
import { initExport } from './export.js';
import { initApis } from './apis.js';

console.log("Main.js está carregando...");

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM carregado - Iniciando módulos...");
    
    setupTabs();
    console.log("Tabs inicializadas");
    
    initHeader();
    console.log("Header inicializado");
    
    initMenu();
    console.log("Menu inicializado");
    
    initGallery();
    console.log("Galeria inicializada");
    
    initForm();
    console.log("Formulário inicializado");
    
    initFooter();
    console.log("Footer inicializado");
    
    initExport();
    console.log("Export inicializado");

    initApis();
    console.log("APIs inicializado");
});
