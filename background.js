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
        case 'newTab':
            chrome.tabs.create({'index': sender.tab.index+1, 'url': request.taburl, 'active': false}, function(){});
            break;
        case 'closeTab':
            chrome.tabs.remove(sender.tab.id, function(){});
            break;
        case 'success':
            var num=parseInt(localStorage['num']) || 0;
            localStorage['num'] = num + 1;
            localStorage['lastday'] = (new Date).getDate();
            chrome.tabs.remove(sender.tab.id, function(){});
            break;
        }
    }
)

function Login(url){
    chrome.tabs.create({
        url: "https://login.taobao.com/member/login.jhtml?from=taotry&redirect_url="+encodeURIComponent(url),
        active: true
    });
}

function notify(title,msg) {
    if(localStorage['inform']=='true'){
        chrome.notifications.create("", {
                    type: "basic",
                    title: title,
                    message: msg,
                    iconUrl: "icons/icon.png"
        }, function(){});
    }
}
