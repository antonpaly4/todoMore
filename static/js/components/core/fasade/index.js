/**
 * Created by antonkorchagin on 08.02.15.
 */

var $ = require('jquery');

var TodoCollection = require('../collections/todo');

var $window = $(window);

$window.on('Todo:add', function(e, data){
  TodoCollection.add(data);
});