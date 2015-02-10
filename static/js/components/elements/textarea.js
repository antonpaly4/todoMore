/**
 * Created by antonkorchagin on 08.02.15.
 */

var $ = require('jquery');

$(document)
  .on('focus', 'textarea', function(){
    $(this).addClass('active');
  })
  .on('blur', 'textarea', function(){
    var $el = $(this)
      , val = $.trim($el.val());
    if(!val.length){
      $el.removeClass('active');
    }
  })
;