/**
 * Created by antonkorchagin on 06.02.15.
 */

var $ = require('jquery');

var Header = require('../core/views/header')
  , Todo = require('../core/views/todo');

//var todo = new Todo();

Header.render();
Todo.render();