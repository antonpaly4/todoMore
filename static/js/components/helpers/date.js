/**
 * Created by antonkorchagin on 06.02.15.
 */

var moment = require('moment');

var ru = require('../i18n/ru/locale.json')
  , en = require('../i18n/en/locale.json');

/**
 * Get 7 days from given date
 * @param date new Date
 * @returns array
 * @private
 */
function _getWeek(date){
  var week = [moment(date).format('YYYY-MM-DD')];
  var day = date;
  for(var i = 1; i < 7; i++){
    var next = moment(day).add(1, 'd').format('YYYY-MM-DD');
    week.push(next);
    day = next;
  }
  return week;
}

function _getLocalizedDay(date, locale){
  var lang = locale == 'ru' ? ru : en;
  moment.locale(locale);
  var result;
  if(moment().format('D.M.YYYY') == moment(date).format('D.M.YYYY')){
    result = lang.dates.today + ', ' + moment(date).format('D MMMM YYYY');
  }
  else if(moment().add(1, 'd').format('D.M.YYYY') == moment(date).format('D.M.YYYY')){
    result = lang.dates.tomorrow + ', ' + moment(date).format('D MMMM YYYY');
  }
  else if(moment().add(-1, 'd').format('D.M.YYYY') == moment(date).format('D.M.YYYY')){
    result = lang.dates.yesterday + ', ' + moment(date).format('D MMMM YYYY');
  }
  else{
    result = moment(date).format('dddd, D MMMM YYYY');
  }
  return result;
}

function _prepareDate(date){
  var result, splitDate;
  if(state.locale == 'ru'){
    splitDate = date.split('.');
    splitDate[0] = parseInt(splitDate[0]) < 10 ? '0' + splitDate[0] : splitDate[0];
    splitDate[1] = parseInt(splitDate[1]) < 10 ? '0' + splitDate[1] : splitDate[1];

    result = splitDate.reverse().join('-');
  }
  else if(state.locale = 'en'){
    splitDate = date.split('/');

    var month = splitDate[0];

    splitDate[0] = parseInt(splitDate[1]) < 10 ? '0' + splitDate[1] : splitDate[1];
    splitDate[1] = parseInt(month) < 10 ? '0' + month : month;

    result = splitDate.reverse().join('-');
  }

  return result;
}

module.exports = {
  week: _getWeek,
  localize: _getLocalizedDay,
  prepare: _prepareDate
}