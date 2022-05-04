$( document ).ready(function() {

    $('.card[id]').click(function() {
        $('<div/>', {
            text: 'Dodano do kolekcji!',
            class: 'notification is-size-6'
        })
        .appendTo($('#jqmw'))
        .fadeOut( 3000, function() {
            $(this).remove();
        });
    })
});


