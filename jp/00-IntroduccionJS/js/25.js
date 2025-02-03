/* Fetch api on promises */

const url = "https://jsonplaceholder.typicode.com/comments";

fetch(url, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
