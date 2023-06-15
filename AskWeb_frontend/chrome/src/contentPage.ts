chrome.runtime.onMessage.addListener((request, sender, respond) => {
    const handler = new Promise((resolve, reject) => {
        if (request) {
            if (request.action === "getDOM") {
                resolve(getDomAndUrl());
            }
        } else {
            reject('request is empty.');
        }
    });

    handler.then(message => respond(message)).catch(error => respond(error));
    return true;
});

function getDomAndUrl() {
    var allDivs = document.body.querySelectorAll('div')
    var allText = ""
    allDivs.forEach(element => {
        allText += element.innerText
    });

    const url = window.location.href
    var data = {"url": url, "content": allText}
    return data
}