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
    + "\" target=\"_blank\"><i class=\"fa fa-file-text\"></i> Read report</a></li>\n</ul>\n";
},"useData":true});



this["JST"]["explorer-detail"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<h3>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</h3>\n<ul class=\"list-unstyled\">\n  <li>Age: "
    + escapeExpression(((helper = (helper = helpers.age || (depth0 != null ? depth0.age : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"age","hash":{},"data":data}) : helper)))
    + "</li>\n  <li>Gender: "
    + escapeExpression(((helper = (helper = helpers.gender || (depth0 != null ? depth0.gender : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"gender","hash":{},"data":data}) : helper)))
    + "</li>\n  <li>County: "
    + escapeExpression(((helper = (helper = helpers.county || (depth0 != null ? depth0.county : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"county","hash":{},"data":data}) : helper)))
    + "</li>\n  <li>Date of death:"
    + escapeExpression(((helper = (helper = helpers.dod || (depth0 != null ? depth0.dod : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"dod","hash":{},"data":data}) : helper)))
    + "</li>\n  <li>Case ID: "
    + escapeExpression(((helper = (helper = helpers.caseid || (depth0 != null ? depth0.caseid : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"caseid","hash":{},"data":data}) : helper)))
    + "</li>\n  <li>Table ID: "
    + escapeExpression(((helper = (helper = helpers.tableid || (depth0 != null ? depth0.tableid : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"tableid","hash":{},"data":data}) : helper)))
    + "</li>\n  <li>Number of investigations: "
    + escapeExpression(((helper = (helper = helpers.number_of_investigations || (depth0 != null ? depth0.number_of_investigations : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"number_of_investigations","hash":{},"data":data}) : helper)))
    + "</li>\n  <li>Manner of death: "
    + escapeExpression(((helper = (helper = helpers.manner_of_death || (depth0 != null ? depth0.manner_of_death : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"manner_of_death","hash":{},"data":data}) : helper)))
    + "</li>\n  <li>Drug or alcohol related? "
    + escapeExpression(((helper = (helper = helpers.drug_alcohol_related || (depth0 != null ? depth0.drug_alcohol_related : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"drug_alcohol_related","hash":{},"data":data}) : helper)))
    + "</li>\n  <li>Others removed? "
    + escapeExpression(((helper = (helper = helpers.others_removed || (depth0 != null ? depth0.others_removed : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"others_removed","hash":{},"data":data}) : helper)))
    + "</li>\n  <li>Criminal charges? "
    + escapeExpression(((helper = (helper = helpers.criminal_charges || (depth0 != null ? depth0.criminal_charges : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"criminal_charges","hash":{},"data":data}) : helper)))
    + "</li>\n  <li>Age type: "
    + escapeExpression(((helper = (helper = helpers.age_type || (depth0 != null ? depth0.age_type : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"age_type","hash":{},"data":data}) : helper)))
    + "</li>\n  <li>Fault assignment: "
    + escapeExpression(((helper = (helper = helpers.fault_assignment || (depth0 != null ? depth0.fault_assignment : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"fault_assignment","hash":{},"data":data}) : helper)))
    + "</li>\n  <li>Previous CPS contact? "
    + escapeExpression(((helper = (helper = helpers.previous_cps_contact || (depth0 != null ? depth0.previous_cps_contact : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"previous_cps_contact","hash":{},"data":data}) : helper)))
    + "</li>\n  <li>Previous removal? "
    + escapeExpression(((helper = (helper = helpers.previous_removal || (depth0 != null ? depth0.previous_removal : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"previous_removal","hash":{},"data":data}) : helper)))
    + "</li>\n  <li>Other cases? "
    + escapeExpression(((helper = (helper = helpers.other_cases || (depth0 != null ? depth0.other_cases : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"other_cases","hash":{},"data":data}) : helper)))
    + "</li>\n  <li>Other states? "
    + escapeExpression(((helper = (helper = helpers.other_states || (depth0 != null ? depth0.other_states : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"other_states","hash":{},"data":data}) : helper)))
    + "</li>\n  <li>Not investigated? "
    + escapeExpression(((helper = (helper = helpers.not_investigated || (depth0 != null ? depth0.not_investigated : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"not_investigated","hash":{},"data":data}) : helper)))
    + "</li>\n  <li>Medical neglect? "
    + escapeExpression(((helper = (helper = helpers.medical_neglect || (depth0 != null ? depth0.medical_neglect : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"medical_neglect","hash":{},"data":data}) : helper)))
    + "</li>\n  <li>No convictions? "
    + escapeExpression(((helper = (helper = helpers.no_convictions || (depth0 != null ? depth0.no_convictions : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"no_convictions","hash":{},"data":data}) : helper)))
    + "</li>\n  <li>Previous child death? "
    + escapeExpression(((helper = (helper = helpers.previous_child_death || (depth0 != null ? depth0.previous_child_death : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"previous_child_death","hash":{},"data":data}) : helper)))
    + "</li>\n  <li>Age range: "
    + escapeExpression(((helper = (helper = helpers.age_range || (depth0 != null ? depth0.age_range : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"age_range","hash":{},"data":data}) : helper)))
    + "</li>\n  <li>Maltreatment pattern? "
    + escapeExpression(((helper = (helper = helpers.maltreatment_pattern || (depth0 != null ? depth0.maltreatment_pattern : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"maltreatment_pattern","hash":{},"data":data}) : helper)))
    + "</li>\n</ul>\n";
},"useData":true});



this["JST"]["explorer-marker"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "active";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"overview-item gender-"
    + escapeExpression(((helper = (helper = helpers.gender || (depth0 != null ? depth0.gender : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"gender","hash":{},"data":data}) : helper)))
    + " ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.selected : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\"></div>\n";
},"useData":true});

if (typeof exports === 'object' && exports) {module.exports = this["JST"];}