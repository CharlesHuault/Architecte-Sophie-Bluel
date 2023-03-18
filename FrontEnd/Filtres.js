const categorieWork = fetch("http://localhost:5678/api/categories");
categorieWork
    .then((data)=>{
        console.log(data);

    const ficheData = data.json();

    ficheData.then((categorie) =>{
        console.log(categorie);


        const categoryButton = categorie.map(object => object.name);

        const boutonObjets= document.querySelector(".btn-objets");
        boutonObjets.addEventListener("click", function(){
            const resultatObjets = ficheData.filter (function(object){
                return object.id = 1
            })

        })
        
    })
})