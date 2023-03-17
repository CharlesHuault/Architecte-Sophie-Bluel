const ficheWork = fetch("http://localhost:5678/api/works");
ficheWork
    .then((data)=>{
        console.log(data);

    const ficheData = data.json();

    ficheData.then((works) =>{
        console.log(works);

        for (let i =0; i < works.length; i++){

        const fiche = works[i];

            const sectionGallery = document.querySelector(".gallery");

            const ficheWork = document.createElement("fiche");

            const imageWorks = document.createElement("img");
            imageWorks.src = fiche.imageUrl;

            const titleWorks = document.createElement("p");
            titleWorks.innerText = fiche.title;

            
            sectionGallery.appendChild(ficheWork);
            
            ficheWork.appendChild(imageWorks);
            ficheWork.appendChild(titleWorks);
    }})
})



