async function searchMovie() {
    var input = document.getElementById("movieInput").value.trim(); // Trim whitespace
    if (input === "") {
        alert("Please enter a movie name.");
        return;
    }
    // var url = "https://saadmomin2903--reco.modal.run" + encodeURIComponent(input);

    // var xhr = new XMLHttpRequest();
    // xhr.open("POST", url, true);
    // xhr.onreadystatechange = function () {
    //     if (xhr.readyState === 4) {
    //         if (xhr.status === 200) {
    //             var data = JSON.parse(xhr.responseText);
    //             displayRecommendations(data);
    //         } else {
    //             console.error("Request failed with status:", xhr.status);
    //         }
    //     }
    // };
    // xhr.send();

    const res = await fetch("https://saadmomin2903--reco.modal.run", {
        method:"POST",
        headers:{
            "Content-type": "application/json"
        },

        body: JSON.stringify({
            title: input
        })
    })

    console.log(await res.json());
}

function displayRecommendations(data) {
    var recommendationsDiv = document.getElementById("recommendations");
    recommendationsDiv.innerHTML = ""; // Clear previous recommendations

    if (data && data.length > 0) {
        var ul = document.createElement("ul");
        data.forEach(function (recommendation) {
            var li = document.createElement("li");
            li.textContent = recommendation;
            ul.appendChild(li);
        });
        recommendationsDiv.appendChild(ul);
    } else {
        recommendationsDiv.textContent = "No recommendations found for this movie.";
    }
}
