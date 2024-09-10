async function getMatchData() {
    try {
        const response = await fetch("https://api.cricapi.com/v1/currentMatches?apikey=1a01383b-f275-4960-9dc4-335c104a7dab&offset=0");
        const data = await response.json();

        if (data.status !== "success") {
            throw new Error("API request failed");
        }

        const matchesList = data.data;

        if (!matchesList) {
            throw new Error("No match data available");
        }

        const relevantData = matchesList.filter(match => match.series_id === "{c75f8952-74d4-416f-b7b4-7da4b4e3ae6e}")
                                        .map(match => `${match.name}, ${match.status}`);

        const matchesElement = document.getElementById("matches");

        if (relevantData.length === 0) {
            matchesElement.innerHTML = "<p>No current matches for the specified series.</p>";
        } else {
            matchesElement.innerHTML = relevantData.map(match => `<li>${match}</li>`).join('');
        }

        return relevantData;
    } catch (error) {
        console.error("Error fetching match data:", error);
        document.getElementById("matches").innerHTML = "<p>Error fetching match data. Please try again later.</p>";
    }
}

getMatchData();
