/* Fetch api con async await */

const url = "https://jsonplaceholder.typicode.com/comments";

const fetchData = async () => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    throw new Error(`Sometime went wrong: ${error}`);
  }
};

fetchData();
