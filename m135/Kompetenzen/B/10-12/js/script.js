$('h1').addClass('red');

$('h2.blue').removeClass('blue').addClass('green');

$('#second').addClass('red');

$('p:first').text('foo');

$('p:last').wrap('<em></em>');

$('ul').append('<li id="four">vierter Listenpunkt</li>');

$('#four').attr('id', 'five');

$('li').each(function() {
    var listItem = $(this);
    var listItemID = listItem.attr('id');
    listItem.append(' <em>' + listItemID + '</em>');
  });

$('li').css('font-size', '30px');

$('li').click(function() {
    $(this).remove();
  });

$('form').submit(function(event) {
    event.preventDefault();
  
    var inputValue = $('form input:first').val();
  
    var listItem = $('<li>').text(inputValue); 
    $('ul').append(listItem);
  });