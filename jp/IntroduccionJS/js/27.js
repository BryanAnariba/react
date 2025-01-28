/* Performance y multiple async await */

const url = "https://jsonplaceholder.typicode.com/comments";
const url2 = "https://jsonplaceholder.typicode.com/todos";
const url3 = "https://jsonplaceholder.typicode.com/photos";

const fetchData = async () => {
  try {
    const start = performance.now();

    const [commentsResponse, todosResponse, photosResponse] = await Promise.all([
      fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
      fetch(url2, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
      fetch(url3, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
    ]);

    const [comments, todos, photos] = await Promise.all([commentsResponse.json(), todosResponse.json(), photosResponse.json()]);

    console.log({
        comments,
        todos,
        photos,
    });

    const end = performance.now();

    console.log("Result: ", end - start);
  } catch (error) {
    throw new Error(`Sometime went wrong: ${error}`);
  }
};

fetchData();
