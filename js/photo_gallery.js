$(window).on('load', function(){
    
    /*Hide all the .filter*/
    $('.filter').slideUp("slow");
    
    $('.filter-box').on('click', function(e){
        var value = $(this).attr('data-filter');
        if (value === 'all'){
            $('.filter').slideDown("slow");
        } else{
            $(".filter").not(`.${value}`).slideUp("slow");
            $('.filter').filter(`.${value}`).slideDown("slow");
        }
    });

});
