import { fetchProjets } from "./Works.js";
import { fetchCategories } from "./Works.js";

// Déconnection et rafraichissement de la page
const refreshLogOut = () => {
  document.location.href = "/FrontEnd/index.html";
  sessionStorage.clear();
};

// Ouverture et Fermeture de la Modale
const openModale = function (e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute("href"));
  target.style.display = null;
  target.removeAttribute("aria-hidden");
  target.setAttribute("aria-modale", "true");
  modale = target;
  modale.addEventListener("click", closeModale);
  modale
    .querySelector(".js-closeModale")
    .addEventListener("click", closeModale);
  modale
    .querySelector(".js-stopModale")
    .addEventListener("click", stopPropagation);

  mainFunction();
};

const closeModale = function (e) {
  if (modale === null) return;
  e.preventDefault();
  modale.style.display = "none";
  modale.setAttribute("aria-hidden", "true");
  modale.removeAttribute("aria-modale");
  modale.removeEventListener("click", closeModale);
  modale
    .querySelector(".js-closeModale")
    .removeEventListener("click", closeModale);
  modale
    .querySelector(".js-stopModale")
    .removeEventListener("click", stopPropagation);

  modale = null;
};

const stopPropagation = function (e) {
  e.stopPropagation();
};

document.querySelectorAll(".js-modale").forEach((a) => {
  a.addEventListener("click", openModale);
});

// Modification de l'affichage si compte connecté
if (sessionStorage.getItem("token") != null) {
  document.getElementById("login").textContent = "logout";
  document.getElementById("login").href = "#";
  document.getElementById("HiddenHeader").style.display = "block";
  document.getElementsByClassName("filtres")[0].style.display = "none";
  let hiddenMain = document.getElementsByClassName("HiddenMain");
  for (const element of hiddenMain) {
    element.style.display = "block";
  }
}

const logout = document.querySelector("#login");

logout.addEventListener("click", refreshLogOut);

// ----------------------------------------
// Modale
// ----------------------------------------

let modale = null;

// Modale Galerie Photo

const mainFunction = async () => {
  const workData = await fetchProjets();

  displayModal(workData);
};

const displayModal = (works) => {
  for (let i = 0; i < works.length; i++) {
    const fichePhoto = works[i];

    const sectionGallery = document.querySelector("#worksList");

    const ficheWork = document.createElement("fichePhoto");
    ficheWork.categoryId = fichePhoto.categoryId;

    const imageWorks = document.createElement("img");
    imageWorks.src = fichePhoto.imageUrl;

    const titleWorks = document.createElement("p");
    titleWorks.innerText = "éditer";

    const btnDelete = document.createElement("button");
    btnDelete.className = "buttonDelete";

    const logoTrash = document.createElement("i");
    logoTrash.innerHTML += '<i class="fa-solid fa-trash-can"></i>';

    sectionGallery.appendChild(ficheWork);
    ficheWork.appendChild(btnDelete);

    btnDelete.appendChild(logoTrash);
    ficheWork.appendChild(imageWorks);
    ficheWork.appendChild(titleWorks);
  }
};

// Modale Ajout Photo

const modaleAjout = function (e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute("href"));
  target.style.display = null;
  target.removeAttribute("aria-hidden");
  target.setAttribute("aria-modale", "true");
  modale = target;
  modale.addEventListener("click", closeModale);
  modale
    .querySelector(".js-closeModale")
    .addEventListener("click", closeModale);
  modale
    .querySelector(".js-stopModale")
    .addEventListener("click", stopPropagation);
};

document.querySelectorAll("#ajoutPhoto").forEach((a) => {
  a.addEventListener("click", closeModale);
  a.addEventListener("click", modaleAjout);
});

document.querySelectorAll("#backToList").forEach((a) => {
  a.addEventListener("click", openModale);
  // a.addEventListener("click", closeModale);
});

const categoriesData = await fetchCategories();
const optionsCategory = document.querySelector("#Categories");

for (let i = 0; i < categoriesData.length; i++) {
  const category = categoriesData[i];
  const formCategory = document.createElement("option");
  formCategory.innerText = category.name;
  formCategory.dataset.id = category.id;
  optionsCategory.appendChild(formCategory);
}

document.getElementById("parcourir").addEventListener("click", () => {
  document.getElementById("PhotoAjout").click();
});
