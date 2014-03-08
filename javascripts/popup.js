$(document).ready(function() {
    restoreOptions();
    bindAction();
});

function bindAction() {
    $('#home').on('click',function(){
        chrome.extension.getBackgroundPage().Login("http://try.taobao.com");
        return false;
    });
}

function restoreOptions() {
    if (localStorage['inform'] == 'true') {
        $('#inform').prop('checked','checked');
    }
}

function saveOptions() {
    localStorage['inform'] = $('#inform').is(":checked");
}
