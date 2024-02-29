export function render(data) {
  const container = document.createElement('div');
  container.classList.add('container', 'py-4', 'text-center');
  const speciesTitle = document.createElement('h2');
  const planetsList = document.createElement('div');
  const speciesList = document.createElement('div');
  speciesTitle.textContent = 'Species:';

  const btnmove = document.createElement('button');
  btnmove.textContent = "Back to episodes";
  btnmove.classList.add('btn', 'btn-secondary');
  btnmove.style.position = "fixed";
  btnmove.style.bottom = 0;
  btnmove.style.right = 0;

  Promise.all([data.planets, data.species].map(
    dat => dat.map(src => fetch(src).then(res => res.json()))))

    .then((datarr) => {
      datarr[0].map(planet => {
        planet.then((pl) => {
          const planetName = document.createElement('p');
          planetName.textContent = pl.name;
          planetsList.append(planetName);
        });
      });

      datarr[1].map(species => {
        species.then((sp) => {
          const speciesName = document.createElement('p');
          speciesName.textContent = sp.name;
          speciesList.append(speciesName);
        });
      });
      container.innerHTML = `<h1> Episode: ${data.episode_id + ',  ' + data.title}</h1>
            <p class='lead'>${data.opening_crawl}</p>
            <h2>Planets:</h2>
             `;
      container.append(planetsList);
      container.append(speciesTitle);
      container.append(speciesList);
      container.append(btnmove);
      container.style.color = 'white';
    }
    );

  btnmove.addEventListener('click', () => {
    history.pushState(null, '', 'https://starwars-dpsn.onrender.com');
    location.reload();
  });
  return container;
}
