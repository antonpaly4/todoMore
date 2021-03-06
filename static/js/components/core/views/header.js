/**
 * Created by antonkorchagin on 08.02.15.
 */

require('../../elements/form');

var Backbone = require('backbone')
  //, TodoCollection = require('../collections/todo')
  , locale = require('../../i18n/' + state.locale + '/locale.json')
  , moment = require('moment')
  , date = require('../../helpers/date');

// Templates
var todoAddTpl = require('../../../../templates/forms/todo-add.jade');

var $contentHolder = $('.js-header-content')

var HeaderView = Backbone.View.extend({

  el: $contentHolder,

  _formTodo: function(){
    var $place = $(this.el).find('.js-adding-button')
      , placeholdersLocale = locale.placeholders
      , tplData = {
          formClass: 'header-form',
          formAction: 'Todo:add',
          defaultStart: moment().format(state.locale == 'ru' ? 'D.M.YYYY' : 'M/D/YYYY'),
          placeholders: {
            start: placeholdersLocale.startDate,
            finish: placeholdersLocale.finishDate,
            title: placeholdersLocale.todoTitle,
            desc: placeholdersLocale.todoDescription
          },
          types: [
            {type: 'job', typeName: locale.todoTypes.job},
            {type: 'private', typeName: locale.todoTypes.private}
          ],
          buttonText: locale.buttons.add
      }
      , form = todoAddTpl(tplData);

    $place.append(form);

    $('.js-date').datepicker({
      dateFormat: state.locale == 'ru' ? 'd.m.yy' : 'm/d/yy'
    });
  },

  render: function(){
    this._formTodo();
  }

});

var _formToggle = function(e){
  e.preventDefault();
  var $el = $(this).closest('.js-header-button');

  $el.find('.js-form-handler').toggleClass('active');
};

var _formSend = function(form){
  var $formHandler = form.closest('.js-form-handler')
    , action = form.data('action')
    , data = {}
    , data = form.serializeObject();

  data.startDate = date.prepare(data.startDate);
  data.finishDate = date.prepare(data.finishDate);
  data.id = moment();

  $(window).trigger(action, data);
  $formHandler.toggleClass('active');
  form[0].reset();
  return false;
};

$(document)
  .on('click', '.js-form-toggle-button', _formToggle)
  .on('submit', '.js-form', function(e){
    e.preventDefault();

    _formSend($(this));
    return false;
  })
;

module.exports = new HeaderView();