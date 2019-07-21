fetch (herokuAPIEndpoint + `find/`)
.then(response => {
    if (response.ok) {
        return response.json();
    }
    throw new Error (response.statusText);
})
.then (monsterListJson => {
    grabCount(monsterListJson.count); 
    gatherRelevantMonsters(createUrlMonsterArray(monsterListJson), ratingInput)
})
.catch (error => alert (`Error in GETting users: ${error.message}`));








