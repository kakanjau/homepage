$(function(){
    var dialogHeight = $(window).height()-200;
    var dialogWidth = $(window).width()-200;
    $('#dialog').dialog({
        resizable: false,
        height: dialogHeight,
        width: dialogWidth,
        modal: true,
        autoOpen: false,
        buttons: {
            "Preview" : function(){
                $('#preview pre').html(markdown.toHTML($('#container textarea').val()));
            },
            "Submit" : function(){
                $('#add_artist').submit();
            },
            "Cancel" : function(){
                $(this).dialog("close");
            }
        },
        open: function(){
            var textareaHeight = dialogHeight-350;
            var textareaWidth = $(this).find('#container').width(); 
            
            $(this).find('#introPanel textarea').css('resize', 'none').innerHeight(100).innerWidth(textareaWidth);
            $(this).find('#container textarea').css('resize', 'none').innerHeight(textareaHeight).innerWidth(textareaWidth);
            $(this).find('pre').innerHeight(textareaHeight+100).innerWidth(textareaWidth);
        }
    });

    $('#addArtistBtn').click(function(){
         $('#dialog').dialog('open');
     });
});