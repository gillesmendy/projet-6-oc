//Récupération des projets avec fetch

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