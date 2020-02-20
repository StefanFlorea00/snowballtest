//conecting the link to the google sheets data
const link = "https://spreadsheets.google.com/feeds/list/1FSy3AueANJmJWDjB3LnMtNISPU4uvWdPvdfRWyeHJAk/od6/public/values?alt=json";
window.addEventListener("DOMContentLoaded", getData);

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

}
;


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



    //    append the clone
    document.querySelector("main").appendChild(clone);

}
