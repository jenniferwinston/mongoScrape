// grab article in json
$.getJSON('/articles', function(data){
	for( var i=0; i < data.length; i++){
		//write to html
		$('#articles').append('<p data-id="' + data[i]._id + '">' + data[i].title + '<br/>' + data[i].link + '</p>');
	}
});


// on click for paragraph
$(document).on('click', 'p', function(){
	$('#notes').empty();
	var thisId = $(this).attr('data-id');

	$.ajax({
		method: "GET",
		url: "/articles/" + thisId,
	})
	.done(function(data){
		console.log(data);
		//post info from article to html
		$('#notes').append('<h2 class="noteTitle">' + data.title + '</h2>');
		$('#notes').append('<input id="titleinput" name="title" placeholder="Message Title">');
		$('#notes').append('<textarea id="bodyinput" name="body" placeholder="Message"></textarea>');
		$('#notes').append('<button data-id="' + data._id + '"id="savenote">Save Note</button>');

		if(data.note){
			$('#titleinput').val(data.note.title);
			$('#bodyinput').val(data.note.body);
		}
	});
});

// save note on click
$(document).on('click', '#savenote', function(){
	var thisId = $(this).attr('data-id');

	//post reqest
	$.ajax({
		method: "POST",
		url: "/articles/" + thisId,
		data: {
			title: $('#titleinput').val(),
			body: $('#bodyinput').val()
		}
	})
	.done(function(data){
		console.log(data);
		$('#notes').empty();
	});

	$('#titleinput').val("");
	$('#bodyinput').val("");
});






