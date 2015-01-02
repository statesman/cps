/**
 * A regional chloropleth map fed by GeoJSON data
 *
 * Params:
 * @el - an ID for the div where we'll put the map
 * @geojson - a geojson object
 * @options - optional options object with the following:
 *   - property: the key for the item in the geojson properties object that'll
 *       be used to determine region colors
 *   - colors: an array that'll be interpolated into a color scale
 */
var ChloroMap = (function($, L, _, numeral, chroma) {

  var ChloroMap = function(el, geojson, options) {

    // Set some default options if none are set
    this.property = options.property || 'count';
    this.colors = options.colors || ['#fef0d9', '#fdbb84', '#b30000'];

    // Calculate max and min values based on passed data
    this.min = _.min(geojson.features, function(county) {
      return county.properties[this.property];
    }, this).properties[this.property];

    this.max = _.max(geojson.features, function(county) {
      return county.properties[this.property];
    }, this).properties[this.property];

    // Build a color scale function
    this.scale = [this.min, this.max];

    this.colorScale = chroma.scale(this.colors).correctLightness(true).domain(this.scale, 25, 'log');

    // Setup the basemap, with tiles and geojson data layer
    this.map = L.map(el);

    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      maxZoom: 18
    }).addTo(this.map);

    this.dataLayer = L.geoJson(geojson, {
      style: $.proxy(this.style, this),
      onEachFeature: $.proxy(this.onEachFeature, this)
    }).addTo(this.map);


    // Autofit the map and autosize on window resize
    this.fit();
    $(window).resize(_.debounce($.proxy(this.fit, this), 350));


    // Setup the info window
    this.info = L.control();

    this.info.onAdd = function (map) {
      this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
      this.update();
      return this._div;
    };

    // Method to updat the info window; when passed a falsy value, passes help text
    this.info.update = function (props) {
      var text = '';
      if(props) {
        text += '<h4>' + props.name + '</h4>';
        text += '<b>Per capita:</b> ' + numeral(props.perCapita).format('0.00') + '<br />';
        text += '<b>Total deaths:</b> ' + props.count + '<br />';
        text += '<b>Under 18 population:</b> ' + numeral(props.under18).format('0,0');
      }
      else {
        text += 'Hover over a region';
      }
      this._div.innerHTML = text;
    };

    this.info.addTo(this.map);


    // Setup the legend
    this.legend = L.control({position: 'bottomright'});

    var self = this;
    this.legend.onAdd = function (map) {
      var range = self.max - self.min;
      var steps = 6;

      var colorBar = _.times((steps + 1), function(i) {
        return '<i style="background:' + self.getColor(self.min + (range / steps * i)) + '"></i>';
      }, this);

      var div = L.DomUtil.create('div', 'info legend');

      div.innerHTML += 'Min';
      div.innerHTML += '<div class="color-bar">' + colorBar.join('') + '</div>';
      div.innerHTML += 'Max';

      return div;
    };

    this.legend.addTo(this.map);
  };

  ChloroMap.prototype.getColor = function(d) {
    return this.colorScale(d).hex();
  };

  ChloroMap.prototype.style = function(feature) {
    return {
      fillColor: this.getColor(feature.properties[this.property]),
      weight: 1,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.9
    };
  };

  ChloroMap.prototype.fit = function() {
    this.map.fitBounds(this.dataLayer.getBounds());
  };

  ChloroMap.prototype.highlightFeature = function(e) {
    var layer = e.target;

    this.info.update(layer.feature.properties);

    layer.setStyle({
      weight: 3
    });

    if (!L.Browser.ie && !L.Browser.opera) {
      layer.bringToFront();
    }
  };

  ChloroMap.prototype.resetHighlightFeature = function(e) {
    this.dataLayer.resetStyle(e.target);
    this.info.update();
  };

  ChloroMap.prototype.onEachFeature = function(feature, layer) {
    layer.on({
      mouseover: $.proxy(this.highlightFeature, this),
      mouseout: $.proxy(this.resetHighlightFeature, this)
    });
  };

  return ChloroMap;

}(jQuery, L, _, numeral, chroma));
