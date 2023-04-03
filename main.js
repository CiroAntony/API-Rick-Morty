const container = document.querySelector(".container");
const inputBusqueda = document.querySelector("#input-busqueda");

inputBusqueda.addEventListener("input", (event) => {
  const filtro = event.target.value.toLowerCase();
  buscarPorNombre(filtro);
});

function mostrarTodosLosPersonajes(personajes) {
  personajes.forEach((personaje) => {
    const card = document.createElement("div");
    card.classList.add("personaje-container");

    const img = document.createElement("img");
    img.src = personaje.image;

    const nombre = document.createElement("p");
    nombre.innerHTML = "<b>Name: </b>" + personaje.name;

    const status = document.createElement("p");
    status.innerHTML = "<b>Status: </b>" + personaje.status;

    const species = document.createElement("p");
    species.innerHTML = "<b>Specie: </b>" + personaje.species;

    container.appendChild(card);
    card.appendChild(img);
    card.appendChild(nombre);
    card.appendChild(status);
    card.appendChild(species);
  });
}

function buscarPorNombre(filtro = "") {
  try {
    const results = fetch("https://rickandmortyapi.com/api/character/");
    results
      .then((response) => response.json())
      .then((data) => {
        container.innerHTML = "";
        const personajesFiltrados = data.results.filter((personaje) =>
          personaje.name.toLowerCase().includes(filtro)
        );

        if (filtro === "") {
          mostrarTodosLosPersonajes(data.results);
        } else {
          mostrarTodosLosPersonajes(personajesFiltrados);
        }
      });
  } catch (error) {
    console.log(error);
  }
}

buscarPorNombre("");
