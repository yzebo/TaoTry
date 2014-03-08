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
    //window.addEventListener('load', function(){
    var zTimer=setInterval(function(){
        var keyword=document.querySelector("#J_Question em").innerText;
        if(keyword){
            clearInterval(zTimer);
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
                                    title: document.querySelector('.current').innerText,
                                    msg: '自动获取答案失败，请手动输入！'
                                });
                            }
                            if(!document.querySelector('.try-btn-submit') && document.querySelector('.error')){
                                chrome.runtime.sendMessage({
                                    action: "notify",
                                    title: document.querySelector('.current').innerText,
                                    msg: '提交试用申请失败，今日申请次数已达上限！'
                                });
                            }
                            else{
                                setTimeout(function(){
                                    document.querySelector('.try-btn-submit').dispatchEvent(evt);
                                },300);
                            }
                            setTimeout(function(){
                                if(document.querySelector('.fy-icon')){
                                    chrome.runtime.sendMessage({
                                        action: "success"
                                    });
                                }
                            },800);
                        },500);
                    }
                });
            }, 1000);   //myTimer end
        }
    },300);     //zTimer end
}
