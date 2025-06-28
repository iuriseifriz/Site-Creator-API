export function setupTabs() {
    console.log("Configurando abas...");

    if (!document.getElementById('tab-header')) {
        console.error('Elementos das abas não encontrados!');
        return;
    }

    const editors = ['header', 'menu', 'gallery', 'form', 'footer', 'export', 'apis'];
    
    function switchTab(activeTab) {
        editors.forEach(editor => {
            const editorElement = document.getElementById(`editor-${editor}`);
            const tabElement = document.getElementById(`tab-${editor}`);
            
            if (editorElement && tabElement) {
                editorElement.style.display = 'none';
                tabElement.className = 'bg-gray-700 hover:bg-gray-600 w-1/6';
            }
        });
        
        const activeEditor = document.getElementById(`editor-${activeTab}`);
        const activeTabElement = document.getElementById(`tab-${activeTab}`);
        
        if (activeEditor && activeTabElement) {
            activeEditor.style.display = 'block';
            activeTabElement.className = 'bg-green-700 hover:bg-green-600 w-1/6';
        }
    }

    function setupTabListeners() {
        const tabs = ['header', 'menu', 'gallery', 'form', 'footer', 'export', 'apis'];
        
        tabs.forEach(tab => {
            const tabElement = document.getElementById(`tab-${tab}`);
            if (tabElement) {
                tabElement.addEventListener('click', () => switchTab(tab));
            }
        });
    }

    setupTabListeners();
    switchTab('header');
}
