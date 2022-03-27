const fetchData = async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/" +
      route.params.item.id +
      "/videos?api_key=1a24f47a1c3360e034c8cecab79575d9&language=en-US"
  );
  const json = await res.json();
  const r = json.results;
  return json.results;
};
