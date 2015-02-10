'use strict';

require('imports?this=>global!./vendor');

require('./components/core/collections/todo');
require('./components/elements/checkbox');
require('./components/elements/textarea');
require('./components/language/index');

require('./components/core/fasade/index');

var todo = require('./components/dashboard/');