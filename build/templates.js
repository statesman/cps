var glob = ('undefined' === typeof window) ? global : window,

Handlebars = glob.Handlebars || require('handlebars');

this["JST"] = this["JST"] || {};

this["JST"]["childpopup"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<p><strong>Age:</strong> "
    + escapeExpression(((helper = (helper = helpers.age || (depth0 != null ? depth0.age : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"age","hash":{},"data":data}) : helper)))
    + "</p>\n<p><strong>Date of death:</strong> "
    + escapeExpression(((helper = (helper = helpers.dod || (depth0 != null ? depth0.dod : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"dod","hash":{},"data":data}) : helper)))
    + "</p>\n<p><strong>Cause of death:</strong> "
    + escapeExpression(((helper = (helper = helpers.cod || (depth0 != null ? depth0.cod : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"cod","hash":{},"data":data}) : helper)))
    + "</p>\n<ul class=\"list-inline\">\n  <li><a href=\"docs.html?doc="
    + escapeExpression(((helper = (helper = helpers.dc_id || (depth0 != null ? depth0.dc_id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"dc_id","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\"><i class=\"fa fa-file-text\"></i> Read report</a></li>\n  <li><a href=\"#\"><i class=\"fa fa-area-chart\"></i> View in database</a></li>\n</ul>\n";
},"useData":true});

if (typeof exports === 'object' && exports) {module.exports = this["JST"];}