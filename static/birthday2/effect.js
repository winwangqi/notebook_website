function whenReady() {
  $('.loading').fadeOut('fast');
  $('.container').fadeIn('fast');
  $('#shine-star').fadeIn('fast')
}

$(window).load(whenReady)


$('document').ready(function(){
  $('#turn_on').click(function(){
    var $video = $('#open-light-video')
    var $this = $(this)

    $this.fadeOut('slow')

    $video.show()
    $video.get(0).play()
    $video.one('ended', function() {
      $video.hide()
      $('#colorful-light').show()
      $('body').addClass('peach');
      $('#shine-star').hide()
      // .delay(1000).promise().done(function(){
      //   $('#play').fadeIn('slow');
      // });

      var audio = $('.song')[0];
      audio.play();
      $('body').css('backgroud-color','#FFF');
      $('body').addClass('peach-after');

      $(this).fadeOut('slow').delay(3000).promise().done(function(){
        $('#bannar_coming').fadeIn('slow');
      });
    })
  });
  $('#play').click(function(){
    var audio = $('.song')[0];
    audio.play();
    $('body').css('backgroud-color','#FFF');
    $('body').addClass('peach-after');

    $(this).fadeOut('slow').delay(3000).promise().done(function(){
      $('#bannar_coming').fadeIn('slow');
    });
  });

  $('#bannar_coming').click(function(){
    $('.bannar').show().addClass('bounceInDown');
    $(this).fadeOut('slow').delay(3000).promise().done(function(){
      $('#balloons_flying').fadeIn('slow');
    });
  });

  $('#balloons_flying').click(function(){
    $('#fly-balloons').addClass('animation')

    setTimeout(function() {
      $('#visible-balloons').addClass('s1')
    }, 2500)

    $(this).fadeOut('slow').delay(5500).promise().done(function(){
      $('#cake_fadein').fadeIn('slow');
    });
  });

  $('#cake_fadein').click(function(){
    $('.cake-container').show();
    $('.pao').addClass('show')
    $(this).fadeOut('slow').delay(3000).promise().done(function(){
      $('#light_candle').fadeIn('slow');
    });
  });

  $('#light_candle').click(function(){
    $('.velas').addClass('light');
    $('#flower').show()
    $('.pao').addClass('fire')
    $('#visible-balloons').addClass('s2')

    setTimeout(function() {
      $('#visible-balloons > div div').fadeIn('slow')
    }, 3000)

    $(this).fadeOut('slow').delay(5000).promise().done(function(){
      // $('#wish_message').fadeIn('slow');
      $('#story').fadeIn('slow');
    });
  });


  // $('#wish_message').click(function(){
  // 	$(this).fadeOut('slow').delay(3000).promise().done(function(){
  // 		$('#story').fadeIn('slow');
  // 	});
  // });

  $('#story').click(function(){
    $(this).fadeOut('slow');

    $('.bannar').addClass('shrink')
    $('.cake-container').addClass('shrink')

    $('.message').fadeIn('slow');

    var $plist = $('#msg-list p')

    var len = $plist.length

    function msgLoop (i) {
      $plist.eq(i).fadeIn('slow').delay(1500).promise().done(function(){
        $plist.eq(i).fadeOut('slow').delay(600).promise().done(function() {
          i= i + 1;
          if (i === len) {
            $('.bannar').addClass('reset')
            $('.cake-container').addClass('reset')
            $('#visible-balloons').addClass('s3')
            $('#visible-balloon1 .wrapper').addClass('balloons-rotate-behaviour-one')
            $('#visible-balloon2 .wrapper').addClass('balloons-rotate-behaviour-two')
            $('#visible-balloon3 .wrapper').addClass('balloons-rotate-behaviour-one')
            $('#visible-balloon4 .wrapper').addClass('balloons-rotate-behaviour-two')
            $('#visible-balloon5 .wrapper').addClass('balloons-rotate-behaviour-one')
            $('#visible-balloon6 .wrapper').addClass('balloons-rotate-behaviour-two')
            $('#visible-balloon7 .wrapper').addClass('balloons-rotate-behaviour-one')
            $('#visible-balloon8 .wrapper').addClass('balloons-rotate-behaviour-two')
            return
          }
          msgLoop(i);
        })
      });
      // body...
    }

    msgLoop(0);

  });
});




//alert('hello');
