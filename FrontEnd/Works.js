const fetchWork = async () => {
  await fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => (workData = data));

  const btnTous = document.querySelector(".btn-tous");

  btnTous.addEventListener("click", () => {
    document.getElementById("gallery").innerHTML = "";
    for (let i = 0; i < workData.length; i++) {
      const fiche = workData[i];

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
  });

  const btnObjets = document.querySelector(".btn-objets");

  btnObjets.addEventListener("click", function () {
    document.getElementById("gallery").innerHTML = "";

    for (let i = 0; i < workData.length; i++) {
      if (workData[i].categoryId == "1") {
        fiche = workData[i];

        sectionGallery = document.querySelector("#gallery");

        ficheWork = document.createElement("fiche");

        imageWorks = document.createElement("img");
        imageWorks.src = fiche.imageUrl;

        titleWorks = document.createElement("p");
        titleWorks.innerText = fiche.title;

        sectionGallery.appendChild(ficheWork);

        ficheWork.appendChild(imageWorks);
        ficheWork.appendChild(titleWorks);
      }
    }
  });

  const btnAppart = document.querySelector(".btn-appart");

  btnAppart.addEventListener("click", () => {
    document.getElementById("gallery").innerHTML = "";
    for (let i = 0; i < workData.length; i++) {
      if (workData[i].categoryId == "2") {
        fiche = workData[i];

        sectionGallery = document.querySelector("#gallery");

        ficheWork = document.createElement("fiche");

        imageWorks = document.createElement("img");
        imageWorks.src = fiche.imageUrl;

        titleWorks = document.createElement("p");
        titleWorks.innerText = fiche.title;

        sectionGallery.appendChild(ficheWork);

        ficheWork.appendChild(imageWorks);
        ficheWork.appendChild(titleWorks);
      }
    }
  });

  const btnRestau = document.querySelector(".btn-restau");

  btnRestau.addEventListener("click", () => {
    document.getElementById("gallery").innerHTML = "";
    for (let i = 0; i < workData.length; i++) {
      if (workData[i].categoryId == "3") {
        fiche = workData[i];

        sectionGallery = document.querySelector("#gallery");

        ficheWork = document.createElement("fiche");

        imageWorks = document.createElement("img");
        imageWorks.src = fiche.imageUrl;

        titleWorks = document.createElement("p");
        titleWorks.innerText = fiche.title;

        sectionGallery.appendChild(ficheWork);

        ficheWork.appendChild(imageWorks);
        ficheWork.appendChild(titleWorks);
      }
    }
  });
};
const workDisplay = () => {
  fetchWork();
};

workDisplay();
