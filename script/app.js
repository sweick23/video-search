function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

$(function() {
    $("form").on("submit", function(e) {
       e.preventDefault();
       
        var q = $('.alt-search').val();
        var a = $('#search').val();
        
       var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video", 
           q: a,
            maxResults: 5,
            order: "viewCount",
            publishedAfter: "2015-01-01T00:00:00Z"
       }); 
     var firstRequest = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video", 
           q: q,
            maxResults: 5,
            order: "viewCount",
            publishedAfter: "2015-01-01T00:00:00Z"
       }); 
     
       
       firstRequest.execute(function(response) {
          var results = response.result;
          $("#results").html("");
          $.each(results.items, function(index, item) {
            $.get("tpl/item.html", function(data) {
                $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
            });
          });
          resetVideoHeight();
       }); 
       });
       
       request.execute(function(response) {
          var results = response.result;
          $("#results").html("");
          $.each(results.items, function(index, item) {
            $.get("tpl/item.html", function(data) {
                $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
            });
          });
          resetVideoHeight();
       }); 

    
   

    
    $(window).on("resize", resetVideoHeight);
});


  

function resetVideoHeight() {
    $(".video").css("height", $("#results").width() * 9/16);
}

function init() {
    gapi.client.setApiKey("AIzaSyDSLrMdp5tl62sLQIk4k2xLSezeCFzK87U");
    gapi.client.load("youtube", "v3", function() {
        
    });
}



$('.altSearch').click(function(){
    $('.center').hide();
    $('#search').fadeIn();
    $('h1').fadeIn();
    $('.sub').fadeIn();
   $('.remove').show();
    $('.space').hide();
    $('p').hide();
});

$('h1').click(function(){
    $('.center').show();
    $('#search').fadeOut();
    $('h1').fadeOut();
    $('.sub').fadeOut();
   $('.remove').hide();
    $('.space').show();
    $('p').show();
});



$('.alt-search').mouseenter(function(){
    $('.alt-search').addClass('flash');
});

$('.alt-search').mouseleave(function(){
    $('.alt-search').removeClass('flash');
});


$('.sub').click(function(){
    $('.remove').show();
   
});
$('.home').click(function(){
    $('.remove').hide();
    $('.sub').hide();
    $('h1').hide();
    $('.center').show();
    $('.space').show();
     $('#search').hide();
})


