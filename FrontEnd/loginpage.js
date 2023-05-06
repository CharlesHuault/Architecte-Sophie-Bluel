window.onload = () => {
  async function connexion() {
    const formulaireLogIn = document.querySelector("form");

    formulaireLogIn.addEventListener("submit", async function (e) {
      e.preventDefault();

      let users = {
        email: document.querySelector('input[name="email"]').value,
        password: document.querySelector('input[name="password"]').value,
      };

      const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(users),
      });

      if (response.ok === true) {
        let result = await response.json();

        sessionStorage.setItem("token", result.token);

        window.location.href = "./index.html";
      } else {
        throw new Error(alert("Une Erreur s'est produite !"));
      }
    });
  }

  connexion();
};
