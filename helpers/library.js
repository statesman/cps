var Handlebars = require('handlebars'),
    request = require('sync-request');

/*
* A helper that creates a document sidebar from a DocumentCloud document
*
* @id: the DocumentCloud ID of the doc to include
* @page: the page to thumbnail
*/
module.exports = function(id, page) {
  var apiUrl = 'https://www.documentcloud.org/api/documents/' + id + '.json';
  var res = request('GET', apiUrl, {
    cache: 'file'
  });
  var resp = JSON.parse(res.getBody());

  var imgUrl = resp.document.resources.page.image.replace('{page}', page.toString()).replace('{size}', 'large');

  var sider = '<div class="col-xs-12 col-sm-4 col-md-3">' +
        '<div class="thumbnail">' +
        '<img class="img-responsive" src="' + imgUrl + '" />' +
        '<div class="caption">' +
        '<h4 class="document-title">' + resp.document.title + '</h4>' +
        '<p><small>' + resp.document.pages + ' pages</small></p>' +
        '<ul class="document-links list-inline">' +
        '<li><a target="_blank" href="docs.html?doc=' + resp.document.id + '"><i class="fa fa-file-text"></i> Read report</a></li>' +
        '<li><a target="_blank" href="' + resp.document.resources.pdf + '"><i class="fa fa-download"></i> Download PDF</a></li>' +
        '</p>' +
        '</div>' +
      '</div></div>';

  return new Handlebars.SafeString(sider);
};
