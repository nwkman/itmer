// initialize all things.
async function init() {
    try {
        await getQuotes()
            .then(function() {
                getErrands();
            })
            .then(function() {
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
                    renderMathInElement(document.body, {
                        delimiters: [
                            {
                                left: '$$',
                                right: '$$',
                                display: true
                            },
                            {
                                left: '$',
                                right: '$',
                                display: false
                            },
                            {
                                left: '\\(',
                                right: '\\)',
                                display: false
                            },
                            {
                                left: '\\[',
                                right: '\\]',
                                display: true
                            }
                        ],
                        throwOnError: false
                    });
                });
            })
            .catch(function(err) {
                console.log(err);
            })
    } catch (e) {
        app.innerHTML = `<div class="center error">Sorry, this timer has been misconfigured. Please contact the owner of this website to fix it.<br>Error: ${e}</div>`;
    }
    return;
}

init();
