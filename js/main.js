$(window).on('load', function(){

    /* 
        Making Global variable
        Availability: to ALL
    */
    var slider_mag = 100;
    var preset_top_text = $('#top_text')[0].innerHTML;
    var typewriter_execute = false;
    var currentFont = {}

    /*
        Making Global Font Object
    */
    var fontList = {
        'index_lg': {
            'overlay-content-title': 30,
            'overlay-content-desc': 12
        },
        'index_sm': {
            'overlay-content-title': 15,
            'overlay-content-desc': 8
        },
        'about_lg': {
            'about_header': 30,
            'about_desc': 15
        },
        'about_sm': {
            'about_header': 20,
            'about_desc': 10
        },
        'photo_lg': {
            'gallery-title': 35,
            'photo-title': 25,
            'photo-desc': 12,
            'overlay-content-title': 35
        },
        'photo_sm': {
            'gallery-title': 25,
            'photo-title': 18,
            'photo-desc': 8,
            'overlay-content-title': 25
        },
        'port_lg': {

        },
        'port_sm': {

        },
        'contact_lg': {

        },
        'contact_sm': {

        }
    }
    /*
        Making Global Font Style for Theme
    */
    fontFamily = {
        1: "'Indie Flower', cursive",
        2: "'Fascinate Inline', cursive",
        3: "'Pacifico', cursive"
    }
    
    const setFont = function(num){
        $('body').css({fontFamily: `${fontFamily[num]}`})
    }
    //Initializing font style
    setFont(1);

    /*
        Making Global Theme setup
        Things I would like to change"
        1. mainNav and setting's background color and font color within
        2. footer background color and hovering color on icon
    */
    colorTheme = {
        1: {
            'num': 1,
            'mainNav':{
                'backgroundColor': 'rgb(233, 221, 221)', //include collapse link bar
                'color': 'rgba(0, 0, 0, 0.8)' //include top_text
            },
            'link_icon_btn_i': 'rgba(0, 0, 0, 0.8)', // uncollapse link icon
            'setting_icon': 'rgba(0, 0, 0, 0.8)', //setting icon
            'linkbar_col_btn': 'rgba(0, 0, 0, 0.8)', //collapse link button
            'settings':{
                'backgroundColor': 'rgb(211, 230, 211)', //not changing slider handle
                'color': 'rgba(0, 0, 0, 0.8)'//changes all the word inside setting
            },
            'theme_btn': 'rgba(240,95,64,0.9)',
            'footer_area':{
                'backgroundColor': 'rgb(233, 221, 221)', //include collapse link bar
            },
            'link_box_border': 'rgba(0, 0, 0, 0.8)',
            'link_box_i': 'rgba(0, 0, 0, 0.8)'
                     
        },
        2: {
            'num': 2,
            'mainNav':{
                'backgroundColor': 'url("img/Theme/2/nav_footer.jpg") left bottom fixed', //include collapse link bar
                'color': 'white' //include top_text
            },
            'link_icon_btn_i': 'white', // uncollapse link icon
            'setting_icon': 'white', //setting icon
            'linkbar_col_btn': 'white', //collapse link button
            'settings':{
                'backgroundColor': 'url("img/Theme/2/setting.jpg") left bottom fixed', //not changing slider handle
                'color': 'rgba(0, 0, 0, 0.8)'//changes all the word inside setting
            },
            'theme_btn': 'grey',
            'linkbar_col_btn': 'white',
            'footer_area':{
                'backgroundColor': 'url("img/Theme/2/nav_footer.jpg") left bottom fixed', //include collapse link bar
            },
            'link_box_border': 'white',    
            'link_box_i': 'white'     
        },
        3: {
            'num': 3,
            'mainNav':{
                'backgroundColor': 'url("img/Theme/3/nav_footer.jpg") left bottom fixed', //include collapse link bar
                'color': 'rgba(0, 0, 0, 0.8)' //include top_text
            },
            'link_icon_btn_i': 'rgba(0, 0, 0, 0.8)', // uncollapse link icon
            'setting_icon': 'rgba(0, 0, 0, 0.8)', //setting icon
            'linkbar_col_btn': 'rgba(0, 0, 0, 0.8)', //collapse link button
            'settings':{
                'backgroundColor': 'url("img/Theme/3/setting.jpg") left bottom fixed', //not changing slider handle
                'color': 'black'//changes all the word inside setting
            },
            'theme_btn': 'rgb(13, 255, 241)',
            'linkbar_col_btn': 'black',
            'footer_area':{
                'backgroundColor': 'url("img/Theme/3/nav_footer.jpg") left bottom fixed', //include collapse link bar
            },
            'link_box_border': 'black',
            'link_box_i': 'black'
                 
        }
    }

 

    /*
        Function that loads the main color theme provided
    */
    const loadColorTheme = function(options){
        //load the mainNav
        $('#mainNav').css({
            'background': `${options.mainNav.backgroundColor}`,
            'color': `${options.mainNav.color}`
        });
        //load the link icon btn, setting icon btn, and linkbar col btn
        $('.link_icon_btn i').css({color: `${options.link_icon_btn_i}`});
        $('#setting_icon').css({color: `${options.setting_icon}`});
        $('.linkbar_col_btn span').css({color: `${options.linkbar_col_btn}`});
        //load the settings
        $('#settings').css({
            'background': `${options.settings.backgroundColor}`,
            'color': `${options.settings.color}`
        });
        //load the footer
        $('#footer_area').css({'background': `${options.footer_area.backgroundColor}`});
        $('.link_box i').css({color: `${options.link_box_i}`});
        $('.link_box').css({borderColor: `${options.link_box_border}`});
        
        //highlight the theme button
        $(`.color_choice.${options.num}`).css({'background': `${options.theme_btn}`})
    }
    //Init Load Color Theme
    loadColorTheme(colorTheme[1]);
 
   /*
        Making Front Page Main body setup
        Just a variable to change the background color
    */
    const indexColorTheme = {
        1: {'background': 'rgba(240,95,64,.9)', 'color': 'white'},
        2: {'background': 'rgba(0,0,0,.9)', 'color': 'white'},
        3: {'background': 'rgba(13, 255, 241, 0.8)', 'color': 'rgba(0, 0, 0, 0.8)'}
    }
    /*
        Function that loads the main body color theme provided
    */
    const loadIndexColorTheme = function(options){
        //load the mainNav
        $('.overlay').css({
            'background': `${options.background}`,
            'color': `${options.color}`
        });
    }
    //Init Load Color Theme
    if ($(window)[0].location.href.includes('index.html')){
        loadIndexColorTheme(indexColorTheme[1]);
    }
    

    /*
        Function that resize the word in the main body
        based on the object you passed in it
    */
    const resizeFont = function(){
        for (let item in currentFont){
            $(`.${item}`).css({fontSize: `${currentFont[item]*slider_mag/100}px`});
        }
    }

    /*
        Initialize website's font
    */
    function initFont(){
        if ($(window)[0].location.href.includes('index.html')){
            if ($(window).width() > 768) {
                currentFont = fontList.index_lg;
            } else{
                currentFont = fontList.index_sm;
            }
        }
        if ($(window)[0].location.href.includes('aboutme.html')){
            if ($(window).width() > 768) {
                currentFont = fontList.about_lg;
            } else{
                currentFont = fontList.about_sm;
            }
        }
        if ($(window)[0].location.href.includes('photoalbum.html')){
            if ($(window).width() > 768) {
                currentFont = fontList.photo_lg;
            } else{
                currentFont = fontList.photo_sm;
            }
        }
        
        resizeFont();
    }
    initFont();


    /*
        slider JQuery UI
        Availability: to ALL
    */
    $('#slider').slider({
        orientation: "horizontal",
        range: false,
        min: 100,
        max: 150,
        value: 100,
        step: 1,
        animate: true,
        slide: function(event, ui){
            $("#size_field").text(ui.value);
            slider_mag = ui.value;
            resizeFont();
        }
    });

    /* 
        Function that types out word on element
        Availability: to ALL
    */
    var animateText = function(element, str){ 
        var i = 0, 
            text;
            if (!typewriter_execute){
                typewriter_execute = true;
                (function type() { 
                    text = str.slice(0, ++i); 
                    element.innerHTML = text; 
                    if (text === str) return; 
                    setTimeout(type, 70);
                }()); 
            }
    }

    /*
        Anime the text at the beginning of load
        Availability: to ALL
    */
    animateText($('#top_text')[0], preset_top_text);
    
    /*
        toggle the setting bar when I press the setting button
        Availability: to ALL
    */
    $('.setting_icon_btn').on('click', function(){
        $('#settings').slideToggle("slow");
    });

    /* 
        toggle the collapsable link bar when I click on the menu button 
        Availability: to ALL except front page
    */
    $('#menu_btn').on('click', function(){
        $('#linkbar_collapse').slideToggle("slow");
    });

    /*
        change the theme color scheme between the 3 choices when clicked on
        Availability: to ALL
    */
    $('.color_choice').on('click', function(e){
        /*resetting the color and then just giving the color the one clicked*/
        $('.color_choice')[0].style.backgroundColor = "transparent";
        $('.color_choice')[1].style.backgroundColor = "transparent";
        $('.color_choice')[2].style.backgroundColor = "transparent";

        //set font
        setFont(e.currentTarget.innerHTML);
        //set color theme
        loadColorTheme(colorTheme[e.currentTarget.innerHTML]);
        //set index color theme if it is index.html
        if ($(window)[0].location.href.includes('index.html')){
            loadIndexColorTheme(indexColorTheme[e.currentTarget.innerHTML]);
        }
    });

    /*
        Set some Global variable for the top text
        Availability: to ALL except front page
    */
    const top_text_object ={
        'about': 'To: About Me',
        'photo': 'To: Photo',
        'portfolio': 'To: Portfolio',
        'contact': 'To: Contact',
    };

    /*
        Change the top word text down when I hover over the link icon
        Availability: to ALL except front page
    */
    $('.link_icon_btn').on('mouseover', function(e){
        setTimeout(function(){
            if ((e.target.id === 'about_icon') && !($(window)[0].location.href.includes('aboutme.html'))){
                animateText($('#top_text')[0], top_text_object.about);
            } else if ((e.target.id === 'photo_icon') && !($(window)[0].location.href.includes('photoalbum.html'))){
                animateText($('#top_text')[0], top_text_object.photo);
            } else if ((e.target.id === 'portfolio_icon') && !($(window)[0].location.href.includes('portfolio.html'))){
                animateText($('#top_text')[0], top_text_object.portfolio);
            } else if ((e.target.id === 'contact_icon') && !($(window)[0].location.href.includes('contact.html'))){
                animateText($('#top_text')[0], top_text_object.contact);
            }
        }, 500);
        typewriter_execute = false;
    });

    /* 
        reset top_text if mouse leave main_nav 
        Availability: to ALL except front page
    */
    $('#mainNav').on('mouseleave', function(){
        setTimeout(function(){
            if (($('#top_text')[0].innerHTML != preset_top_text) && !($(window)[0].location.href.includes('index.html'))){
                animateText($('#top_text')[0], preset_top_text);
            }
        }, 500);
        typewriter_execute = false;
    });
   
    $(window).on('resize', function(){
        
        /*Hide the menu bar to prevent showing up when screen is > 768*/
        if ($(window).width() > 768) {
            $('#linkbar_collapse').hide();
            if (($(window)[0].location.href.includes('index.html')) && (currentFont != fontList.index_lg)){
                currentFont = fontList.index_lg;
                resizeFont();
            }
            if (($(window)[0].location.href.includes('aboutme.html')) && (currentFont != fontList.about_lg)){
                currentFont = fontList.about_lg;
                resizeFont();
            }    
            if (($(window)[0].location.href.includes('photoalbum.html')) && (currentFont != fontList.photo_lg)){
                currentFont = fontList.photo_lg;
                resizeFont();
            }       
        }
        
        if ($(window).width() < 768) {
            if (($(window)[0].location.href.includes('index.html')) && (currentFont != fontList.index_sm)){
                currentFont = fontList.index_sm;
                resizeFont();
            }
            if (($(window)[0].location.href.includes('aboutme.html')) && (currentFont != fontList.about_sm)){
                currentFont = fontList.about_sm;
                resizeFont();
            }
            if (($(window)[0].location.href.includes('photoalbum.html')) && (currentFont != fontList.photo_sm)){
                currentFont = fontList.photo_sm;
                resizeFont();
            } 
        }

    });


});




