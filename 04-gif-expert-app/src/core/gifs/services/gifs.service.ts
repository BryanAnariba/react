export const getGifs = async (category) => {
  const url = `https://api.giphy.com/v1/gifs/search?api_key=gt17K6ICHUlyZAgcgP255FHoqmm9Ffp5&q=${category}&limit=10`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const { data = [] } = await response.json();

  // Siempre es buena idea transformar la respuesta en tu api ya que si cambia algo solo lo cambias aqui, con ts es tiparla con una interfaz
  const gifs = data.map((img) => ({
    id: img.id,
    title: img.title,
    url: img.images.downsized_medium.url,
  }));

  // console.log({gifs});
  return gifs;
};
