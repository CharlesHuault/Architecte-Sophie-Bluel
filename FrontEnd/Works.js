const fetchWork = async () => {
  await fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => (workData = data));

  const category = workData.map((data) => data.categoryId);

  const btnObjets = document.querySelector(".btn-objets");

  btnObjets.addEventListener("click", function () {
    document.getElementById("gallery").innerHTML = "";

    for (let i = 0; i < workData.length; i++) {
      if (workData[i].categoryId == "1") {
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
    }
  });

  const btnAppart = document.querySelector(".btn-appart");

  btnAppart.addEventListener("click", () => {
    document.getElementById("gallery").innerHTML = "";
    for (let i = 0; i < workData.length; i++) {
      if (workData[i].categoryId == "2") {
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
    }
  });

  const btnRestau = document.querySelector(".btn-restau");

  btnRestau.addEventListener("click", () => {
    document.getElementById("gallery").innerHTML = "";
    for (let i = 0; i < workData.length; i++) {
      if (workData[i].categoryId == "3") {
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
    }
  });
};
const workDisplay = () => {
  fetchWork();
};

workDisplay();

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

// const btnObjets = document.querySelector(".btn-objets");

// btnObjets.addEventListener("click", () => {
//   for (let i = workData.length - 1; i >= 0; i--) {
//     if (workData[i].categoryId != 1) {
//       category.splice(i, 1);
//     }
//   }
// });

// const fetchCategory = async () => {
//   await fetch("http://localhost:5678/api/categories")
//     .then((response) => response.json())
//     .then((data) => (workData = data));

//   const category = workData.map((data) => data.name);

//   console.log(category);
// };

// const categoryDisplay = () => {
//   fetchCategory();
// };

// categoryDisplay();

// const boutonObjets = document.querySelector(".btn-objets");

// boutonObjets.addEventListener("click", function () {
//   objectCategory = workData.filter(function (data) {
//     return data.name === "Objets";
//   });
// if (true) {

//   const sectionGallery = document.querySelector("#gallery");

//   const ficheWork = document.createElement("fiche");

//   const imageWorks = document.createElement("img");
//   imageWorks.src = fiche.imageUrl;

//   const titleWorks = document.createElement("p");
//   titleWorks.innerText = fiche.title;

//   sectionGallery.appendChild(ficheWork);

//   ficheWork.appendChild(imageWorks);
//   ficheWork.appendChild(titleWorks);} else {

// }
// });
