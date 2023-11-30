// https://restcountries.com/v3.1/all
const main = document.querySelector('main');
const countrieName = document.getElementById('input-country-name');
const range = document.getElementById('range');
const rangeValue = document.getElementById('range-value');

const btnSort = document.querySelectorAll('.btn-sort');
const ascendingOrder = document.getElementById('ascending-order');
const descendingOrder = document.getElementById('descending-order');
const alphabeticalOrder = document.getElementById('alphabetical-order');

let ascending = false;
let descending = false;
let alphabetical = false;

rangeValue.textContent = range.value;

range.addEventListener('input', () => {
    rangeValue.textContent = range.value;
});

const countriesDisplayer = function (countries) {
    // console.log(countries)

    while (main.firstChild) {
        main.firstChild.remove();
    }

    if (countrieName.value) {
        countries = countries.filter((country) =>
            country.name.common.toLowerCase().startsWith(countrieName.value.toLowerCase())
        )
        console.log("filtered by name", countries)
    }

    if (alphabetical == true) {
        countries = countries.sort((a, b) => {
            const nameA = a.name.common.toLowerCase();
            const nameB = b.name.common.toLowerCase();

            if (nameA < nameB) {
                return -1;
            } else if (nameA > nameB) {
                return 1;
            } else {
                return 0;
            }
        });
        console.log("alphabetical", countries)
    }
    if (ascending == true) {
        countries = countries.sort((a, b) => {
            const nameA = a.population
            const nameB = b.population

            if (nameA < nameB) {
                return -1;
            } else if (nameA > nameB) {
                return 1;
            } else {
                return 0;
            }
        });
    }
    if (descending == true) {
        countries = countries.sort((a, b) => {
            const nameA = a.population
            const nameB = b.population

            if (nameA < nameB) {
                return 1;
            } else if (nameA > nameB) {
                return -1;
            } else {
                return 0;
            }
        });
    }

    console.log(countries)
    countries = countries.slice(0, range.value)
    console.log(countries)

    for (let i = 0; i < countries.length; i++) {

        const card = document.createElement('div');
        card.classList.add('card');
        main.appendChild(card)

        const imgContainer = document.createElement('div');
        imgContainer.classList.add('img-container');
        imgContainer.setAttribute("data-map", countries[i].maps.googleMaps);
        card.appendChild(imgContainer);

        const img = document.createElement('img');
        imgContainer.appendChild(img);
        img.alt = countries[i].name.common + " " + "flag";
        img.src = countries[i].flags.png;

        const title = document.createElement('h2');
        card.appendChild(title);
        title.textContent = countries[i].name.common;

        const capital = document.createElement('p');
        card.appendChild(capital);
        capital.textContent = "Capital:" + " " + countries[i].capital

        const population = document.createElement('p');
        card.appendChild(population);
        population.textContent = "Population:" + " " + countries[i].population;
    }

    document.querySelectorAll('.img-container').forEach((img) => {
        img.addEventListener('click', (e) => {
            window.open(img.dataset.map, '_blank');
        });
    });
}

const countriesFetcher = async function () {
    let data = [];
    await fetch('https://restcountries.com/v3.1/all')
        .then((response) => response.json())
        .then((res) => {
            data = res;
        })

    // console.log(data)
    countriesDisplayer(data)
}

countrieName.addEventListener('input', (e) => {
    countriesFetcher();
});

range.addEventListener('input', (e) => {
    countriesFetcher();
});

btnSort.forEach((btn) => {
    btn.addEventListener('click', () => {

        switch (btn.id) {
            case "ascending-order":
                console.log("ascending")
                ascending = true;
                descending = false;
                alphabetical = false
                break;
            case "descending-order":
                console.log("descending")
                descending = true;
                ascending = false;
                alphabetical = false
                break;
            case "alphabetical-order":
                console.log("alphabetical")
                alphabetical = true;
                ascending = false;
                descending = false;
                break;
            default:
                break;
        }

        countriesFetcher();

    });
});


countriesFetcher();


