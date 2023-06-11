chrome.runtime.onMessage.addListener((request, sender, respond) => {
  const handler = new Promise((resolve, reject) => {
    if (request) {
      var allDivs = document.body.querySelectorAll('div')
      var allText = ""
      allDivs.forEach(element => {
        allText += element.innerText
      });
      return allText

      const url = window.location.href
      var data = {"url": url, "content": allText}
      resolve(data);
      console.log(`Hi from contentPage! You are currently on: ${window.location.href}`)
    } else {
      reject('request is empty.');
    }
  });

  handler.then(message => respond(message)).catch(error => respond(error));

  return true;
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  //if (request.action === "getDOM") {
  //  var dom = document.documentElement.innerHTML;
  //  sendResponse({ dom: dom });
  //}
  var allDivs = document.body.querySelectorAll('div')
  var allText = ""
  allDivs.forEach(element => {
    allText += element.innerText
  });
  sendResponse({ "content": allText})
});
