// Récupération des projets avec fetch

fetch('http://localhost:5678/api/projects')
  .then(response => {
    if (!response.ok) {
      throw new Error('Erreur réseau : ' + response.status);
    }
    return response.json(); 
  })
  .then(projects => {
    console.log('Projets récupérés:', projects);
 
    displayProjects(projects);
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des projets:', error);
  });


  // Ajouter les projets à la gallerie 

  function displayProjects(projects) {
    const gallery = document.querySelector('.gallery'); 
  
    projects.forEach(project => {
      const projectElement = document.createElement('div');
      projectElement.classList.add('project'); 
  
      const image = document.createElement('img');
      image.src = project.imageUrl; 
      image.alt = project.title;  
  
      const title = document.createElement('h3');
      title.textContent = project.title;
  
      projectElement.appendChild(image);
      projectElement.appendChild(title);
      gallery.appendChild(projectElement);
    });
  }
