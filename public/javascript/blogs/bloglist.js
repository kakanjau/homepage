$(function(){
	$('#article #showButton').click(function(){
		var article = $(this).parents('#article');
		article.find('#article_detail').show();
		article.find('#article_intro').hide();
		$(this).hide();
		article.find('#hiddenButton').show();
	});

	$('#article #hiddenButton').click(function(){
		var article = $(this).parents('#article');
		article.find('#article_detail').hide();
		article.find('#article_intro').show();
		$(this).hide();
		article.find('#showButton').show();
	});
});