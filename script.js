async function getMatchData() {

    return await fetch("https://api.cricapi.com/v1/currentMatches?apikey=1a01383b-f275-4960-9dc4-335c104a7dab&offset=0")
        .then(data => data.json())
        .then(data => {
            if (data.status != "success")return;

            const matchesList = data.data;

            if(!matchesList)return [];
            
            //add your api key from cricketdata.org
            const relevantData = matchesList.filter(match => match.series_id == "{c75f8952-74d4-416f-b7b4-7da4b4e3ae6e}").map(match => `${match.name}, ${match.status}`);

            console.log({relevantData});

            document.getElementById("matches").innerHTML = relevantData.map(match => `<li>${match} </li>`).join('');

            return relevantData;

        })
        .catch(e => console.log(e));
}

getMatchData();