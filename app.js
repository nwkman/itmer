var errandsSelector = document.getElementById("errands-selector"),
    app             = document.getElementById("app"),
    quotes          = document.getElementById("quotes"),
    clock           = document.getElementById("clock"),
    whichErrand     = document.getElementById("which-errand"),
    mode            = 0,
    currentErrand   = 0,
    errandsList     = [],
    quotesList      = [];

// Magic numbers.
const   millisecondsInAnHour    = 60 * 60 * 1000,
        millisecondsInAMinute   = 60 * 1000,
        millisecondsInASecond   = 1000;

function toggleMode() {
    mode = (++mode) % 3;
    return;
}

function getQuotes() {
    fetch("quotes.json")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            for (var k of data["quotes"]) {
                quotesList.push(k);
            }
        })
        .catch(function(err) {
            console.log(err);
        });

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
    document.title = "Timer app";
    return;
}

function setErrand(errandId) {
    console.log(`Set errand to ${errandId}`);
    currentErrand = errandId;
    return;
}

function conv(number) {
    return number * 86400000;
}


function loadTimer() {
    var errandOn, errandPeriod, happened = 1, final = "";
    try {
        errandOn = errandsList[currentErrand].on;
    } catch (e) {
        app.innerHTML = `<div class="center error">Sorry, this timer has been misconfigured. Please contact the owner of this website to fix it.<br>Error: ${e}</div>`;
    }
    try {
        errandPeriod = errandsList[currentErrand].period;
    } catch(e) {
        errandPeriod = null;
    }
    var errandParse     = Date.parse(errandOn),
        now             = new Date();
    var nowParse        = Date.parse(now),
        diff            = 0;
    if (errandParse - nowParse < 0) {
        if (errandPeriod != null) {
            var modulo = (nowParse - errandParse) % conv(errandPeriod);
            errandParse += Math.floor((nowParse - errandParse) / conv(errandPeriod));
            if (modulo > 0) {
                errandParse += conv(errandPeriod);
            }
        } else {
            happened = -1;
        }
    }
    final += `${errandsList[currentErrand].title} happens on <br>`
    diff = happened * (errandParse - nowParse);
    var hour, min, sec;
    if (mode == 0) {
        // hh:mm:ss
        hour    = Math.floor(diff / millisecondsInAnHour);
        min     = Math.floor((diff - hour * millisecondsInAnHour) / millisecondsInAMinute);
        sec     = Math.floor((diff - (hour * millisecondsInAnHour) - (min * millisecondsInAMinute)) / millisecondsInASecond);
        final   += `${(hour < 10) ? ("0" + String(hour)) : hour} h ${(min < 10) ? ("0" + String(min)) : min} m ${sec} s`;
    } else if (mode == 1) {
        // mm:ss
        min     = Math.floor(diff / millisecondsInAMinute);
        sec     = Math.floor((diff - min * millisecondsInAMinute) / millisecondsInASecond);
        final   += `${(min < 10) ? ("0" + String(min)) : min} m ${(sec < 10) ? ("0" + String(sec)) : sec} s`;
    } else if (mode == 2) {
        // ss
        sec     = Math.floor(diff / millisecondsInASecond);
        final   += `${sec} s`;
    }
    if (happened == -1) {
        final += "<br>ago";
    }
    clock.innerHTML = final;
    return;
}
