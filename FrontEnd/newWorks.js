// __________________________________________________________________
// Récupération des données dans les deux API

let workCard = [];
let filterCategory = [];

const fetchWork = async () => {
  await fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((workData) => (workCard = workData));

  await fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((categoryData) => (filterCategory = categoryData));

  console.log(workCard);
  console.log(filterCategory);
};
// __________________________________________________________________

// __________________________________________________________________
// Création des filtres

// définition d'une valeur de catégorie par défaut au chargement de la page
let categoryFocus = -1;

const filterDisplay = () => {
  fetchWork();

  // Récupération de l'élément du DOM qui accueillera les filtres
  const filtres = document.querySelector(".filtres");

  // Création du bouton "Tous"
  const btnTous = document.createElement("button");
  btnTous.dataset.id = -1;
  btnTous.innerText = "Tous";
  filtres.appendChild(btnTous);

  // Création des autres boutons de filtre par une boucle
  for (let i = 0; i < filterCategory.length; i++) {
    const category = filterCategory[i];
    const button = document.createElement("button");
    button.innerText = category.name;
    button.dataset.id = category.id;
    filtres.appendChild(button);
  }
};

filterDisplay();

// __________________________________________________________________
