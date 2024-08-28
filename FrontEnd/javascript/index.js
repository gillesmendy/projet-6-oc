
// Récupération des projets avec fetch

async function getWorks() {
    const response = await fetch('http://localhost:5678/api/works');
    return await response.json();
    
}

  // Ajouter les projets à la gallerie 

  function addWorks(work) {
    const gallery = document.querySelector('.gallery'); 
  
    const workElement = document.createElement('div');
    workElement.classList.add('work'); 
  
    const image = document.createElement('img');
    image.src = work.imageUrl;  
    image.alt = work.title;  
  
    const title = document.createElement('h3');
    title.textContent = work.title;
  
    workElement.appendChild(image);
    workElement.appendChild(title);
    gallery.appendChild(workElement);
};


async function showWorks() {
    const allWorks = await getWorks();
    allWorks.forEach((work) => {
        addWorks(work)
    });
}

showWorks();


// Récupération des catégories pour les filtres 
async function getCategories() {
    const response = await fetch('http://localhost:5678/api/categories');
    return await response.json();
}

// Ajouter les categories à la div filters
function addCategories(filter) {
    const filters = document.querySelector('.filters'); 
  
    const filterElement = document.createElement('div'); 
    filterElement.classList.add('filter'); 
  
    filterElement.textContent = filter.name; 
  
    filters.appendChild(filterElement); 
}

//Combiner les deux fonctions
async function showCategories() {
    const categories = await getCategories(); 
    categories.forEach((category) => { 
        addCategories(category); 
    });
}

showCategories(); 