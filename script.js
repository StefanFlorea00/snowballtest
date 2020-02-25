//conecting the link to the google sheets data
const link = "https://spreadsheets.google.com/feeds/list/1FSy3AueANJmJWDjB3LnMtNISPU4uvWdPvdfRWyeHJAk/od6/public/values?alt=json";
window.addEventListener("DOMContentLoaded", getData);

//const modal = document.querySelector(".modal-background");
//modal.addEventListener("click", (e) => {
//    if (e.target.className === "modal-background") {
//        document.querySelector(".modal-background").style.display = "none";
//    }
//})

//fetch the Json data
function getData() {
    fetch(link)
        .then(res => res.json())
        .then(handleData);
}

function handleData(data) {

    const JSONdata = data.feed.entry;

    console.log("[INFO] Found resorts:", JSONdata);

    let selectedAlready = false;
    document.querySelector("#sort").addEventListener("change", (e) => {

        if(document.querySelector("#sort").value == "Country" && !selectedAlready){
                JSONdata.forEach(createSectionsCountry);
                JSONdata.forEach(showData);
                selectedAlready = true;
        }
        else if (document.querySelector("#sort").value == "Name") {
        }
        else if (document.querySelector("#sort").value == "Price"){
                JSONdata.forEach(deleteSections);
                JSONdata.forEach(createSectionsPrice);
                JSONdata.forEach(showData);
        }
        else {
            selectedAlready = false;

        }


    });
}

function showData(singleRowData) {
    addResort(singleRowData);
}

let sectionsArray = [];
function createSectionsPrice(singleRowData) {

    const mainBody = document.querySelector("main");

    if (document.querySelector(`#price${singleRowData.gsx$skipass.$t}`) == null) {

        console.warn("[INFO] ADDED SECTION " + singleRowData.gsx$skipass.$t);
        const createdSection = document.createElement("section");
        const createdh2 = document.createElement("h2");

        createdSection.setAttribute("id", `${singleRowData.gsx$skipass.$t}`);
        createdh2.setAttribute("class", `sectionTitle`);
        createdh2.textContent = `${singleRowData.gsx$skipass.$t}`;

        sectionsArray.push(createdSection);

        sectionsArray.sort( function(a,b) {
            console.log(parseInt(a.id)-parseInt(b.id));
                return parseInt(a.id)-parseInt(b.id);
        });

        sectionsArray.forEach(el => {
            mainBody.appendChild(el);
        })

        console.log(sectionsArray);

//        for(let i=0;i<=sectionsArray.length;i++){
//            mainBody.appendChild(sectionsArray[i]);
////            sectionsArray[i].appendChild(createdh2);
//            }


    }
}

function createSectionsCountry(singleRowData) {

    const mainBody = document.querySelector("main");

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

function deleteSections(singleRowData) {
    section = document.querySelector(`#${singleRowData.gsx$country.$t}`);
    console.log(document.querySelector(`#${singleRowData.gsx$country.$t}`));

    if (section != null) {
        section.parentNode.removeChild(section);
    }
}

function addResort(jsonResort) {

    //grab the template
    const template = document.querySelector("template").content;


    //make a copy
    const clone = template.cloneNode(true);

    //change the content
    clone.querySelector(".resortCard h1").textContent = jsonResort.gsx$resort.$t;
    clone.querySelector(".max_height span").textContent = jsonResort.gsx$maxheight.$t;
    clone.querySelector(".slope_lenght span").textContent = jsonResort.gsx$slopelength.$t;
    clone.querySelector(".distance span").textContent = jsonResort.gsx$distance.$t;
    clone.querySelector("img").src = jsonResort.gsx$image.$t;

    //add extended description
    addExtendedDesc(clone, jsonResort);

    //append template
    try {
        if(document.querySelector("#sort").value == "Country" && !selectedAlready){
                    let sectionToAdd = jsonResort.gsx$country.$t;
        }
        else if (document.querySelector("#sort").value == "Name") {
                    let sectionToAdd = jsonResort.gsx$resort.$t;
                    console.log(sectionToAdd);
                    document.querySelector('#' + sectionToAdd).appendChild(clone);
        }
        else if (document.querySelector("#sort").value == "Price"){
                    let sectionToAdd = jsonResort.gsx$skipass.$t;
                    document.querySelector('#price' + sectionToAdd).appendChild(clone);
        }
    } catch (err) {
        console.log(err.message);
    }
}

function addExtendedDesc(clone, jsonResort) {
    clone.querySelector(".resortCard").addEventListener("click", (e) => {
        console.log("[INFO] clicked on:", e.currentTarget.parentElement);

        e.currentTarget.parentNode.insertBefore(document.querySelector('.extendedDesc'), e.currentTarget.nextSibling);

        document.querySelector('.extendedDesc').style.display = "block";
        document.querySelector('.arrow-up').style.left = e.pageX + "px";

        var isInViewport = function (elem) {
            var bounding = elem.getBoundingClientRect();
            return (
                bounding.top >= 0 &&
                bounding.left >= 0 &&
                bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
                );
            };

        showExtendedDetails(jsonResort);

        if (!isInViewport(document.querySelector('.extendedDesc'))) {
            scrollTo(pageXOffset,pageYOffset+300);
        }
    });
}

function showExtendedDetails(jsonResort) {
    const extendedDesc = document.querySelector(".extendedDesc");

    extendedDesc.querySelector("h1").textContent = jsonResort.gsx$resort.$t;
    extendedDesc.querySelector(".modal-green span").textContent = jsonResort.gsx$greenslopes.$t;
    extendedDesc.querySelector(".modal-blue span").textContent = jsonResort.gsx$blueslopes.$t;
    extendedDesc.querySelector(".modal-red span").textContent = jsonResort.gsx$redslopes.$t;
    extendedDesc.querySelector(".modal-black span").textContent = jsonResort.gsx$blackslopes.$t;
    extendedDesc.querySelector(".modal-image-small").src = jsonResort.gsx$mapimage.$t;
    extendedDesc.querySelector(".extendedPrice span").textContent = jsonResort.gsx$skipass.$t;

    extendedDesc.querySelector(".close").addEventListener("click", (e) => {
        extendedDesc.style.animation = ".3s open ease-in forwards;";
        extendedDesc.style.display = "none";
    });
}
