var errandsSelector = document.getElementById("errands-selector"),
    quotes          = document.getElementById("quotes"),
    clock           = document.getElementById("clock"),
    whichErrand     = document.getElementById("which-errand"),
    mode            = 0,
    currentErrand   = 0,
    errandsList     = [];


function toggleMode() {
    mode = (++mode) % 4;
    return;
}

function getErrands() {
    const requestUrl    = "errands.json";
    const request       = new Request(requestUrl);
    fetch(request)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            var counter = 0;
            for (var k of data["errands"]) {
                var newOption = document.createElement("option");
                newOption.textContent = `${k.title}`;
                newOption.value = counter;
                counter++;
                whichErrand.appendChild(newOption);
                errandsList.push(k);
            }
        })
        .catch(function(err) {
            console.log(err);
        });
    return;
}

function setErrand(errandId) {
    currentErrand = errandId;
    return;
}

function loadTimer() {
    
}
