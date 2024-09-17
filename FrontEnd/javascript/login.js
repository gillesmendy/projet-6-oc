// Envoi des données du formulaire vers le backend
async function login() {
    const form = document.getElementById("loginForm");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        function errorMessage(message) {
            document.getElementById("errorMessage").textContent = message;
        }

        try {
            const response = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    email: email,
                    password: password
                })
            });

            const data = await response.json();
            if (response.ok) {
                window.localStorage.setItem("token", data.token);
                window.location.href = "index.html";
            } else {
                errorMessage("Échec de la connexion : Vérifiez vos identifiants")
            }
        } catch (error) {
            errorMessage("Une erreur s'est produite lors de la connexion")
        }
    });
};

login();


