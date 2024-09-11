// Envoi des données du formulaire vers le backend


async function login() {
    const form = document.getElementById("loginForm");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("http://localhost:5678/api/users/login", { // Mettez ici le bon endpoint API
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ // Utiliser JSON.stringify pour convertir l'objet en chaîne JSON
                    email: email,
                    password: password
                })
            });

            const data = await response.json();
            if (response.ok) {
                console.log("Connexion réussie", data);
                alert("Connexion réussie !");
            } else {
                console.error("Erreur de connexion", data);
                alert("Échec de la connexion : Vérifiez vos identifiants");
            }
        } catch (error) {
            console.error("Erreur lors de la requête", error);
            alert("Une erreur s'est produite. Veuillez réessayer.");
        }
    });
};

login();
