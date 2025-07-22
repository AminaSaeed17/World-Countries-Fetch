let selectRegion = document.getElementById("selectRegion");
let inputSearch = document.getElementById("inputSearch");
let mode = document.getElementById("mode");
let data;

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}

async function getData() {
  let response = await fetch("../data.json");
  console.log(response);
  if (response.ok) {
    data = await response.json();
    console.log(data);
    displayData(data);
    filterRegion(data);
  }
}

function displayData(data) {
  let cartona = "";
  for (let i = 0; i < data.length; i++) {
    if (data[i].name.toLowerCase().includes(inputSearch.value.toLowerCase())) {
      cartona += `
                <div class="col-sm-6 col-md-4 col-lg-3">
                    <div class="card">
                        <img height="150px" class="card-img-top w-100" src="${
                          data[i].flag
                        }" alt="Title" />
                        <div class="card-body">
                            <h4 class="card-title">${data[i].name.replace(
                              inputSearch.value.toLowerCase(),
                              (match) => `<span class="bg-info">${match}</span>`
                            )}</h4>
                            <p class="card-text text-li m-0">Population: ${
                              data[i].population
                            }</p>
                            <p class="card-text text-li m-0">Region: ${
                              data[i].region
                            }</p>
                            <p class="card-text text-li m-0">Capital: ${
                              data[i].capital
                            }</p>
                            <a onclick="storeDetails(${i})" href="details.html" class="text-decoration-none">More Details...</a>
                        </div>
                    </div>
                    
                </div>
            `;
    }
  }

  document.getElementById("rowData").innerHTML = cartona;
}

function storeDetails(index) {
  localStorage.setItem("countryIndex", index); 
}


inputSearch.addEventListener("input", function (e) {
  e.preventDefault();
  displayData(data);
});

function filterRegion(data) {
  let cartona = "";
  cartona += `
        <option selected>Filter by Region</option>
    `;
  for (let i = 0; i < data.length; i++) {
    if (!cartona.includes(data[i].region)) {
      cartona += `
            <option value="${data[i].region}">${data[i].region}</option>
        `;
    }
  }
  document.getElementById("selectRegion").innerHTML = cartona;
}

selectRegion.addEventListener("change", async function (e) {
  e.preventDefault();
  let valuee = this.value;
  console.log(valuee);
  filterbyRegion(valuee);
  // let filteredCountries = data.filter(
  //   (item) => item.region === selectRegion
  // );
  // console.log(filteredCountries);
});

async function filterbyRegion(value) {
  let response = await fetch("../data.json");
  console.log(response);
  if (response.ok) {
    data = await response.json();
    console.log(data);
    let dataRegion = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].region === value) {
        dataRegion.push(data[i]);
      }
    }
    displayData(dataRegion);
  }
}

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
} else if (savedTheme === "light") {
  document.body.classList.remove("dark-mode");
}

mode.addEventListener("click", function (e) {
  e.preventDefault();

  document.body.classList.toggle("dark-mode");

  const isDark = document.body.classList.contains("dark-mode");

  localStorage.setItem("theme", isDark ? "dark" : "light");

  if (document.body.classList.contains("dark-mode")) {
    modeText.textContent = "Light Mode";
    modeIcon.classList.remove("fa-moon");
    modeIcon.classList.add("fa-sun");
  } else {
    modeText.textContent = "Dark Mode";
    modeIcon.classList.remove("fa-sun");
    modeIcon.classList.add("fa-moon");
  }
});







getData();
