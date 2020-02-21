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
    console.log(myData);
    myData.forEach(createSections);
    myData.forEach(showData);
}

function showData(singleRowData) {
    console.log(singleRowData.gsx$country.$t);
    addResort(singleRowData);
}

function createSections(singleRowData){
        const mainBody = document.querySelector("main");
    console.warn("AAAA" + singleRowData.gsx$country.$t);
    if (document.querySelector(`#${singleRowData.gsx$country.$t}`) == null) {
        console.warn("[INFO] ADDED SECTION " + singleRowData.gsx$country.$t);
        const createdSection = document.createElement("section");
        const createdh2 = document.createElement("h2");

        createdSection.setAttribute("id", `${singleRowData.gsx$country.$t}`);
        createdh2.setAttribute("class", `sectionTitle`);
        createdh2.textContent = `${singleRowData.gsx$country.$t}`;

        mainBody.appendChild(createdSection);
        createdSection.appendChild(createdh2);
    }
}


function addResort(data) {

    //grab the template
    const template = document.querySelector("template").content;


    //make a copy
    const clone = template.cloneNode(true);
    //change the content
    clone.querySelector(".resortCard h1").textContent = data.gsx$resort.$t;
    clone.querySelector(".max_height span").textContent = data.gsx$maxheight.$t;
    clone.querySelector(".slope_lenght span").textContent = data.gsx$slopelength.$t;
    clone.querySelector("img").src = data.gsx$image.$t;
    //    append the clone
    try{
    let sectionToAdd = data.gsx$country.$t;
    document.querySelector('#' + sectionToAdd).appendChild(clone);
    }
    catch(err){
        console.log(err.message);
    }
}
