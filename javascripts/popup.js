$(document).ready(function() {
    restoreOptions();
    bindAction();
});

function bindAction() {
    $('#home').on('click',function(){
        chrome.extension.getBackgroundPage().Login("http://try.taobao.com");
        return false;
    });
    $('#inform').on('click',function(){
        localStorage['inform'] = $('#inform').is(":checked");
    });
}

function restoreOptions() {
    var today=(new Date).getDate();
    var lastday=localStorage['lastday'] || 0;
    if(today==lastday){
        $('#num').text(localStorage['num'] || 0);
        if(parseInt($('#num').text())>=15){
            $('small').text('今天申请次数已达上限');
        }
        else{
            $('small').text('可以继续申请试用');
        }
    }
    else{
        localStorage['num'] = 0;
        $('#num').text(0);
        $('small').text('今天还没申请试用');
    }
    if (localStorage['inform'] == 'true') {
        $('#inform').prop('checked','checked');
    }
}

function saveOptions() {
    localStorage['inform'] = $('#inform').is(":checked");
}
