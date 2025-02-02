// Eventos del DOM en Input
window.onload = function () {
  const handleInputChange = (e) => {
    console.log("Escribiendo: ", e.target.value);
  };

  const inputName = document.querySelector("#nombre");
  const inputPassword = document.querySelector("#password");

  inputName.addEventListener("input", (e) => handleInputChange(e));

  inputPassword.addEventListener("input", (e) => handleInputChange(e));
};
