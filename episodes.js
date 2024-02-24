export function render(data) {
    const container = document.createElement('div');
    container.classList.add('container', 'py-4', 'text-center');
    container.style.width = '60%';
    const title = document.createElement('h1');
    title.textContent = 'STAR WARS EPISODES:';
    title.style.color = 'white';
    container.append(title);
    for (let i = 0; i < data.results.length; i++) {
        const episodeCard = document.createElement('a');
        episodeCard.textContent = (i + 1) + '. ' + data.results[i].title;
        episodeCard.classList.add('d-block', 'btn', 'btn-secondary', 'm-3');
        episodeCard.href = `?data.results[i].episode_id=${i+1}`;
        container.append(episodeCard);
    }
    return container;
}
