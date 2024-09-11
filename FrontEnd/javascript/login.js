const form = document.getElementById("loginForm");

async function login() {
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
    });
};

login();