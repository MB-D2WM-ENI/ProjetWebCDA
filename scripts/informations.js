window.onload = init

function init() {


    fetch('promo.json')
        .then(response => response.json())
        .then(data => displayData(data))

}

function displayData(data) {

    const promoData = data.promo[0]
    document.getElementById('promoName').innerText = promoData.nom
    document.getElementById('startFormation').innerText = promoData.debut;
    document.getElementById('endFormation').innerText = promoData.fin;
    document.getElementById('nbStudents').innerText = promoData.nbApprenants;

    let description = promoData.description;
    let part = description.split(":");

    let result1 = part[0].trim() + " :";
    //console.log(result1);

    let pDesc = document.getElementById('description');
    pDesc.innerText = result1;

    let html_ul_desc = document.createElement("ul");
    html_ul_desc.setAttribute("id", "ulDescription");
    html_ul_desc.classList.add('mt-4', 'ps-15');

    let part2 = part[1].trim() + "";
    let list = part2.split(";");
    list.forEach(item => {
        let li = document.createElement("li");
        li.textContent = item.trim();
        html_ul_desc.appendChild(li);
    })

    pDesc.insertAdjacentElement("afterend", html_ul_desc);




    let html_ul = document.getElementById('linksUseful');

    for (let i = 0; i < promoData.liens.length; i++) {
        // li
        let html_li = document.createElement('li');
        html_li.classList.add('m-2')
        html_ul.insertAdjacentElement('beforeend', html_li);
        // a
        let html_a = document.createElement('a');
        html_a.classList.add('btn', 'btn-outline', 'transition', 'duration-300', 'ease-in', 'hover:scale-110');
        html_a.setAttribute('href', `${promoData.liens[i].lien}`);
        html_a.setAttribute('target', '_blank');
        html_a.setAttribute('rel', 'noopener noreferrer');
        html_li.insertAdjacentElement('afterbegin', html_a);
        // img
        let img_a = document.createElement('img');
        img_a.setAttribute('alt', `${promoData.liens[i].nom}`)
        img_a.setAttribute('width', "30")
        img_a.setAttribute('height', "auto")
        img_a.src = "./assets/images/" + promoData.liens[i].image;
        html_a.appendChild(img_a);
        // text after img
        let span_a = document.createElement('span');
        span_a.textContent = promoData.liens[i].nom
        html_a.appendChild(span_a);
    }

}