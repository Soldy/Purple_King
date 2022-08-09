'use strict';



const _MessageManagerClass = function() {
    chrome.runtime.onMessage.addListener(
        function(message, sender, sendResponse) {
            if(message.name === 'site')
                tabManager.website(message.url_origin);
        }
    );
};


_MessageManagerClass();
const keyWatcher = function(){
    document
        .getElementsByTagName('body')[0]
        .addEventListener(
            'keydown',
           function(e){
                return new Promise((resolve, reject) => {
                chrome.runtime.sendMessage({
                    'key': e.key,
                    'url_origin':window.location.toLocaleString(),
                    'name': 'site'
                }, result => {
                     if (result !== undefined) {
                          resolve(result);
                     } else {
                         console.warn(
                             'set value failed:',
                             chrome.runtime.lastError
                         );
                         reject();
                    }
                });
                console.log(chrome);
                console.log(d);
            });
            }
    );

}


const _codeInjector = function(code, tabId){
    browser.tabs.executeScript(
       tabId,
       {
           code: '('+code+')();'
       }
    ); 

}

chrome.webNavigation.onCommitted.addListener(function(d){
    if(d.parentFrameId !== -1)
        return;
    const url = d.url;
    console.log(document.getElementsByTagName('body')[0]);
    console.log(d);
    console.log(tabManager);
    _codeInjector(
       keyWatcher.toString()
       d.tabId
    );

   // setTimeout(function(){tabManager.website(url)},5000);
});
