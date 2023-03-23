if (sessionStorage.getItem("token") != null) {
  document.getElementById("login").textContent = "logout";
  document.getElementById("login").href = "#";
  document.getElementById("HiddenHeader").style.display = "block";

  const removeToken = () => {
    sessionStorage.clear();
    setItem(null);
  };

  const logout = document.querySelector("#login");

  logout.addEventListener("click", removeToken);
}
