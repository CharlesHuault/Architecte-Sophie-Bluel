import { fetchProjets, fetchCategories, afficherAllProjets } from "./Works.js";

// Déconnection et rafraichissement de la page
const refreshLogOut = () => {
  document.location.href = "./index.html";
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

// ----------------------------------------------------------------------------
// Modale
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// Ouverture de la Modale

const openModale = function (e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute("href"));
  target.style.display = null;
  target.removeAttribute("aria-hidden");
  target.setAttribute("aria-modale", "true");
  modale = target;
  const closeButtons = modale.querySelectorAll(".js-closeModale");
  closeButtons.forEach(function (button) {
    button.addEventListener("click", closeModale);
  });

  document.getElementById("contenu-modale2").style.display = "none";
};

// ----------------------------------------------------------------------------
// Fermeture de la Modale

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

  document.getElementById("contenu-modale").style.display = "";

  modale = null;
};
const modal = document.getElementById("Modale1");
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

document.querySelectorAll(".js-modale").forEach((a) => {
  a.addEventListener("click", openModale);
});

let modale = null;

// --------------------------------------------------------------------------
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
    ficheWork.setAttribute("id", fichePhoto.id);

    const imageWorks = document.createElement("img");
    imageWorks.src = fichePhoto.imageUrl;

    const titleWorks = document.createElement("p");
    titleWorks.innerText = "éditer";

    const btnMove = document.createElement("button");
    btnMove.className = "buttonMove";

    const btnDelete = document.createElement("button");
    btnDelete.setAttribute("id", fichePhoto.id);
    btnDelete.className = "buttonDelete";

    const logoTrash = document.createElement("i");
    logoTrash.className = "fa-solid fa-trash-can";

    const logoArrow = document.createElement("i");
    logoArrow.className = "fa-solid fa-arrows-up-down-left-right";

    sectionGallery.appendChild(ficheWork);

    ficheWork.appendChild(btnDelete);
    ficheWork.appendChild(btnMove);

    btnDelete.appendChild(logoTrash);
    btnMove.appendChild(logoArrow);
    ficheWork.appendChild(imageWorks);
    ficheWork.appendChild(titleWorks);

    btnDelete.addEventListener("click", (e) => deleteWork(fichePhoto.id, e));
  }
};

// ------------------------------------------------------------------------------------
// Suppression de projet
// ------------------------------------------------------------------------------------

async function deleteWork(workId, e) {
  e.preventDefault();

  const fetchDelete = {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(
    `http://localhost:5678/api/works/${workId}`,
    fetchDelete
  );

  if (!response.ok) {
    throw new Error("Impossible de supprimer");
  }

  document.getElementById("worksList").innerHTML = "";
  document.getElementById("gallery").innerHTML = "";
  mainFunction();

  const workData = await fetchProjets();
  afficherAllProjets(workData);
}
// -------------------------------------------------------------------------------------
// Modale Ajout Photo
// -------------------------------------------------------------------------------------

const ajoutPhoto = document.getElementById("ajoutPhoto");

// Fonction affichage de la deuxième page de modale
ajoutPhoto.addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("contenu-modale").style.display = "none";
  document.getElementById("contenu-modale2").style.display = "block";
  document.getElementById("prevPhoto").style.display = "none";
  document.getElementById("noPhoto").style.display = "flex";
  document.getElementById("PhotoAjout").value = "";
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
  document.getElementById("prevPhoto").style.display = "flex";
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
const formElem = document.getElementById("FormAjout");

formElem.onsubmit = (e) => {
  e.preventDefault();

  const formData = new FormData();

  const newImage = document.getElementById("PhotoAjout").files[0];
  formData.append("image", newImage);
  formData.append("title", document.getElementById("TitrePhoto").value);

  formData.append("category", document.getElementById("Categories").value);

  fetch("http://localhost:5678/api/works/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  }).then(async (res) => {
    e.preventDefault();

    if (res.ok) {
      console.log("fichier envoyé");
      document.getElementById("worksList").innerHTML = "";
      document.getElementById("gallery").innerHTML = "";

      mainFunction();
      document.getElementById("contenu-modale").style.display = "";
      document.getElementById("contenu-modale2").style.display = "none";

      const workData = await fetchProjets();
      afficherAllProjets(workData);
    } else {
      alert("Ajouter une image");
    }
  });

  document.getElementById("PhotoAjout").value = "";
  document.getElementById("noPhoto").style.display = "";
};
