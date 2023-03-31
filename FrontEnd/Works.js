let categoryFocus = -1; // définition d'une valeur de catégorie par défaut au chargement de la page

// récupération des données des deux API
const fetchWork = async () => {
  const response = await fetch("http://localhost:5678/api/works"); // récupération données Works
  const workData = await response.json(); // création de la variable contenant les données Works récupérées
  const categories = await fetch("http://localhost:5678/api/categories"); // récupération données Categories
  const categoriesData = await categories.json(); // création de la variable contenant les données Categories récupérées

  const filtres = document.querySelector(".filtres"); // récupération de l'élément DOM qui accueillera les boutons de filtres

  const btnTous = document.createElement("button"); // création du bouton filtre "Tous"
  btnTous.dataset.id = -1; // création d'un id="-1" à la balise button créée
  btnTous.innerText = "Tous"; // Texte du bouton
  filtres.appendChild(btnTous); // Rattachement du bouton à son élément DOM parent (la div filtres)

  afficherAllProjets(workData); //affiche la totalité des projets contenus dans l'API works

  // fonction définissant l'action a effectuer au clic sur le bouton "Tous"
  btnTous.addEventListener("click", function () {
    filterProjects("-1"); //affiche la totalité des projets contenus dans l'API works
  });

  // Boucle créant les autres boutons de filtres
  for (let i = 0; i < categoriesData.length; i++) {
    const category = categoriesData[i]; // création d'une variable contenant les données d'une catégorie de la liste de l'API
    const button = document.createElement("button"); // création du bouton
    button.innerText = category.name; // intégration du texte sur le bouton, correspondant au "name" de la catégorie [i] visée
    button.dataset.id = category.id; // création d'un id="id de la catégorie dans l'API" dans la balise button créée
    filtres.appendChild(button); // Rattachement du bouton à son élément DOM parent (la div filtres)

    //Fonction implémentant les éléments Works visés par le bouton cliqué
    button.addEventListener("click", function () {
      filterProjects(button.dataset.id);
    });
  }
};

const afficherAllProjets = (projets) => {
  // Fonction gérant le focus des boutons filtres
  const btnTous = document.querySelector(`[data-id="-1"]`);
  btnTous.classList.add("button_focus");
  // document.getElementById("gallery").innerHTML = ""; // Efface les fiches déjà affichées pour revenir à zéro
  for (let i = 0; i < projets.length; i++) {
    // Boucle créant la fiche a partir de zéro en créant l'image et le texte a partir de l'API
    const fiche = projets[i];

    const sectionGallery = document.querySelector("#gallery");

    const ficheWork = document.createElement("fiche");
    ficheWork.dataset.categoryId = fiche.categoryId;

    const imageWorks = document.createElement("img");
    imageWorks.src = fiche.imageUrl;

    const titleWorks = document.createElement("p");
    titleWorks.innerText = fiche.title;

    sectionGallery.appendChild(ficheWork);

    ficheWork.appendChild(imageWorks);
    ficheWork.appendChild(titleWorks);
  }
};

const filterProjects = (categoryId) => {
  // Fonction gérant le focus des boutons filtres
  const btnUnfocus = document.querySelector(`[data-id="${categoryFocus}"]`);
  btnUnfocus.classList.remove("button_focus");
  const btnFocus = document.querySelector(`[data-id="${categoryId}"]`);
  btnFocus.classList.add("button_focus");
  categoryFocus = categoryId;

  const gallery = document.getElementById("gallery");
  for (const child of gallery.children) {
    if (categoryId == -1) {
      child.classList.remove("hiddenProject");
    } else if (child.dataset.categoryId != categoryId) {
      child.classList.add("hiddenProject");
    } else {
      child.classList.remove("hiddenProject");
    }
  }
};

const workDisplay = () => {
  fetchWork();
};

workDisplay();
