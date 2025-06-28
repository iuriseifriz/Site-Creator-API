export function initForm() {
    const formContainer = document.getElementById("form-container");
    const formTitleInput = document.getElementById("form-title-input");
    const formBgColorInput = document.getElementById("form-bg-color");
    const formBorderColorInput = document.getElementById("form-border-color");
    const formBorderRadiusInput = document.getElementById("form-border-radius");
    const formTitleColorInput = document.getElementById("form-title-color");
    const formLabelColorInput = document.getElementById("form-label-color");
    const formFieldBgColorInput = document.getElementById("form-field-bg-color");
    const addFieldBtn = document.getElementById("add-form-field-btn");

    let fields = [
        { label: "Nome", type: "text", required: true, options: [] },
        { label: "E-mail", type: "email", required: true, options: [] },
        { label: "Telefone", type: "tel", required: false, options: [] },
        { label: "Mensagem", type: "textarea", required: false, options: [] }
    ];

    let editingIndex = null;

    
    function renderForm() {
        formContainer.innerHTML = "";

        formContainer.style.backgroundColor = formBgColorInput.value;
        formContainer.style.borderColor = formBorderColorInput.value;
        formContainer.style.borderRadius = `${formBorderRadiusInput.value}px`;

        const title = document.createElement("div");
        title.className = "form-title";
        title.textContent = formTitleInput.value;
        title.style.color = formTitleColorInput.value;
        formContainer.appendChild(title);

        fields.forEach((field, index) => {
        const fieldDiv = document.createElement("div");
        fieldDiv.className = "form-field";
        fieldDiv.style.backgroundColor = formFieldBgColorInput.value;

        const label = document.createElement("label");
        label.className = "form-field-label";
        label.textContent = field.label;
        label.style.color = formLabelColorInput.value;
        if (field.required) {
            const requiredSpan = document.createElement("span");
            requiredSpan.textContent = " *";
            requiredSpan.style.color = "#c0392b";
            label.appendChild(requiredSpan);
        }
        fieldDiv.appendChild(label);

        let input;
        if (field.type === "textarea") {
            input = document.createElement("textarea");
            input.className = "form-field-input";
            input.rows = 4;
            input.style.backgroundColor = formFieldBgColorInput.value;
        } else if (field.type === "select") {
            input = document.createElement("select");
            input.className = "form-field-select";
            input.style.backgroundColor = formFieldBgColorInput.value;
            field.options.forEach(opt => {
            const option = document.createElement("option");
            option.textContent = opt;
            input.appendChild(option);
            });
        } else if (field.type === "radio") {
            input = document.createElement("div");
            field.options.forEach(opt => {
            const radioDiv = document.createElement("div");
            radioDiv.className = "form-field-radio";
            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = `radio-${index}`;
            radio.style.backgroundColor = formFieldBgColorInput.value;
            const span = document.createElement("span");
            span.textContent = opt;
            span.style.color = formLabelColorInput.value;
            radioDiv.appendChild(radio);
            radioDiv.appendChild(span);
            input.appendChild(radioDiv);
            });
        } else {
            input = document.createElement("input");
            input.type = field.type;
            input.className = "form-field-input";
            input.style.backgroundColor = formFieldBgColorInput.value;
            input.placeholder = `Digite ${field.label.toLowerCase()}`;
        }

        input.required = field.required;
        input.disabled = false;
        fieldDiv.appendChild(input);

        const controls = document.createElement("div");
        controls.className = "form-field-control";
        const delBtn = document.createElement("button");
        delBtn.className = "form-field-delete-btn";
        delBtn.textContent = "Remover";
        delBtn.addEventListener("click", () => {
            fields.splice(index, 1);
            renderForm();
        });

        const editBtn = document.createElement("button");
        editBtn.className = "form-field-delete-btn";
        editBtn.style.backgroundColor = "#2980b9";
        editBtn.textContent = "Editar";
        editBtn.addEventListener("click", () => {
            document.getElementById("field-properties-editor").style.display = "block";
            document.getElementById("field-label-input").value = field.label;
            document.getElementById("field-type-select").value = field.type;
            document.getElementById("field-required-check").checked = field.required;
            document.getElementById("field-options-input").value = field.options?.join(", ") || "";
            document.getElementById("options-container").style.display = ["select", "radio"].includes(field.type) ? "block" : "none";
            editingIndex = index;
        });

        controls.appendChild(editBtn);
        controls.appendChild(delBtn);
        fieldDiv.appendChild(controls);
        formContainer.appendChild(fieldDiv);
        });

        const submitBtn = document.createElement("button");
        submitBtn.className = "form-submit-btn";
        submitBtn.textContent = "Enviar Formulário";
        formContainer.appendChild(submitBtn);
    }
        
    addFieldBtn.addEventListener("click", () => {
        fields.push({ label: "Novo Campo", type: "text", required: false, options: [] });
        renderForm();
    });

    document.getElementById("field-type-select").addEventListener("change", e => {
        document.getElementById("options-container").style.display =
        ["select", "radio"].includes(e.target.value) ? "block" : "none";
    });

    document.getElementById("update-field-btn").addEventListener("click", () => {
        if (editingIndex !== null) {
        fields[editingIndex] = {
            label: document.getElementById("field-label-input").value,
            type: document.getElementById("field-type-select").value,
            required: document.getElementById("field-required-check").checked,
            options: document.getElementById("field-options-input").value.split(",").map(s => s.trim()).filter(Boolean),
        };
        editingIndex = null;
        document.getElementById("field-properties-editor").style.display = "none";
        renderForm();
        }
    });

    document.getElementById("cancel-field-edit-btn").addEventListener("click", () => {
        editingIndex = null;
        document.getElementById("field-properties-editor").style.display = "none";
    });

    [
        formTitleInput, formBgColorInput, formBorderColorInput,
        formBorderRadiusInput, formTitleColorInput, formLabelColorInput,
        formFieldBgColorInput
    ].forEach(input => input.addEventListener("input", renderForm));

    // Inicializar com alguns campos de exemplo
    fields = [
        { label: "Nome", type: "text", required: true, options: [] },
        { label: "E-mail", type: "email", required: true, options: [] },
        { label: "Telefone", type: "tel", required: false, options: [] },
        { label: "Mensagem", type: "textarea", required: false, options: [] }
    ];

    renderForm();
}