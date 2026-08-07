const playersContainer = document.getElementById("players");
const search = document.getElementById("search");

function renderPlayers(list) {

    playersContainer.innerHTML = "";

    list.forEach(player => {

        let badge = "";

        if(player.captain){
            badge = `<div class="badge">⭐ Captain</div>`;
        }

        if(player.vice){
            badge = `<div class="badge">🥈 Vice Captain</div>`;
        }

        playersContainer.innerHTML += `
            <div class="card">

                <img src="https://placehold.co/120x120?text=AV" alt="Player">

                <h3>${player.name}</h3>

                <p>${player.position}</p>

                ${badge}

            </div>
        `;
    });

}

renderPlayers(players);

search.addEventListener("input",function(){

    const value = this.value.toLowerCase();

    const filtered = players.filter(player =>

        player.name.toLowerCase().includes(value) ||

        player.position.toLowerCase().includes(value)

    );

    renderPlayers(filtered);

});
