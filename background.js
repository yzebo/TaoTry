var key="";
var ans="";
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        switch(request.action){
        case 'question':
            key=request.keyword;
            break;
        case 'keyword':
            sendResponse({
                'keyword': key
            });
            break;
        case 'answer':
            ans=request.answer;
            break;
        case 'getAnswer':
            if(ans!=""){
                sendResponse({
                    answer: ans
                });
                ans="";
            }
            break;
        case 'notify':
            notify(request.title, request.msg);
            break;
        case 'closetab':
            chrome.tabs.remove(sender.tab.id, function(){});
            break;
        }
    }
)

function Login(url){
    chrome.tabs.create({
        url: "https://login.taobao.com/member/login.jhtml?from=taocoin&redirect_url="+encodeURIComponent(url),
        active: true
    });
}

function notify(title,msg) {
    chrome.notifications.create("", {
                type: "basic",
                title: title,
                message: msg,
                iconUrl: "icons/icon.png"
    }, function(){});
}