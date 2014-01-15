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
    chrome.runtime.sendMessage({
        'action': 'keyword'
    }, function(response) {
        var arr = {     //normal answer array
            '试用品申请成功后需提交':'试用报告'
        }
        var myTimer=setInterval(function(){
            var ans;
            var attrib=document.querySelectorAll(".attributes-list li");
            for (var i = 0; i < attrib.length; i++) {
                if(attrib[i].innerHTML.indexOf(response.keyword+':')>=0){
                    clearInterval(myTimer);
                    ans=attrib[i].title;
                    break;
                }
            };
            if(attrib.length){
                if(!ans && arr[response.keyword]){
                    ans=arr[response.keyword];
                }
                if(!ans){
                    ans='找不到答案';
                }
                chrome.runtime.sendMessage({
                    action: "answer",
                    answer: ans
                });
                chrome.runtime.sendMessage({
                    action: "closeTab"
                });
            }
        }, 5);
    });
}
