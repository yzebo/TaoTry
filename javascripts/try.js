function editList(){
    var photo=document.querySelectorAll(".try-list-content .photo a");
    var btn=document.querySelectorAll(".try-list-content .free-try");
    if(btn[0].innerText.charAt(btn[0].innerText.length-1)!='√'){
        for(var i=0;i<photo.length;i++){
            photo[i].href += '&from=taotry';
            btn[i].href += '&from=taotry';
            btn[i].innerText += "√";
        }
    }
}

window.addEventListener('load', function(){
    //taobao try homepage
    setTimeout(function(){
        var items=document.querySelectorAll(".info .link");
        if(items){
            for(var i=0;i<items.length;i++){
                items[i].href += '&from=taotry';
                items[i].innerText += "√";
            }
        }
    }, 1000);

    //taobao try list
    setTimeout(function(){
        var scroller=document.querySelectorAll(".scroller .free-try");
        if(scroller){
            for(var i=0;i<scroller.length;i++){
                scroller[i].href += '&from=taotry';
                scroller[i].innerText += "√";
            }
        }
        editList();
    }, 1000);

    //taobao try brand
    setTimeout(function(){
        var btn=document.querySelectorAll('.ui-goods-buy a');
        if (btn) {
            for(var i=0;i<btn.length;i++){
                btn[i].href += '&from=taotry';
                btn[i].innerText += "√";
            }
        };
    }, 1000);
});

//try list next page
var count=0;
document.querySelector(".try-list-content").addEventListener("DOMNodeInserted", function(e) {
    count++;
    if(count==16){
        editList();
        count=0;
    }
}, false);