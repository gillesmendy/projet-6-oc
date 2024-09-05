
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
    workElement.dataset.categoryId = work.categoryId; // Correction apportée
  
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
    })
    console.log(allWorks);
}

showWorks();


// Récupération des catégories pour les filtres 
async function getCategories() {
    const response = await fetch('http://localhost:5678/api/categories');
    return await response.json();
}

// Ajouter les categories à la div filters
async function showCategories() {
    const allCategories = await getCategories();
    console.log(allCategories);
    const categories = document.querySelector('.filters'); 

    const buttonAll = document.createElement('button');
    buttonAll.textContent = 'Tous';
    buttonAll.id = '0'; // Correction apportée
    buttonAll.classList.add('filter');
    categories.appendChild(buttonAll);
  
    allCategories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category.name;
        button.id = category.id;
        button.classList.add('filter');
        categories.appendChild(button);
    });

sortCategories();
}

showCategories(); 

// Filtrer le contenu 

function sortCategories() { 
    const allFiltersButton = document.querySelector('.filters'); 

    // Ajouter l'écouteur d'événements pour le filtrage
    allFiltersButton.addEventListener('click', function(event) {
        if (event.target.tagName === 'BUTTON') {
            const filterId = event.target.id;

            // Masquer tous les éléments
            const allWorks = document.querySelectorAll('.work');
            allWorks.forEach(work => {
                work.classList.add("hidden");
            });

            // Afficher les éléments correspondant au filtre
            allWorks.forEach(work => {
                if (filterId === '0' || work.dataset.categoryId === filterId) {
                    work.classList.remove("hidden");
                }
            });
        }
    });
}
