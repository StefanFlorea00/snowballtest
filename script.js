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
    clone.querySelector(".distance span").textContent = data.gsx$distance.$t;
    clone.querySelector("img").src = data.gsx$image.$t;

    clone.querySelector(".resortCard").addEventListener("click", (e) => {
        console.log("click", e.currentTarget.parentElement);
        /*const info = document.createElement('div');
        info.classList.add('popin')*/
        e.currentTarget.parentNode.insertBefore(document.querySelector('.popin'), e.currentTarget.nextSibling);
        document.querySelector('.popin').style.display = "block";
       // showDetails(data);
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

    try{
    let sectionToAdd = data.gsx$country.$t;
    document.querySelector('#' + sectionToAdd).appendChild(clone);
    }
    catch(err){
        console.log(err.message);
    }
}
