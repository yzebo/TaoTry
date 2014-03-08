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

if(para.from){
    window.addEventListener('load', function(){
        var userbox=document.querySelector('#TPL_username_1');
        var pwdbox=document.querySelector('#TPL_password_1') || document.querySelector('#J_PwdV');;
        var submitbtn=document.querySelector('#J_SubmitStatic') || document.querySelector('#J_VerifySubmit');
        var issafe=document.getElementById('J_SafeLoginCheck');
        var checkcode=document.getElementsByName("need_check_code")[0];
        var codebox=document.querySelector('#J_CodeInput_i');
        var errorname=document.querySelector('.error a');

        if(issafe && issafe.checked){
            issafe.checked=false;       //not use safe login control
        }
        chrome.runtime.sendMessage({
            action: "getValue"
        }, function(response) {
            userbox.value=response.user;
            pwdbox.value=response.pwd;
            if(checkcode.value!='yes'){
                submitbtn.click();
            }
            else{
                chrome.runtime.sendMessage({
                    action: "loginCode"
                });
                codebox.focus();
            }
        });
    });
}