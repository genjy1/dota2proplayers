'use strict'
const container = document.querySelector('.players')
const searchContainer = document.querySelector('.search-container')
const input = document.querySelector('#teamNameInput')
const select = document.querySelector('#teamNameSelect')
const title = document.querySelector('title')
const search = document.querySelector('#search')
const favIcon = document.querySelector('link')
const clear = document.querySelector('.clear')
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
                    container.innerHTML = ''
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
                            personaname.textContent = e.personaname.length > 16 ? e.personaname.substring(0, 16) : e.personaname
                            block.dataset.id = e.steamid
                            personaname.classList.add('text-wrap')
                            block.classList.add('border')
                            block.classList.add('flex')
                            block.classList.add('items-center')
                            block.classList.add('flex-col')
                            block.classList.add('transition')
                            block.classList.add('w-48')
                            block.classList.add('h-36')
                            block.classList.add('px-4')
                            block.classList.add('py-4') 
                            block.classList.add('rounded-xl')
                            block.classList.add('hover:border-slate-500')
                            block.append(img, h2, p, personaname)
                            container.append(block)             
                        }            
                    }
            ) 
        }
        
    } )
}catch(err){
    console.warn(err);
    const errorOption = document.createElement('option')
    errorOption.textContent = 'На сервере возникла ошибка'
    select.classList.add('text-red-500')
    select.classList.add('border-red-500')
    select.classList.add('rounded-xl')
    select.append(errorOption)
}}

clear.addEventListener('click', () => {
    container.innerHTML = ''
    searchContainer.innerHTML = ''
})

search.addEventListener('change', async() => {
    console.log(search.value);
    const searchAPI = await fetch(`https://api.opendota.com/api/search?q=${search.value}`)
    const APIJSON = await searchAPI.json()
    APIJSON.forEach((e) => {
            console.log(e);
            const container = document.querySelector('.search-container')
            const avatar = document.createElement('img')   
            const lastMatchTime = document.createElement('p')
            const personaname = document.createElement('h2')
            const wrapper = document.createElement('div')
            const dateTime = new Date(e.last_match_time)

            avatar.src = e.avatarfull
            lastMatchTime.textContent = `Время последнего матча ${dateTime.toLocaleString('ru')}`
            personaname.textContent = e.personaname
            personaname.classList.add('text-wrap')
            wrapper.classList.add('border')
            wrapper.classList.add('flex')
            wrapper.classList.add('items-center')
            wrapper.classList.add('flex-col')
            wrapper.classList.add('transition')
            wrapper.classList.add('w-48')
            wrapper.classList.add('h-36')
            wrapper.classList.add('px-4')
            wrapper.classList.add('py-4') 
            wrapper.classList.add('rounded-xl')
            wrapper.classList.add('hover:border-slate-500')


            wrapper.append(avatar, personaname, lastMatchTime)
            container.append(wrapper)
    })
})

getPlayers()

