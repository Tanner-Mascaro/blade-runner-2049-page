let phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let zipCodeRegex = /^\d{5}(-\d{4})?$/;

const stateAbbreviations = [
    'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA',
    'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA',
    'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',
    'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
    'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'
];

let form = null;

function initValidation(formId, successId) {
    form = document.getElementById(formId);

    let inputs = document.querySelectorAll("input");
    for (let input of inputs) {
        input.addEventListener("change", inputChanged);
    }
    form.addEventListener("submit", submitForm);
}

function inputChanged(ev) {
    validateForm();
    ev.currentTarget.classList.add("was-validated");
}

function submitForm(ev) {
    console.log("in submit");
    ev.preventDefault();
    ev.stopPropagation();

    let isValid = validateForm();

    if (!isValid) {
        const inputs = form.querySelectorAll("input, textarea, select");
        inputs.forEach(input => input.classList.add("was-validated"));
    } else {
        form.style.display = "none";
        document.getElementById("successMessage").style.display = "block";
    }
}

function validateForm() {
    let valid = true;

    valid = checkRequired("name", "First Name is Required") && valid;
    valid = checkRequired("lastName", "Last Name is Required") && valid;
    valid = checkRequired("city", "City is Required") && valid;

    if (checkRequired("state", "State is Required")) {
        valid = validateState("state", "Not a valid State, enter two digit code e.g., UT") && valid;
    } else {
        valid = false;
    }

    if (checkRequired("email", "Email Address is required")) {
        valid = checkFormat("email", "Email format is invalid", emailRegex) && valid;
    } else {
        valid = false;
    }

    if (checkRequired("zip", "Zip Code is Required")) {
        valid = checkFormat("zip", `Use "#####" or "#####-####" format`, zipCodeRegex) && valid;
    } else {
        valid = false;
    }

    if (checkRequired("cellPhone", "Phone is required")) {
        valid = checkFormat("cellPhone", "Use ###-###-#### format", phoneRegex) && valid;
    } else {
        valid = false;
    }

    valid = checkRequired("newspaper", "Please select at least one option") && valid;

    return valid;
}

function validateState(id, msg) {
    let el = document.getElementById(id);
    const upper = el.value.toUpperCase();
    let valid = stateAbbreviations.includes(upper);
    setElementValidity(id, valid, msg);
    return valid;
}

function checkFormat(id, msg, regex) {
    const el = document.getElementById(id);
    const value = el.value.trim();
    const valid = regex.test(value);
    setElementValidity(id, valid, msg);
    return valid;
}

function checkRequired(id, message) {
    let el = document.getElementById(id);
    let valid = false;

    switch (el.type) {
        case 'text':
        case 'password':
        case 'email':
        case 'tel':
            valid = el.value.trim() !== "";
            break;

        case 'checkbox':
        case 'radio':
            let group = document.querySelectorAll(`input[name="${el.name}"]`);
            group.forEach(function(item) {
                if (item.checked) valid = true;
            });
            break;
    }

    setElementValidity(id, valid, message);
    return valid;
}

function setElementValidity(id, valid, message) {
    let el = document.getElementById(id);

    let errorDiv;
    if (el.type === "checkbox" || el.type === "radio") {
        errorDiv = el.closest("li").querySelector(".errorMsg");
    } else {
        errorDiv = el.nextElementSibling;
    }

    if (valid) {
        el.setCustomValidity('');
        if (errorDiv) errorDiv.textContent = '';
    } else {
        el.setCustomValidity(message);
        if (errorDiv) errorDiv.textContent = message;
    }

    el.classList.add("was-validated");
}