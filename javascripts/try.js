window.addEventListener('load', function(){
    //taobao try homepage
    setTimeout(function(){
        var items=document.querySelectorAll(".info .link");
        for(var i=0;i<items.length;i++){
            items[i].href += '&from=taotry';
            items[i].innerText += "√";
        }
    }, 1000);

    //taobao try list
    setTimeout(function(){
        var list=document.querySelectorAll(".photo a");
        var btn=document.querySelectorAll(".free-try");
        for(var i=0;i<list.length;i++){
            list[i].href += '&from=taotry';
            btn[i].innerText += "√";
        }
    }, 2000);

    //taobao try brand
    setTimeout(function(){
        var btn=document.querySelectorAll('.ui-goods-buy a');
        for(var i=0;i<btn.length;i++){
            btn[i].href += '&from=taotry';
            btn[i].innerText += "√";
        }
    }, 1000);
});