/**
 * Created by antonkorchagin on 06.02.15.
 */

var $ = require('jquery');

$(document)
  .on('click', '.js-checkbox', function(){
    $(this).toggleClass('checked');
  });