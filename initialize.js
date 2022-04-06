// initialize all things.
async function init() {
    try {
        await getQuotes();
        await getErrands();
        currentQuoteId = Math.floor(Math.random() * quotesList.length);
        quotes.innerHTML = quotesList[currentQuoteId].text;
        var updateInterval = setInterval(function() {
            loadTimer();
        }, 1000);
        clock.addEventListener("click", function() {
            toggleMode();
            loadTimer();
        });
        quotes.addEventListener("click", function() {
            toggleQuote();
        })
    } catch (e) {
        app.innerHTML = `<div class="center error">Sorry, this timer has been misconfigured. Please contact the owner of this website to fix it.<br>Error: ${e}</div>`;
    }
    return;
}

init();
