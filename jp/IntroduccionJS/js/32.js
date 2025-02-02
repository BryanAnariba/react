// SUBMIT Form
const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const inputName = document.querySelector("#nombre").value;
  const inputPassword = document.querySelector("#password").value;
  const alert = document.createElement("DIV");
  const prevAlert = document.querySelector(".alerta");
  prevAlert?.remove();
  alert.classList.add('alerta', 'text-white', 'uppercase', 'text-sm', 'text-center', 'p-2', 'font-black');
  
  if (inputName.trim() === "" || inputPassword.trim() === "") {
    alert.textContent = 'Todos los campos son obligatorio';
    alert.classList.add('bg-red-500');
  } else {
    alert.textContent = 'Todo bien, iniciando sesion...';
    alert.classList.add('bg-green-500');
  }

  form.appendChild(alert);

  setTimeout(() => {
    alert.remove();
  }, 3000);
});
