/**
 * Created by antonkorchagin on 08.02.15.
 *
 * Language module
 * Change the App language
 */

var $ = require('jquery')
  , _ = require('underscore')
  , date = require('../helpers/date')
  , ru = require('../i18n/ru/locale.json')
  , en = require('../i18n/en/locale.json');

var elClass = '.js-translateble';

function _getElements(){
  var elements = $(elClass)
    , result = {};

  result.translateble = $.map(elements, function(el){
    if($(el).data('localeSection') !== 'needCalculate') return el;
  });

  result.calculateble = $.map(elements, function(el){
    if($(el).data('localeSection') == 'needCalculate') return el;
  });

  return result;
}

function _translate(elements, lang){

  _.each(elements, function(el){
    var $el = $(el)
      , section = $el.data('localeSection')
      , word = lang[section][$el.data('localeName')];

    if(section == 'placeholders'){
      $el.attr('placeholder', word)
    }
    else {
      $el.text(word);
    }
  });
}


function _calculate(elements, lang){
  _.each(elements, function(el){
    var $el = $(el)
      , data = $el.data()
      , type = data.localeCalculate
      , value = data[type]
      , text;
    switch (type){
      case 'day':
        text = date.localize(value, lang);
        break;
    }
    $el.text(text)
  });
}

$(document).on('click', '.js-change-language', function(e){
  e.preventDefault();

  var lang = $(this).data('lang')
    , elements = _getElements()
    , locale = lang == 'ru' ? ru : en;

  _translate(elements.translateble, locale);
  _calculate(elements.calculateble, lang);

  state.locale = lang;
});