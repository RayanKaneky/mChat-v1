Noodl.defineNode({
    name: "ChatInputAutoGrow",
    category: "Visual",
    initialize() {
        // Initialisation interne de Noodl
    },
    inputs: {
        placeholder: { type: "string", default: "Écrire un message..." }
    },
    outputs: {
        onTextChanged: { type: "signal" },
        text: { type: "string" }
    },
    getHtml() {
        // Crée l'élément HTML textarea natif
        const textarea = document.createElement('textarea');
        textarea.rows = 1;
        textarea.placeholder = this.inputs.placeholder;
        
        // Application du style de base
        Object.assign(textarea.style, {
            width: '100%',
            height: '40px',
            minHeight: '40px',
            maxHeight: '150px',
            resize: 'none',
            borderRadius: '20px',
            padding: '10px 15px',
            border: '1px solid #ccc',
            outline: 'none',
            boxSizing: 'border-box',
            fontFamily: 'inherit'
        });

        // Gestionnaire d'auto-agrandissement en temps réel
        textarea.addEventListener('input', () => {
            textarea.style.height = '40px'; // Réinitialise pour recalculer
            const newHeight = Math.min(textarea.scrollHeight, 150);
            textarea.style.height = newHeight + 'px';

            // Met à jour les données dans Noodl
            this.outputs.text = textarea.value;
            this.flagOutputDirty('text');
            this.sendSignal('onTextChanged');
        });

        return textarea;
    }
});

