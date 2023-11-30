// https://restcountries.com/v3.1/all
console.log("countries")


let data = "";
const countriesFetcher = function () {
    fetch('https://restcountries.com/v3.1/all')
        .then((response) => response.json())
        .then((res) => {
            data = res;
            console.log(data)
        })
}

countriesFetcher();