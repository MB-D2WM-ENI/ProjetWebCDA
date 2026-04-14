window.onload = init;
displayPreferences();

function init() {
    const buttonSave = document.getElementById('savePref');
    if (buttonSave) {
        buttonSave.addEventListener('click', savePreferences);
        buttonSave.addEventListener('click', showAlert);
        buttonSave.addEventListener('click', displayPreferences);
    }
}

function savePreferences() {
    const selectedTheme = document.getElementById('themes').value
    const selectedDisplay = document.querySelector('input[name="display"]:checked').id
    localStorage.setItem('theme', selectedTheme);
    localStorage.setItem('display', selectedDisplay);
}

function displayPreferences() {
    const light = document.getElementById('light')
    const dark = document.getElementById('dark')
    const list = document.getElementById('list')
    const cards = document.getElementById('cards')

    let display = localStorage.getItem('display');
    let theme = localStorage.getItem('theme');

    // Edit theme (light or dark)
    if (theme === 'dark') {
        if (dark) {
            dark.setAttribute('selected', 'selected')
            light.removeAttribute('selected')
        }
        document.documentElement.setAttribute('data-theme', 'coffee')
    } else if (theme === 'light') {
        if (light) {
            light.setAttribute('selected', 'selected')
            dark.removeAttribute('selected')
        }
        document.documentElement.setAttribute('data-theme', 'retro')
    }

    // Edit display (list or cards)
    if (display === 'list') {
        if(list) {
            list.setAttribute('checked', 'checked')
            cards.removeAttribute('checked')
        }
    } else if (display === 'cards') {
        if (cards) {
            cards.setAttribute('checked', 'checked')
            list.removeAttribute('checked')
        }
    }
}

function showAlert() {
    let display = localStorage.getItem('display');
    let theme = localStorage.getItem('theme');

    const html_main = document.querySelector('main')
    let divAlert = document.getElementById('divAlert')

    if (!divAlert) {
        divAlert = document.createElement('div')
        divAlert.setAttribute('role', 'alert')
        divAlert.setAttribute('id', 'divAlert')
        divAlert.classList.add('alert', 'alert-soft', 'absolute', '-top-12')
        html_main.insertAdjacentElement('afterbegin', divAlert)
        divAlert.innerHTML = '<span id="messageSavePrefs"></span>'
    }

    const message = document.getElementById('messageSavePrefs')
    if ((display === "list" || display === "cards") && (theme === "light" || theme === "dark")) {
        divAlert.removeAttribute('hidden')
        divAlert.classList.add('alert-success')
        message.innerHTML = '<i class="fa-solid fa-square-check me-2"></i>Vos préférences ont bien été enregistrées.'
    } else {
        divAlert.removeAttribute('hidden')
        divAlert.classList.remove('alert-success')
        divAlert.classList.add('alert-error')
        message.innerHTML = '<i class="fa-solid fa-square-xmark me-2"></i>Une erreur s\'est produite. Veuillez réessayer ultérieurement ou contacter l\'administrateur du site.'
    }

    setTimeout(() => divAlert.setAttribute('hidden', 'hidden'), 7000)
}