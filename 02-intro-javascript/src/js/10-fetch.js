const apiKey = 'N1YP5RIVv3cC6I2BI59v4NjT4J5etCCJ';
const apiUrl = 'https://api.giphy.com/v1/gifs/random';

const gifs = fetch(`${apiUrl}?api_key=${apiKey}`);

gifs
  .then((res) => res.json())
  .then(({data}) => {
    const {url} = data.images.original;

    const img = document.createElement('img');
    img.src = url;
    document.body.append(img);
  })
  .catch((error) => console.error(error));