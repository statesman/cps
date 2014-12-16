var ChloroMap = (function($, L, _, numeral, chroma) {

  var ChloroMap = function(el, geojson, field) {

    this.field = field;

    this.max = _.max(geojson.features, function(county) {
      return county.properties[field];
    }, this).properties[field];

    this.scale = [0, this.max];

    this.colorScale = chroma.scale(['#fef0d9', '#fdbb84', '#b30000']).correctLightness(true).domain(this.scale);

    /* Setup the basemap, with tiles and geojson data layer */

    this.map = L.map(el);

    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: "Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
    }).addTo(this.map);

    this.dataLayer = L.geoJson(geojson, {
      style: $.proxy(this.style, this),
      onEachFeature: $.proxy(this.onEachFeature, this)
    }).addTo(this.map);


    /* Autofit the map and autosize on window resize */

    this.fit();
    $(window).resize(_.debounce($.proxy(this.fit, this), 350));


    /* Setup the info window */

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
        text += '<h4>' + props.name + '</h4><b>Per capita:</b> ' + numeral(props.perCapita).format('0.00') + '</b><br /><b>Total deaths:</b> ' + props.count;
      }
      else {
        text += 'Hover over a region';
      }
      this._div.innerHTML = text;
    };

    this.info.addTo(this.map);


    /* Setup the legend */

    this.legend = L.control({position: 'bottomright'});

    var self = this;
    this.legend.onAdd = function (map) {
      var interval = function(val, label) {
        return '<i style="background:' + self.getColor(val) + '"></i> ' + label + '<br>';
      };

      var div = L.DomUtil.create('div', 'info legend');

      div.innerHTML += interval(self.scale[0], 'Minimum');
      div.innerHTML += interval(self.scale[1], 'Maximum');

      return div;
    };

    this.legend.addTo(this.map);
  };

  ChloroMap.prototype.getColor = function(d) {
    return this.colorScale(d).hex();
  };

  ChloroMap.prototype.style = function(feature) {
    return {
      fillColor: this.getColor(feature.properties[this.field]),
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
