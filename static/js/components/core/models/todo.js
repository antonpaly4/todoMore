/**
 * Created by antonkorchagin on 05.02.15.
 */

var Backbone = require('backbone');

var TodoModel = Backbone.Model.extend({
  defaults: {
    startDate: '',
    finishDate: '',
    type: '',
    title: '',
    description: ''
  }
});

module.exports = TodoModel;