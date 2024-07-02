'use strict'
const container = document.querySelector('.players-row')
const input = document.querySelector('#teamName')
const title = document.querySelector('title')
const favIcon = document.querySelector('link')
const getPlayers = async () => {try{
    const proPlayers = await fetch('https://api.opendota.com/api/proPlayers')
    const playersJson = await proPlayers.json()
    
    playersJson.forEach(
        (e) => {
            const block = document.createElement('div')
            const img = document.createElement('img')
            const h2 = document.createElement('h2')
            const p = document.createElement('p')
            const span = document.createElement('span')
            input.addEventListener('input', async() => {
                if (e.team_name === input.value) {
                    const player = await fetch(`https://api.opendota.com/api/players/${e.account_id}`).then(response => response.json())
                    console.log(player);
                    title.textContent = `${input.value} players`
                    img.src = e.avatar
                    h2.textContent = e.name
                    span.textContent = ` | ${player.leaderboard_rank} rank`
                    h2.append(span)
                    switch (e.fantasy_role) {
                        case 1:
                            p.textContent = 'Core'
                            break;
                    
                        case 2:
                            p.textContent = 'Support'
                            break;
                    }
                    block.dataset.id = e.steamid
                    block.append(img, h2, p)
                    container.append(block)
                }else{
                    block.remove()
                }   
            })
            }
    )
}catch(err){
    console.warn(err);
}}

getPlayers()