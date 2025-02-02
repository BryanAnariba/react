// Eventos del DOM
window.onload = function () {
  const heading = document.querySelector(".heading");
  const anchors = document.querySelectorAll(".navegacion a");

  // Cambiar el texto del header al dar click sobre el
  heading.addEventListener("click", function () {
    heading.textContent = "Heading changed!";
  });

  anchors.forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("Clicked in anchor: ", anchor);
    });
  });
};
