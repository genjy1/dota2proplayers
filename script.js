'use strict'
const container = document.querySelector('.players')
const input = document.querySelector('#teamNameInput')
const select = document.querySelector('#teamNameSelect')
const title = document.querySelector('title')
const search = document.querySelector('#search')
const favIcon = document.querySelector('link')
const getPlayers = async () => {try{
    const proPlayers = await fetch('https://api.opendota.com/api/proPlayers')
    const playersJson = await proPlayers.json()
    const teams = await fetch('https://api.opendota.com/api/teams')
    const teamsJson = await teams.json()
    teamsJson.forEach((t) => {
        const option = document.createElement('option')
        const img = document.createElement('img')
        option.textContent = t.name;
        option.value = t.name
        select.append(option)
    })
    window.addEventListener('click', (event) => {
        const targetName = event.target

        if (targetName.tagName === 'SELECT' && targetName.value !== input.value) {
            input.value = targetName.value
            playersJson.forEach(
                async(e) => {
                    const teamRow = document.createElement('div')
                    const block = document.createElement('div')
                    const img = document.createElement('img')
                    const h2 = document.createElement('h2')
                    const p = document.createElement('p')
                    const personaname = document.createElement('p')
                    const span = document.createElement('span')
                    
                    teamRow.classList.add('team-row')
                    if (e.team_name === input.value) {
                            const player = await fetch(`https://api.opendota.com/api/players/${e.account_id}`).then(response => response.json())
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
                                case undefined:
                                    p.textContent = 'Mid'
                            }
                            personaname.textContent = e.personaname
                            block.dataset.id = e.steamid
                            block.append(img, h2, p, personaname)
                            container.append(block)             
                        }else if (e.team_name !== input.value) {
                            block.remove()   
                        }             
                    }
            ) 
        }
        
    } )
}catch(err){
    console.warn(err);
}}

search.addEventListener('change', async() => {
    console.log(search.value);
    const searchAPI = await fetch(`https://api.opendota.com/api/search?q=${search.value}`)
    const APIJSON = await searchAPI.json()
    APIJSON.forEach((e) => {
        if (e.similarity > 50) {
            console.log(e);
            const container = document.querySelector('.players')
            const avatar = document.createElement('img')   
            const lastMatchTime = document.createElement('p')
            const personaname = document.createElement('h2')
            const wrapper = document.createElement('div')
            const dateTime = new Date(e.last_match_time)

            avatar.src = e.avatarfull
            lastMatchTime.textContent = `Время последнего матча ${dateTime.toLocaleString('ru')}`
            personaname.textContent = e.personaname
            
            wrapper.append(avatar, personaname, lastMatchTime)
            container.append(wrapper)
        }
    })
})

getPlayers()

