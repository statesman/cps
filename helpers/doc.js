var Handlebars = require('handlebars'),
    request = require('sync-request');

/*
 * A helper that creates a document sidebar from a DocumentCloud document
 *
 * @id: the DocumentCloud ID of the doc to include
 * @page: the page to thumbnail
 */
module.exports = function(id, desc, page) {
  var apiUrl = 'https://www.documentcloud.org/api/documents/' + id + '.json';
  var res = request('GET', apiUrl, {
    cache: 'file'
  });
  var resp = JSON.parse(res.getBody());

  var imgUrl = resp.document.resources.page.image.replace('{page}', page.toString()).replace('{size}', 'large');

  var sider = '<div class="sider panel panel-default document">' +
      '<div class="panel-heading">' +
        '<h3 class="panel-title">Related document</h3>' +
      '</div>' +
      '<div class="document-img">' +
        '<img class="img-responsive" src="' + imgUrl + '" />' +
      '</div>' +
      '<div class="panel-body">' +
        '<p class="document-title">' + resp.document.title + '</p>' +
        '<p><small>' + resp.document.pages + ' pages</small></p>' +
        '<p class="document-description">' + desc +'</p>' +
        '<ul class="document-links list-inline">' +
          '<li><a target="_blank" href="docs.html?doc=' + resp.document.id + '"><i class="fa fa-file-text"></i> Read report</a></li>' +
          '<li><a target="_blank" href="' + resp.document.resources.pdf + '"><i class="fa fa-download"></i> Download PDF</a></li>' +
        '</p>' +
      '</div>' +
    '</div>';

  return new Handlebars.SafeString(sider);
};
