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

// ---------------------------------------------
// Ouverture de la Modale

const openModale = function (e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute("href"));
  target.style.display = null;
  target.removeAttribute("aria-hidden");
  target.setAttribute("aria-modale", "true");
  modale = target;
  // modale.addEventListener("click", closeModale);
  // modale
  //   .querySelector(".js-closeModale")
  //   .addEventListener("click", closeModale);
  const closeButtons = modale.querySelectorAll(".js-closeModale");
  closeButtons.forEach(function (button) {
    button.addEventListener("click", closeModale);
  });

  modale
    .querySelector(".js-stopModale")
    .addEventListener("click", stopPropagation);

  document.getElementById("contenu-modale2").style.display = "none";
};

// -------------------------------------------
// Fermeture de la Modale

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
  document.getElementById("contenu-modale").style.display = "";

  modale = null;
};

const stopPropagation = function (e) {
  e.stopPropagation();
};

document.querySelectorAll(".js-modale").forEach((a) => {
  a.addEventListener("click", openModale);
});

let modale = null;

// -------------------------------------------
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
    ficheWork.className = "fichephoto";

    const imageWorks = document.createElement("img");
    imageWorks.src = fichePhoto.imageUrl;

    const titleWorks = document.createElement("p");
    titleWorks.innerText = "éditer";

    const btnDelete = document.createElement("button");
    btnDelete.setAttribute("id", fichePhoto.id);
    btnDelete.className = "buttonDelete";

    const logoTrash = document.createElement("i");
    logoTrash.className = "fa-solid fa-trash-can";

    sectionGallery.appendChild(ficheWork);
    ficheWork.appendChild(btnDelete);

    btnDelete.appendChild(logoTrash);
    ficheWork.appendChild(imageWorks);
    ficheWork.appendChild(titleWorks);
  }
};

// ------------------------------------------------
// Suppression de projet
// ------------------------------------------------

const btnTest = document.getElementsByClassName("buttonDelete");
displayModal(btnTest.addEventListener("click", console.log("Test")));
// const deleteClick = document.getElementsByClassName("buttonDelete");

// console.log(deleteWork);

// deleteClick.addEventListener("click", (e) => {
//   e.preventDefault();
//   deleteWork(e);
// });

// function deleteWork(e) {
//   const imgId = document.querySelector("buttonDelete");
//   imgId.getAttribute("id");

//   console.log(imgId);

//   fetch;
// }
// ----------------------------------------------

// async function () {
//   ficheWork.remove();

//   const response = await fetch(
//     "http://localhost:5678/api/works/${fichePhoto.id}",
//     {
//       method: "DELETE",
//       headers: {
//         "Content-type": "application/JSON",

//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
//   if (!response.ok) {
//     throw new Error("Erreur lors de la suppression");
//   }
//   console.log("Element supprimé");
// });
// });

// document.querySelector("suppPhoto").addEventListener("click", function () {
//   fichePhoto.remove();
// });

// ------------------------------------------------
// Modale Ajout Photo
// ------------------------------------------------

const ajoutPhoto = document.getElementById("ajoutPhoto");

// Fonction affichage de la deuxième page de modale
ajoutPhoto.addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("contenu-modale").style.display = "none";
  document.getElementById("contenu-modale2").style.display = "block";
});

// Flèche de retour vers première page de modale
const backToList = document.getElementById("backToList");

backToList.addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("contenu-modale").style.display = "";
  document.getElementById("contenu-modale2").style.display = "none";
});

// Récupération des catégories de travaux
const categoriesData = await fetchCategories();
const optionsCategory = document.querySelector("#Categories");

// Création de l'option vide affichée par défaut avant sélection d'une catégorie
const formOptions = document.createElement("option");
formOptions.disabled = true;
formOptions.selected = true;
formOptions.value = "1";
formOptions.text = "";

optionsCategory.add(formOptions, null);

// Création de la liste correspondant aux options du "select" du formulaire
for (let i = 0; i < categoriesData.length; i++) {
  const category = categoriesData[i];
  const formCategory = document.createElement("option");
  formCategory.innerText = category.name;
  formCategory.dataset.categoryName = category.id;
  formCategory.value = category.id;
  optionsCategory.appendChild(formCategory);
}

// Fonction pour ouvrir la boite de recherche du fichier a ajouter
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

// POST de la photo à l'api

let token = sessionStorage.getItem("token");
console.log(token);
const formElem = document.getElementById("FormAjout");
console.log("selectionner form");

formElem.onsubmit = (e) => {
  e.preventDefault();

  const formData = new FormData();

  const newImage = document.getElementById("PhotoAjout").files[0];
  formData.append(
    "image",
    newImage
    // document.getElementById("PhotoAjout").files[0].name
  );
  formData.append("title", document.getElementById("TitrePhoto").value);

  formData.append("category", document.getElementById("Categories").value);

  console.log(formData);

  fetch("http://localhost:5678/api/works/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  }).then(async (res) => {
    e.preventDefault();
    if (res.ok) {
      location.replace("index.html");
      console.log("fichier envoyé");
    } else {
      alert("fichier refusé");
    }
  });
};
