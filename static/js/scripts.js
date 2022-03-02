(function($){
  $(function(){
    // Smooth Scroll
    $('#learn_more_btn').click(function() {
      $('html, body').animate({
        scrollTop: $("#main_section").offset().top
      }, 800);
    })

    // Word Counter
    $(".context-box-1").keyup(function (e) {
      e.preventDefault()
      var word_count = $(this).text().split(" ").length - 1;
      word_count > 1 ? $('#len_raw_text').text(word_count + ' words') : $('#len_raw_text').text(word_count + ' word');
    });
    
    //Clear Button
    $("#reset-btn").click(function(e) {
      e.preventDefault();      
      $('#content-raw').html("");
      $('#content-summerized').html("");
      $('#len_raw_text').text("0 word")
      $('#words_count').text( "0 word");
      $('#exec_time').text('');
    }) 

    // CopyText Button
    $('#copy_btn').click(function(e) {
      e.preventDefault()
      var count = $('.context-box-2').text().replace(/\s+/g, '').length;

      if (count > 0) {
        const content = $('.context-box-2').text();
        navigator.clipboard.writeText(content);
        const copied = navigator.clipboard.readText();
        copied
        $('#copied').fadeIn('slow', () => {
          $('#copied').fadeOut('slow');
        });
      } else {
        return
      }
    })

    $('#summerized-btn').click(function(e) {
      e.preventDefault();     
      var content = $('.context-box-1').text();
      var count = $('.context-box-1').text().replace(/\s+/g, '').length;
      var dataJson = JSON.stringify({'rawtext': content});
      // Check TextBox is not Blank     
      if (count > 0) {
        $.ajax({
        type: 'POST',
        beforeSend: function() {
          $('#summerized-btn').hide();
          $('#processing-btn').show();
        },
        url: "/summerize",
        dataType: 'json',
        contentType: "application/json",            
        data: dataJson,
        success: function(data) {          
          // data = JSON.parse(data);
          $('.context-box-2').text(data.final_summary_nltk);
          $('#exec_time').text("ET: " + data.final_time + " secs");      
        },
        complete: function(){
          var word_count = $('.context-box-2').text().split(" ").length;          
          $('#summerized-btn').show();
          $('#processing-btn').hide();
          $('#words_count').text(word_count + " words");
        },       
        })
      } else {
        alert('Input some text!');
      }
    });

  }); // end of document ready
})(jQuery); // end of jQuery name space


