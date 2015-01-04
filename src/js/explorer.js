window.jQuery = window.$ = require('jquery');

var AAS = require('./lib/aas'),
    Overview = require('./views/overview')

var overview = new Overview({
  collection: AAS.children,
  el: '#explorer'
});
