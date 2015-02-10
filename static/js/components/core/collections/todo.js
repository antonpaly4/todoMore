/**
 * Created by antonkorchagin on 05.02.15.
 */

var Backbone = require('backbone')
  , moment = require('moment')
  , Model = require('../models/todo');

var TodoCollection = Backbone.Collection.extend({
  model: Model


});

var collection = new TodoCollection();

module.exports = collection;