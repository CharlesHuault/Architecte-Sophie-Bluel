let categoryFocus = -1;

const fetchWork = async () => {
  /* fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => {
      const workData = data
    }); 
    console.log("Hello world")
    */
  const response = await fetch("http://localhost:5678/api/works");
  const workData = await response.json();
  const categories = await fetch("http://localhost:5678/api/categories");
  const categoriesData = await categories.json();
  const filtres = document.querySelector(".filtres");

  const btnTous = document.createElement("button");
  btnTous.dataset.id = -1;
  btnTous.innerText = "Tous";
  filtres.appendChild(btnTous);

  afficherProjets(workData, "-1");

  btnTous.addEventListener("click", function () {
    afficherProjets(workData, "-1");
  });

  for (let i = 0; i < categoriesData.length; i++) {
    const category = categoriesData[i];
    const button = document.createElement("button");
    button.innerText = category.name;
    button.dataset.id = category.id;
    filtres.appendChild(button);

    button.addEventListener("click", function () {
      const dataFiltre = [];
      for (let i = 0; i < workData.length; i++) {
        if (workData[i].categoryId == button.dataset.id) {
          fiche = workData[i];
          dataFiltre.push(fiche);
        } else {
          // dataFiltre.slice("fiche");
        }
      }
      afficherProjets(dataFiltre, category.id);
    });
  }
};

const afficherProjets = (projets, categoryId) => {
  const btnUnfocus = document.querySelector(`[data-id="${categoryFocus}"]`);
  btnUnfocus.classList.remove("button_focus");
  const btnFocus = document.querySelector(`[data-id="${categoryId}"]`);
  btnFocus.classList.add("button_focus");
  categoryFocus = categoryId;

  document.getElementById("gallery").innerHTML = "";
  for (let i = 0; i < projets.length; i++) {
    const fiche = projets[i];

    const sectionGallery = document.querySelector("#gallery");

    const ficheWork = document.createElement("fiche");

    const imageWorks = document.createElement("img");
    imageWorks.src = fiche.imageUrl;

    const titleWorks = document.createElement("p");
    titleWorks.innerText = fiche.title;

    sectionGallery.appendChild(ficheWork);

    ficheWork.appendChild(imageWorks);
    ficheWork.appendChild(titleWorks);
  }
};

const workDisplay = () => {
  fetchWork();
  console.log("hello world 2");
};

workDisplay();
