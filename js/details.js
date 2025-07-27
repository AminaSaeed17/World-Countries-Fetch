let back = document.getElementById("back");
let mode = document.getElementById("mode");


if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}

back.addEventListener("click", function (e) {
  e.preventDefault();
  document.location.href = "./index.html";
});

async function getData() {
  let response = await fetch("./data.json");
  if (response.ok) {
    data = await response.json();

    let country = localStorage.getItem("country");
    if (country !== null) {
      let getCountry = data.find(el => el.name === country)
      if (getCountry) {
        detailsData(getCountry); 
      } else {
        console.log("not country found");
      }
    }
  }
}



function detailsData(data) {
  let cartona = "";
  cartona += `
      <div class="img">
      <img src="${data.flag}" alt="">
      </div>
      <div class="details">
          <h2 class="fw-bold">${data.name}</h2>
          <div class="details-content">
              <p class="w-50">Native Name: <span>${data.nativeName}</span></p>
              <p class="w-50">Population: <span>${data.population}</span></p>
              <p class="w-50">Region: <span>${data.region}</span></p>
              <p class="w-50">Sub Region: <span>${data.subregion}</span></p>
              <p class="w-50">Capital: <span>${data.capital}</span></p>
              <p class="w-50">Top Level Domain: <span>${
                data.topLevelDomain[0]
              }</span></p>
              <p class="w-50">Currencies: <span>${
                data.currencies && data.currencies.length > 0
                  ? data.currencies[0].name
                  : "Unknown"
              }</span></p>
              <p class="w-50">Languages: <span>${data.languages.map(
                (el) => el.name
              )}</span></p>
          </div>
          <div class="details-footer">
              <p>Border Countries: ${
                data.borders && data.borders.length > 0
                  ? data.borders.map((el) => `<span>${el}</span>`)
                  : "None"
              }</p>
          </div>
      </div>
  `;
  document.getElementById("content").innerHTML = cartona;
}


const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
} else if (savedTheme === "light") {
  document.body.classList.remove("dark-mode");
}

mode.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});


getData();