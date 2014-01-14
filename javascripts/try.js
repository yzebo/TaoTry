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
    setTimeout(function(){
        var items=document.querySelectorAll(".info .link");     //homepage
        var scroller=document.querySelectorAll(".scroller .free-try");  //list page
        var brand=document.querySelectorAll('.ui-goods-buy a');     //brand page
        var btn=items.length?items:scroller;
        btn=btn.length?btn:brand;
        if(btn){
            for(var i=0;i<btn.length;i++){
                btn[i].href += '&from=taotry';
                btn[i].innerText += "√";
            }
        }
        if(scroller){
            editList();
            //try list next page
            var count=0;
            document.querySelector(".try-list-content").addEventListener("DOMNodeInserted", function(e) {
                count++;
                if(count==16){
                    editList();
                    count=0;
                }
            }, false);
        }
    }, 1000);
});