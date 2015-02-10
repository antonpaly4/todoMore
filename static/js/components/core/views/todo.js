/**
 * Created by antonkorchagin on 06.02.15.
 *
 * Todo view
 */

var Backbone = require('backbone')
  , _ = require('underscore')
  //, Collection = require('../collections/todo')
  , date = require('../../helpers/date')
  , moment = require('moment')
  , locale = require('../../i18n/' + state.locale + '/locale.json');

// Templates
var dayTpl = require('../../../../templates/todo/day.jade')
  , itemTpl = require('../../../../templates/todo/item.jade');

var TodoView = Backbone.View.extend({

  el: $('#js-container'),

  initialize: function(){

  },

  events: {
    'click .js-day-toggle': '_toggleDay',
    'click .js-list-item-toggle': '_toggleItem'
  },

  _toggleDay: function(e){
    e.preventDefault();
    $(e.target).closest('.js-todo-day-list').toggleClass('active');
  },

  _toggleItem: function(e){
    $(e.target).closest('.js-list-item').toggleClass('active');
  },

  getWeek: function(dayFrom){
    var week = date.week(dayFrom)
      , weekLocale = [];

    for(var key in week){
      weekLocale.push(date.localize(week[key], 'ru'));
    }

    return {unix: week, localized: weekLocale}
  },

  addItem: function(item){
    var startDate = moment(item.startDate).format('YYYY-MM-DD')
      , finishDate = moment(item.finishDate).format('YYYY-MM-DD')
      , listItem = itemTpl({
      itemId: item.id,
      name: item.title,
      type: item.type,
      typeName: locale.todoTypes[item.type],
      description: item.description
    });
    $('#date-' + startDate).find('.js-list-items').append(listItem);
    if(startDate !== finishDate){
      $('#date-' + finishDate).find('.js-list-items').append(listItem);
    }
  },

  render: function(date){
    var day = date || moment()
      , days = this.getWeek(day)
      //, todos = Collection.models
      , self = this
      , html;

    for(var key in days.unix){
      html = dayTpl({
        day: days.unix[key],
        dayTitle: days.localized[key],
        active: moment(days.unix[key]).isSame(moment(), 'day') ? 'active' : ''
      });
      $(this.el).append(html);
    }

    //if(todos.length > 0){
    //  _.each(todos, function(item){
    //    self.addItem(item);
    //  })
    //}
  }

});

var todoView = new TodoView();

$(window).on('Todo:add', function(e, data){
  todoView.addItem(data);
});

module.exports = todoView;