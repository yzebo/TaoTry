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

if(para.viewfrom){
    window.addEventListener('load', function(){
        chrome.runtime.sendMessage({
            'action': 'keyword'
        }, function(response) {
            var list=document.querySelectorAll('.attributes-list li');
            var ans;
            for (var i = 0; i < list.length; i++) {
                if(list[i].innerHTML.indexOf(response.keyword)>=0){
                    ans=list[i].title;
                }
            };
            if(!ans && response.keyword=='试用品申请成功后需提交'){
                ans='试用报告';
            }
            chrome.runtime.sendMessage({
                action: "answer",
                answer: ans
            });
            if(ans){
                chrome.runtime.sendMessage({
                    action: "closetab"
                });
            }
        });
    });
}