import { fetchProjets } from "./Works.js";
import { fetchCategories } from "./Works.js";

// Déconnection et rafraichissement de la page
const refreshLogOut = () => {
  document.location.href = "/FrontEnd/index.html";
  sessionStorage.clear();
};

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
// Ouverture et Fermeture de la Modale
const openModale = function (e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute("href"));
  target.style.display = null;
  target.removeAttribute("aria-hidden");
  target.setAttribute("aria-modale", "true");
  modale = target;
  // modale.addEventListener("click", closeModale);
  modale
    .querySelector(".js-closeModale")
    .addEventListener("click", closeModale);
  modale
    .querySelector(".js-stopModale")
    .addEventListener("click", stopPropagation);

  document.getElementById("contenu-modale2").style.display = "none";
};

const closeModale = function (e) {
  console.log("test");
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

let modale = null;

// Modale Galerie Photo

const mainFunction = async () => {
  const workData = await fetchProjets();

  displayModal(workData);
};

mainFunction();

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

const ajoutPhoto = document.getElementById("ajoutPhoto");

ajoutPhoto.addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("contenu-modale").style.display = "none";
  document.getElementById("contenu-modale2").style.display = "block";
});
const backToList = document.getElementById("backToList");

backToList.addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("contenu-modale").style.display = "";
  document.getElementById("contenu-modale2").style.display = "none";
});
const categoriesData = await fetchCategories();
const optionsCategory = document.querySelector("#Categories");

const formOptions = document.createElement("option");
formOptions.disabled = true;
formOptions.selected = true;
formOptions.value = "1";
formOptions.text = "";

optionsCategory.add(formOptions, null);

for (let i = 0; i < categoriesData.length; i++) {
  const category = categoriesData[i];
  const formCategory = document.createElement("option");
  formCategory.innerText = category.name;
  formCategory.dataset.categoryName = category.id;
  // formCategory.setAttribute("value", "");
  optionsCategory.appendChild(formCategory);
}

document.getElementById("parcourir").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("PhotoAjout").click();
});

// Prévisualisation de la photo a ajouter

function imageHandler(e2) {
  const store = document.getElementById("prevPhoto");
  store.innerHTML = '<img src="' + e2.target.result + '">';
  document.getElementById("noPhoto").style.display = "none";
}

function loadimage(e1) {
  const filename = e1.target.files[0];
  const fr = new FileReader();
  fr.onload = imageHandler;
  fr.readAsDataURL(filename);
}

const x = document.getElementById("PhotoAjout");
x.addEventListener("change", loadimage, false);
const y = document.getElementById("PhotoAjout");
y.addEventListener("change", loadimage, false);

// push de la photo à l'api

// const pushPhoto = document.getElementById("subPhoto");
// pushPhoto.addEventListener("submit");
