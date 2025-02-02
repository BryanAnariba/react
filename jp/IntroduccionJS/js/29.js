// Manipular elementos html, css
window.onload = function () {
  const heading = document.querySelector(".heading");
  const anchors = document.querySelectorAll(".navegacion a");

  heading.textContent = "Nuevo heading";
  heading.id = "newHeadingId";
  heading.removeAttribute("id");

  const inputName = document.querySelector("#nombre");
  inputName.value = "Goku Perez";

  anchors.forEach((anchor) => {
    anchor.textContent = "New Anchor";
  });
};
