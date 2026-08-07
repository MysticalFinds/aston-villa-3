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
  Object.values(sections).forEach(section => section.innerHTML = "");

  list.forEach(player => {
    if (sections[player.position]) {
      sections[player.position].appendChild(createPlayerCard(player));
    }
  });
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

document.getElementById("fixtures-box").innerHTML = `
<div class="coming-soon">
  <h3>Fixtures Coming Soon</h3>
  <p>Upcoming matches will be announced here.</p>
</div>
`;

document.getElementById("table-box").innerHTML = `
<div class="coming-soon">
  <h3>League Table Coming Soon</h3>
  <p>Standings will appear here.</p>
</div>
`;

document.getElementById("news-box").innerHTML = `
<div class="coming-soon">
  <h3>News Coming Soon</h3>
  <p>Latest club updates will be posted here.</p>
</div>
`;
document.querySelectorAll(".stat h2").forEach(counter=>{
    const target=parseInt(counter.innerText);

    let count=0;

    const update=()=>{
        if(count<target){
            count++;
            counter.innerText=count;
            requestAnimationFrame(update);
        }
    }

    update();
});
// Fade in sections
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.style.opacity="1";
            entry.target.style.transform="translateY(0)";
        }
    });
},{threshold:0.15});

sections.forEach(section=>{
    section.style.opacity="0";
    section.style.transform="translateY(60px)";
    section.style.transition="all .8s ease";
    observer.observe(section);
});
// Scroll reveal animation
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
