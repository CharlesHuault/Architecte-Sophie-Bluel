// Modification de l'affichage si compte connecté
if (sessionStorage.getItem("token") != null) {
  document.getElementById("login").textContent = "logout";
  document.getElementById("login").href = "#";
  document.getElementById("HiddenHeader").style.display = "block";
  document.getElementsByClassName("filtres")[0].style.display = "none";
  let hiddenMain = document.getElementsByClassName("HiddenMain");
  for (element of hiddenMain) {
    element.style.display = "block";
  }
}

// Déconnection et rafraichissement de la page
const refreshLogOut = () => {
  document.location.href = "/FrontEnd/index.html";
  sessionStorage.clear();
};

const logout = document.querySelector("#login");

logout.addEventListener("click", refreshLogOut);

// ----------------------------------------
// Modale
// ----------------------------------------

// Ouverture et Fermeture de la Modale
let modale = null;

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

// Modale Galerie Photo

const fetchPhotos = async () => {
  const response = await fetch("http://localhost:5678/api/works");
  const workData = await response.json();

  for (let i = 0; i < workData.length; i++) {
    const fichePhoto = workData[i];

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

fetchPhotos();
