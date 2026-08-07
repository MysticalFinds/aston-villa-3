const sections = {
    GK: document.getElementById("goalkeepers"),
    DEF: document.getElementById("defenders"),
    MID: document.getElementById("midfielders"),
    ATT: document.getElementById("attackers")
};

function createPlayerCard(player) {
    const card = document.createElement("div");
    card.className = "player-card";

    let badge = "";

    if (player.captain) {
        badge = `<div class="badge">Captain</div>`;
    } else if (player.viceCaptain) {
        badge = `<div class="badge">Vice Captain</div>`;
    }

    card.innerHTML = `
        <img src="https://placehold.co/120x120?text=${player.position}" alt="${player.name}">
        <h3>${player.name}</h3>
        <p>${player.position}</p>
        ${badge}
    `;

    return card;
}

function renderPlayers(list) {

    Object.values(sections).forEach(section => {
        section.innerHTML = "";
    });

    list.forEach(player => {
        if (sections[player.position]) {
            sections[player.position].appendChild(createPlayerCard(player));
        }
    });

    setupRevealAnimation();
}

renderPlayers(players);

const search = document.getElementById("search");

search.addEventListener("input", () => {

    const value = search.value.toLowerCase();

    const filtered = players.filter(player =>
        player.name.toLowerCase().includes(value) ||
        player.position.toLowerCase().includes(value)
    );

    renderPlayers(filtered);

});

document.getElementById("fixtures-box").innerHTML = "";
document.getElementById("table-box").innerHTML = "";
document.getElementById("news-box").innerHTML = "";

function setupRevealAnimation() {

    const revealElements = document.querySelectorAll(
        "section, .player-card, .stat"
    );

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }

        });

    }, {
        threshold: 0.15
    });

    revealElements.forEach((element) => {
        element.classList.add("hidden");
        revealObserver.observe(element);
    });

}

setupRevealAnimation();
