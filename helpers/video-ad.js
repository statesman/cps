var Handlebars = require('handlebars');

/*
 * A helper that evaluates the anvatoAd value in video partials
 * and returns the proper dfp ad value.
 *
 * Takes 'statesman', 'austin360' or 'mystatesman'.
 * The 'mystatesman' version removes the ad call per CMGt docs.
 * If the anvatoAd value is missing, it uses 'statesman' ads.
 *
 */

module.exports = function(anvatoAd) {

  // check if mystatesman, set ad call accordingly
  if(anvatoAd == 'mystatesman') {
    var adSite = 'austin_np/myaas_web_default';
  }
  // check if austin360, set ad call accordingly
  else if(anvatoAd == 'austin360') {
    var adSite = 'austin_np/aas_a360_web_default';
  }
  // default to statesman
  else {
    var adSite = 'Austin_NP/aas_web_default'
  }
  // this is passed back to the template for the anvato
  var code = 'dfp: {' +
              'clientSide: {' +
                  'adTagUrl:\'https://pubads.g.doubleclick.net/gampad/ads?sz=400x300&iu=/12523293/' + adSite + '&cmsid=17693&vid=ANV_ANV[[VIDEO_ID]]&ciu_szs&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&url=[referrer_url]&description_url=[description_url]&correlator=[timestamp]\'' +
              '}' +
          '},'

  return new Handlebars.SafeString(code);
};