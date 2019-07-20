            fetch(, {
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                }
            })
            .then(response => {
                if (response.ok) {
                return response.json();
                }
                throw new Error (response.statusText);
            })
            .then (singleMonsterResponse => {
                monsterObjectArray.push(singleMonsterResponse)
            })
            .catch (error => console.log(`Error in gatherRelevantMonsters: ${error.message}`))