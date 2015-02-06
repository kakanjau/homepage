$(function(){
    $('#dialog .categoryList a').click(function(){
        var me = $(this);
        $('#category').val(me.text());
    });

    $('#dialog').on('show.bs.modal', function(e){
        var me = $(this);
        me.find('input').not(':button, :submit, :reset').val('');
        me.find('textarea').val('');
        me.find('#preview').html('').hide();
    });

    $('#dialog #saveBtn').click(function(){
        $('#add_artist').submit();
    });

    $('#dialog #previewBtn').click(function(){
        $('#dialog #preview').width($('#dialog #container').width()).html(markdown.toHTML($('#container textarea').val())).toggle();
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
                $('#dialog').modal();
                $('#dialog #_id').val(blog._id);
                $('#dialog #title').val(blog.blogName);
                $('#dialog #intro').val(blog.intro);
                $('#dialog #text').val(blog.text);
                $('#dialog #category').val(blog.category);
            }
        });
    });
});