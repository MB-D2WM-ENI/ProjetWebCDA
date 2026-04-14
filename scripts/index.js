window.onload = init

function init() {


    fetch('promo.json')
        .then(response => response.json())
        .then(data => displayData(data))

}

function displayData(data) {
    // After 'promo.json' rebuild, i need specify [0] after 'promo' because apprenants it's a table in a promo table.
    const studentData = data.promo[0].apprenants

    displayMode();
    openModal();

    if (localStorage.getItem('display') === 'list' || !localStorage.getItem('display')) {
        tableMode()
    } else if (localStorage.getItem('display') === 'cards') {
        cardsMode()
    }

    function tableMode() {
        const html_divTable = document.createElement('div');
        html_divTable.classList.add('overflow-x-auto', 'rounded-box', 'border', 'border-base-content/5', 'bg-base-100', 'max-w-5xl', 'mx-auto', 'my-0');
        html_divTable.setAttribute('id', 'divTable');
        document.getElementById('dynamicSection').insertAdjacentElement("beforeend", html_divTable);

        const tableTemplate = `<table class="table table-zebra">
                                        <thead>
                                            <tr>
                                                <th>Nom</th>
                                                <th>Prénom</th>
                                                <th>Ville</th>
                                                <th class="text-center">Détails</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                     `
        html_divTable.innerHTML = tableTemplate;

        for (let i = 0; i < studentData.length; i++) {
            const html_tbody = document.querySelector('tbody');
            const html_tr = document.createElement("tr");
            html_tr.classList.add('hover:bg-base-300');
            let template =
                `<td>${studentData[i].nom}</td>
                 <td>${studentData[i].prenom}</td>
                 <td>${studentData[i].ville}</td>
                 <td><a href="#" class="link" onclick="my_modal_${studentData[i].id}.showModal()">Détails</a></td>`
            html_tr.innerHTML = template;
            html_tbody.append(html_tr);
        }
    }

    function cardsMode() {
        const html_divCards = document.createElement('div');
        html_divCards.setAttribute('id', 'divCards');
        html_divCards.classList.add('flex', 'flex-wrap', 'justify-center');
        document.getElementById('dynamicSection').insertAdjacentElement("beforeend", html_divCards);
        
        for (let i = 0; i < studentData.length; i++) {
            // Verify if avatar is empty in promo.json file => use an avatar by default if is empty
            let avatar = studentData[i].avatar && studentData[i].avatar.trim() !== "" ? `assets/images/${studentData[i].avatar}` : "assets/images/avatar.png";
            
            const html_card = document.createElement('div');
            html_card.classList.add('card', 'card-border', 'bg-base-100', 'shadow-sm', 'w-sm', 'm-3', 'p-4');

            let template2 =
                `
                <div class="flex items-center">
                    <figure class="me-10 !w-[80px] !h-[80px] flex-shrink-0">
                        <img src="${avatar}" alt="Avatar de ${studentData[i].prenom} ${studentData[i].nom}" class="rounded-full w-full h-full object-cover">
                    </figure>
                    <div class="card-body p-0">
                        <h3 class="card-title">Nom : <span class="font-normal">${studentData[i].nom}</span></h3>
                        <h3 class="card-title">Prénom : <span class="font-normal">${studentData[i].prenom}</span></h3>
                    </div>
                </div>
                <div>
                    <div class="card-actions justify-center mt-4">
                        <a href="#" class="btn transition duration-300 ease-in hover:scale-110" onclick="my_modal_${studentData[i].id}.showModal()">Détails</a>
                    </div>
                </div>
                `
            html_card.innerHTML = template2;
            html_divCards.append(html_card);
        }
    }

    function displayMode() {
        document.getElementById('form').addEventListener('click', (e) => {
            console.log(e.target.id);

            if (e.target.id === 'list') {
                tableMode()
                document.getElementById('divCards').remove();
            } else if (e.target.id === 'cards'){
                cardsMode()
                document.getElementById('divTable').remove();
            }
        });
    }

    function openModal() {
        for (let i = 0; i < studentData.length; i++) {
            let avatar = studentData[i].avatar && studentData[i].avatar.trim() !== "" ? `assets/images/${studentData[i].avatar}` : "assets/images/avatar.png";
            const html_divModal = document.createElement('div');
            const modalTemplate =
                `
                <dialog class="modal" id="my_modal_${studentData[i].id}">
                    <div class="modal-box">
                    <form method="dialog">
                      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div class="flex mb-10">
                        <figure>
                            <img src="${avatar}" alt="Avatar de ${studentData[i].prenom} ${studentData[i].nom}" class="rounded-full" width="100" height="50">
                        </figure>
                        <div class="flex justify-evenly items-center w-100">
                            <div>
                                <p class="text-lg font-bold">Nom :</p>
                                <p class="text-lg font-bold">Prénom :</p>
                                <p class="text-lg font-bold">Ville :</p>
                            </div>
                            <div>
                                <p>${studentData[i].nom}</p>
                                <p>${studentData[i].prenom}</p>
                                <p>${studentData[i].ville}</p>
                            </div>
                        </div>
                    </div>
                    <div class="mt-10">
                        <p class="text-lg font-bold">Anecdotes de l'apprenant :</p>
                        <p class="text-lg h-32 mt-3 border rounded-xl p-2">${studentData[i].anecdotes}</p>
                    </div>
                    </div>
                    <form method="dialog" class="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>`

            html_divModal.innerHTML = modalTemplate;
            document.body.insertAdjacentElement("beforeend", html_divModal);
        }
    }

}









