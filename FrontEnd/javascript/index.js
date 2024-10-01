
// Récupération des projets avec fetch

async function getWorks() {
    const response = await fetch('http://localhost:5678/api/works');
    return await response.json();
};

  // Ajouter les projets à la gallerie 

  function addWorks(work) {
    const gallery = document.querySelector('.gallery'); 
  
    const workElement = document.createElement('div');
    workElement.classList.add('work');
    workElement.dataset.categoryId = work.categoryId;

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
    buttonAll.id = '0'; 
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

// Création du bouton modifier

function loginCheck() {
    const token = window.localStorage.getItem("token");
    const filtersSection = document.querySelector('.filters');
    const projectTitleDiv = document.getElementById('projectTitle');
    const logoutButton = document.getElementById('loginButton');
    
    if (token) {
        const modifySection = document.createElement('div');
        modifySection.classList.add('modifySection');
        projectTitleDiv.appendChild(modifySection);

        const modifyIcon = document.createElement('i');
        modifyIcon.classList.add('fa-regular', 'fa-pen-to-square');
        modifySection.appendChild(modifyIcon); 

        const modifyButton = document.createElement('button');
        modifyButton.textContent = 'modifier';
        modifyButton.classList.add('modify-button');
        modifySection.appendChild(modifyButton);

        logoutButton.textContent = 'logout';
        logoutButton.addEventListener('click', () => 
            localStorage.removeItem('token')
        );

        const header = document.querySelector('header');
        const topBar = document.createElement('div');
        topBar.id = 'topBar';
        header.appendChild(topBar)
        const barIcon = document.createElement('i');
        barIcon.classList.add('fa-regular', 'fa-pen-to-square');
        const barText = document.createElement('span');
        barText.textContent = 'Mode édition';
        topBar.appendChild(barIcon);
        topBar.appendChild(barText);


        if (filtersSection) {
            filtersSection.remove();
        }
    }
}

loginCheck(); 

// Création de la modale 

// Ouvrir modale
const modalGallery = document.getElementById('modalGallery');
const openModalGalleryButton = document.querySelector('.modifySection');
const closeModalButtons = document.querySelectorAll('.close');

openModalGalleryButton.addEventListener('click', function() {
    modalGallery.style.display = 'block';
});

// Ouvrir modale ajout de photo
const modalAddPhoto = document.getElementById('modalAddPhoto');
const openAddPhotoButton = document.getElementById('openAddPhoto');

openAddPhotoButton.addEventListener('click', function() {
    modalGallery.style.display = 'none';
    modalAddPhoto.style.display = 'block';
});

// Fermer modale
closeModalButtons.forEach(button => {
    button.addEventListener('click', function() {
        modalGallery.style.display = 'none';
        modalAddPhoto.style.display = 'none';
    });
});

// Fermer les modales si l'utilisateur clique en dehors du contenu
window.addEventListener('click', function(event) {
    if (event.target == modalGallery) {
        modalGallery.style.display = 'none';
    } else if (event.target == modalAddPhoto) {
        modalAddPhoto.style.display = 'none';
    }
});

// Afficher les projets dans la modale
const galleryModale = document.getElementsByClassName("modal-gallery")[0];

async function addProjectsModale() {
    galleryModale.innerHTML = "";
    const projects = await getWorks();

    projects.forEach(project => {
        const workElement = document.createElement('div');
        workElement.classList.add('work');

        const trash = document.createElement("button");
        const trashIcon = document.createElement("i");
        trash.id = project.id;
        trashIcon.classList.add("fa-solid", "fa-trash");
        trash.classList.add('trash');

        const image = document.createElement('img');
        image.src = project.imageUrl;  
        image.alt = project.title;  
    
        const title = document.createElement('h3');
        title.textContent = project.title;
        
        galleryModale.appendChild(workElement);
        workElement.appendChild(image);
        workElement.appendChild(title);
        workElement.appendChild(trash);
        trash.appendChild(trashIcon);

    })

    // deleteProjects();
};

addProjectsModale();

// function deleteProjects() {
//     const allTrash = document.querySelectorAll('fa-trash');

//     allTrash.forEach(trash => {
//         trash.addEventListener('click', (e) => {
//             const trashId = trash.id;
//             // fetch type delete (voir delete dans swagger), voir post login pour reference, promesse a faire, passer trash.id pour reconnaitre projet supprime
//         })
//     });
// }

// Remplir catégories dans formulaire d'ajout 
async function showCategoriesInForm() {
    const categories = await getCategories();
    const categorySelect = document.querySelector('select[name="category"]');

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });
}

showCategoriesInForm();


