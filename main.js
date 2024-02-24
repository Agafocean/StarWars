const cssPromises = {};

function loadResource(src) {
    // javascript module
    if (src.endsWith('.js')) {
        return import(src);
    }
    // css file
    if (src.endsWith('.css')) {
        if (!cssPromises[src]) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = src;
            cssPromises[src] = new Promise(resolve => {
                link.addEventListener('load', () => resolve());
            });
            document.head.append(link);
        }
        return cssPromises[src];
    }
    // server data
    return fetch(src).then(res => res.json());
}

const appContainer = document.getElementById('app');
appContainer.style.backgroundImage = 'url(starwars.jpg)';
appContainer.style.minHeight = '100vh';

const searchParams = new URLSearchParams(location.search);
const episodeId = searchParams.get('data.results[i].episode_id');

function renderPage(moduleName, css, apiUrl) {
    Promise.all([moduleName, css, apiUrl].map(src => loadResource(src)))
        .then(([pageModule, , data]) => {
            appContainer.innerHTML = '';
            appContainer.append(pageModule.render(data));
        });
}

if (episodeId) {
    renderPage(
        './episodes-details.js',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css',
        `https://swapi.dev/api/films/${episodeId}`)
}
else {
    renderPage(
        './episodes.js',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css',
        'https://swapi.dev/api/films/')
}


