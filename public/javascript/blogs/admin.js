$(function(){
	$('#dialog').dialog({
        resizable: false,
        height: 220,
        modal: true,
        autoOpen: false,
		buttons: {
            "login" : function(){
                $('#admin_login').submit();
            },
            "Cancel" : function(){
                $(this).dialog("close");
            }
        }
	});

    var startAdmin = function(){
        var cur = 0;
        var delayReset = function(){
            setTimeout(function(){
                cur = 0;
            }, 3000);
        }
        return function(step){
            if(cur===step){
                cur = step+1;
                delayReset();
                return cur;
            }else{
                cur = 0;
            }
        }
    }

    var loginCheck = startAdmin();
    $(document).keydown(function(event){
        if(event.shiftKey){
            var k = event.keyCode || event.which;
            switch(k){
                case 65:
                    loginCheck(0);
                    break;
                case 68:
                    loginCheck(1);
                    break;
                case 70:
                    if(3===loginCheck(2)){
                        $('#dialog').dialog('open');
                    }
                    break;
                default:
                    break;
            }
        }
    });
});