$(function(){
    var dialogHeight = $(window).height()-100;
    var dialogWidth = $(window).width()-200;
    $('#dialog').dialog({
        resizable: false,
        height: dialogHeight,
        width: dialogWidth,
        zIndex: 1050,
        modal: true,
        autoOpen: false,
        buttons: {
            "Preview" : function(){
                $('#preview').html(markdown.toHTML($('#container textarea').val()));
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
            
            $(this).find('#introPanel textarea').css('resize', 'none').innerHeight(100).innerWidth(textareaWidth)
            .val('');
            $(this).find('#container textarea').css('resize', 'none').innerHeight(textareaHeight).innerWidth(textareaWidth)
            .val('');
            $(this).find('#preview').innerHeight(textareaHeight+100).innerWidth(textareaWidth)
            .html('');

            $(this).find('input').not(':button, :submit, :reset').val('');
        }
    });

    $('#dialog .categoryList a').click(function(){
        var me = $(this);
        $('#category').val(me.text())
    });

    $('#addArtistBtn').click(function(){
         $('#dialog').dialog('open');
     });

    $('#blogList .blog-delete').click(function(){
        $.ajax({
            type: 'POST',
            url: '/user/delete',
            data: {_id : $(this).parents('tr').attr('id')},
            success: function(){
                location.reload();
            },
            dataType: 'json'
        });
    });

    $('#blogList .blog-hidden').click(function(){
        $.ajax({
            type: 'POST',
            url: '/user/update/blog_hidden',
            data: {_id: $(this).parents('tr').attr('id')},
            success: function(v){
                location.reload();
            }
        });
    });

    $('#blogList .blog-show').click(function(){
        $.ajax({
            type: 'POST',
            url: '/user/update/blog_show',
            data: {_id: $(this).parents('tr').attr('id')},
            success: function(v){
                location.reload();
            }
        });
    });

    $('#blogList .artist-hidden').click(function(){
        $.ajax({
            type: 'POST',
            url: '/user/update/artist_hidden',
            data: {_id: $(this).parents('tr').attr('id')},
            success: function(v){
                location.reload();
            }
        });
    });

    $('#blogList .artist-show').click(function(){
        $.ajax({
            type: 'POST',
            url: '/user/update/artist_show',
            data: {_id: $(this).parents('tr').attr('id')},
            success: function(v){
                location.reload();
            }
        });
    });

    $('#blogList a').click(function(){
        $.ajax({
            type: 'GET',
            url: '/user/findblog',
            data: {_id: $(this).parents('tr').attr('id')},
            success: function(v){
                var blog = v.blog;
                $('#dialog').dialog('open');
                $('#dialog #_id').val(blog._id);
                $('#dialog #title').val(blog.blogName);
                $('#dialog #intro').val(blog.intro);
                $('#dialog #text').val(blog.text);
                $('#dialog #category').val(blog.category);
            }
        });
    });
});