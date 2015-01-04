var Children = require('../collections/children');

var AAS = {};

AAS.children = new Children();

// Populate the collection
$.getJSON('data/cps-reports.json', function(data) {
  AAS.children.reset(data);
});

module.exports = AAS;
