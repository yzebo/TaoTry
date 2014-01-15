//get parameters from url
var para = (function(a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
        var p=a[i].split('=');
        if (p.length != 2) continue;
        b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
})(window.location.search.substr(1).split('&'));

if(para.from=='taotry'){
    window.addEventListener('load', function(){
        var keyword=document.querySelector("#J_Question em").innerText;
        var answer="";
        var evt = document.createEvent("MouseEvents");
        evt.initEvent("click", true, true);
        chrome.runtime.sendMessage({
            action: 'newTab',
            taburl: document.querySelector('.pic a').href + '&from=taotry'
        });
        chrome.runtime.sendMessage({
            action: 'question',
            keyword: keyword
        });
        var myTimer=setInterval(function(){
            chrome.runtime.sendMessage({
                action: 'getAnswer'
            }, function(response) {
                if(response.answer){
                    answer=response.answer;
                    clearInterval(myTimer);
                    document.querySelector('#J_AnswerInput').value=answer;
                    document.querySelector('.try-detail-buy').dispatchEvent(evt);
                    setTimeout(function(){
                        if(answer=='找不到答案' || document.querySelector('.detail-error')){
                            chrome.runtime.sendMessage({
                                action: "notify",
                                title: 'TaoTry',
                                msg: '自动获取答案失败，请手动输入！'
                            });
                        }
                        document.querySelector('.try-btn-submit').dispatchEvent(evt);
                        setTimeout(function(){
                            if(document.querySelector('.fy-icon')){
                                chrome.runtime.sendMessage({
                                    action: "closeTab"
                                });
                            }
                        },1000);
                    },1000);
                }
                else{
                    chrome.runtime.sendMessage({
                        action: "notify",
                        title: 'TaoTry',
                        msg: '自动获取答案失败，请手动输入！'
                    });
                }
            });
        }, 1000);
    });
}
