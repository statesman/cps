/*
 * Code for our customized version of John Keeve's DC viewer
 */

(function($) {

  function docid() {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
      var sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] === "doc") {
        return sParameterName[1];
      }
    }
  }

  $(document).ready(function() {

    // get the document id from the url, using jquery.url.min.js
    // so from http://s3.amazonaws.com/datadesk/dc.html?doc=29933-rahm-ruling
    // we get '29933-rahm-ruling'
    var documentcloud_id = docid();

    // build the documentcloud url
    var documentcloud_url = "http://www.documentcloud.org/documents/" + documentcloud_id + ".js";

    // assign the document loader to varible 'viewer'
    var viewer = DV.load(documentcloud_url, {
      container : 'div#document',
      embedded : true,
      responsive: true,

      // after the document loads ...
      afterLoad : function(viewer) {

        // ... get its title, and put it on the page and in the title bar
        var document_title = viewer.api.getTitle();
        $('header').append("<h1>Document: " + document_title + "</h1>");
        $('#maintitle').text("Document: " + document_title + " | Austin American-Statesman");

        // ... get its source, and put it in if it exists
        var document_source = viewer.api.getSource();
        if(document_source !== null) {
          $('header').append("<p class='pull-right'>Source: " + document_source + "</p>");
        }
      }
    });
  });

}(jQuery));
