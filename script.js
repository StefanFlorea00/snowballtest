//conecting the link to the google sheets data
const link = "https://spreadsheets.google.com/feeds/list/1FSy3AueANJmJWDjB3LnMtNISPU4uvWdPvdfRWyeHJAk/od6/public/values?alt=json";
window.addEventListener("DOMContentLoaded", getData);

const modal = document.querySelector(".modal-background");
modal.addEventListener("click", (e) => {
    if (e.target.className === "modal-background") {
        document.querySelector(".modal-background").style.display = "none";
    }
})

//fetch the Json data
function getData() {
    fetch(link)
        .then(res => res.json())
        .then(handleData);
}

function handleData(data) {

    const myData = data.feed.entry;

    console.log("myData - console:");
    console.log(myData)
    myData.forEach(showData)
}

function showData(singleRowData) {
    console.log("single Row Data - console");
    console.log(singleRowData.gsx$country.$t);
    addResort(singleRowData);

};



function addResort(data) {

    //grab the template
    const template = document.querySelector("template").content;


    //make a copy
    const clone = template.cloneNode(true);
    console.log("here");

    //change the content
    clone.querySelector(".country span").textContent = data.gsx$country.$t;
    clone.querySelector(".resort").textContent = data.gsx$resort.$t;
    clone.querySelector(".max_height").textContent = data.gsx$maxheight.$t;
    clone.querySelector(".slope_lenght").textContent = data.gsx$slopelength.$t;
    clone.querySelector("img").src = data.gsx$image.$t;

    clone.querySelector("button").addEventListener("click", () => {
        console.log("click", data);
        showDetails(data);
    });

    function showDetails(data) {
        console.log("data");
        document.querySelector(".modal-background").style.display = "block";
        modal.querySelector(".modal-image-big").src = data.gsx$image.$t;
        modal.querySelector(".resort-name").textContent = data.gsx$resort.$t;
        modal.querySelector(".modal-country").textContent = data.gsx$country.$t;

        //        modal.querySelector(".resort-description").textContent=data.description;
        modal.querySelector(".modal-green span").textContent = data.gsx$greenslopes.$t;
        modal.querySelector(".modal-blue span").textContent = data.gsx$blueslopes.$t;
        modal.querySelector(".modal-red span").textContent = data.gsx$redslopes.$t;
        modal.querySelector(".modal-black span").textContent = data.gsx$blackslopes.$t;
        modal.querySelector(".modal-image-small").src = data.gsx$mapimage.$t;
        modal.querySelector(".modal-price span").textContent = data.gsx$skipass;


    }



    //    append the clone
    document.querySelector("main").appendChild(clone);

}
