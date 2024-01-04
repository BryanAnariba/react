const apiKey = 'N1YP5RIVv3cC6I2BI59v4NjT4J5etCCJ';
const apiUrl = 'https://api.giphy.com/v1/gifs/random';


const gifs = async () => {
  try {
    const res = await fetch(`${apiUrl}?api_key=${apiKey}`);
    const {data} = await res.json();
    return data.images.original.url;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function main () {
  const url = await gifs()
  const img = document.createElement('img');
  img.src = url;
  document.body.append(img);
}

main();