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

let init = false;
function handleData(data) {

    const JSONdata = data.feed.entry;

    console.log("[INFO] Found resorts:", JSONdata);
    if(!init){
            console.log("[INFO] Init");
            createSectionsLength();
            JSONdata.forEach(addResortLengthArray);
            resortArray.forEach(addResort);
    }
    document.querySelector("#sort").addEventListener("change", (e) => {
        if (document.querySelector("#sort").value == "Country") {
            JSONdata.forEach(deleteSectionsLength);
            JSONdata.forEach(deleteSectionsPrice);
            JSONdata.forEach(createSectionsCountry);
            JSONdata.forEach(showData);
        } else if (document.querySelector("#sort").value == "Length") {
            JSONdata.forEach(deleteSectionsPrice);
            JSONdata.forEach(deleteSectionsCountry);
            createSectionsLength();
            resortArray.forEach(addResort);
        } else if (document.querySelector("#sort").value == "Price") {
            JSONdata.forEach(deleteSectionsLength);
            JSONdata.forEach(deleteSectionsCountry);
            JSONdata.forEach(sortSectionsPriceArray);
            JSONdata.forEach(createSectionsPrice);
            JSONdata.forEach(showData);
        } else {}
    });
}

function showData(singleRowData) {
    addResort(singleRowData);
}

//old function for creating price sections, was not working well
function createSectionsPriceOLD(singleRowData) {

    const mainBody = document.querySelector("main");

    if (document.querySelector(`#price${singleRowData.gsx$skipass.$t}`) == null) {

        const createdSection = document.createElement("section");
        const createdh2 = document.createElement("h2");

        createdSection.setAttribute("id", `${singleRowData.gsx$skipass.$t}`);
        createdh2.setAttribute("class", `sectionTitle`);
        createdh2.textContent = `${singleRowData.gsx$skipass.$t}`;

        sectionsPriceArray.push(createdSection);

        sectionsPriceArray.sort(function (a, b) {
            console.log(parseInt(a.id) - parseInt(b.id));
            return parseInt(a.id) - parseInt(b.id);
        });

        let uniqueSectionsArray = [sectionsPriceArray[0]];
        for (let i = 1; i < uniqueSectionsArray.length; i++) {
            if (sectionsPriceArray[i] != sectionsPriceArray[i - 1]) uniqueSectionsArray.push(arr[i]);
        }

        uniqueSectionsArray.forEach(el => {
            mainBody.appendChild(el);
            console.warn("[INFO] ADDED SECTION ", singleRowData.gsx$skipass.$t);
        })

        console.log(uniqueSectionsArray);

        //        for(let i=0;i<=sectionsArray.length;i++){
        //            mainBody.appendChild(sectionsArray[i]);
        ////            sectionsArray[i].appendChild(createdh2);
        //            }


    }
}

let sectionsPriceArray = [];
let uniqueSectionsPriceArray = [];

//needed for creating price sections, stores data in uniqueSectionsPriceArray
function sortSectionsPriceArray(singleRowData) {
    sectionsPriceArray.push(parseInt(singleRowData.gsx$skipass.$t));
    sectionsPriceArray.sort((a, b) => {
        return a - b;
    });

    uniqueSectionsPriceArray = [...new Set(sectionsPriceArray)];
    console.log(uniqueSectionsPriceArray);
}

function createSectionsPrice(singleRowData) {
    const mainBody = document.querySelector("main");

    if (document.querySelector(`#price${singleRowData.gsx$skipass.$t}`) == null) {
        for (let i = 0; i < uniqueSectionsPriceArray.length; i++) {
            const createdSection = document.createElement("section");
            createdSection.setAttribute("id", `price${uniqueSectionsPriceArray[i]}`);

            mainBody.appendChild(createdSection);

            const createdh2 = document.createElement("h2");
            createdh2.setAttribute("class", `sectionTitle`);
            createdh2.textContent = `${uniqueSectionsPriceArray[i]} dkk`;
            createdSection.appendChild(createdh2);

            console.warn("[INFO] ADDED SECTION ", uniqueSectionsPriceArray[i]);
        }
    }
}

function createSectionsCountry(singleRowData) {

    const mainBody = document.querySelector("main");

    if (document.querySelector(`#${singleRowData.gsx$country.$t}`) == null) {

        const createdSection = document.createElement("section");
        const createdh2 = document.createElement("h2");

        createdSection.setAttribute("id", `${singleRowData.gsx$country.$t}`);
        createdh2.setAttribute("class", `sectionTitle`);
        createdh2.textContent = `${singleRowData.gsx$country.$t}`;

        mainBody.appendChild(createdSection);
        createdSection.appendChild(createdh2);
        console.warn("[INFO] ADDED SECTION ", singleRowData.gsx$country.$t);
    }
}

function createSectionsLength() {
    const mainBody = document.querySelector("main");
    if (document.querySelector(`#lengthSection`) == null) {

        const createdSection = document.createElement("section");
        createdSection.setAttribute("id", `lengthSection`);
        mainBody.appendChild(createdSection);

        console.warn("[INFO] ADDED SECTION ", createdSection.getAttribute("id"));
    }
}

function deleteSectionsCountry(singleRowData) {
    section = document.querySelector(`#${singleRowData.gsx$country.$t}`);
    console.log("[INFO] DELETED SECTION", document.querySelector(`#${singleRowData.gsx$country.$t}`));

    if (section != null) {
        section.parentNode.removeChild(section);
    }
}

function deleteSectionsPrice(singleRowData) {
    section = document.querySelector(`#price${singleRowData.gsx$skipass.$t}`);
    console.log("[INFO] DELETED SECTION", document.querySelector(`#price${singleRowData.gsx$skipass.$t}`));

    if (section != null) {
        section.parentNode.removeChild(section);
    }
}

function deleteSectionsLength() {
    section = document.querySelector(`#lengthSection`);
    console.log("[INFO] DELETED SECTION", document.querySelector(`#lengthSection`));

    if (section != null) {
        section.parentNode.removeChild(section);
    }
}

function deleteSections(singleRowData){
    deleteSectionsCountry(singleRowData);
    deleteSectionsPrice(singleRowData);
    deleteSectionsLength();
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

    //append template check for selected sort
    //TODO: doesn't 100% work find out why
    try {
        if (document.querySelector("#sort").value == "Country") {
            let sectionToAdd = jsonResort.gsx$country.$t;
            document.querySelector('#' + sectionToAdd).appendChild(clone);
        } else if (document.querySelector("#sort").value == "Length") {
            let sectionToAdd = "lengthSection";
            document.querySelector('#' + sectionToAdd).appendChild(clone);
        } else if (document.querySelector("#sort").value == "Price") {
            let sectionToAdd = jsonResort.gsx$skipass.$t;
            document.querySelector('#price' + sectionToAdd).appendChild(clone);
        }
    } catch (err) {
        console.log(err.message);
    }
}

const resortArray = [];
function addResortLengthArray(jsonResort){
    resortArray.push(jsonResort);
    resortArray.sort( (a,b) => {
        return parseInt(a.gsx$slopelength.$t) - parseInt(b.gsx$slopelength.$t);
    });
    console.log(resortArray);
}

//function for creating the extended description
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
            scrollTo(pageXOffset, pageYOffset + 300);
        }
    });
}

//replace extended description details
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
