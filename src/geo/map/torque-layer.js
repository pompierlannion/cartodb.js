var _ = require('underscore');
var MapLayer = require('./map-layer');
var Backbone = require('backbone');
var _ = require('underscore');

var TorqueLayer = MapLayer.extend({
  defaults: {
    type: 'torque',
    visible: true
  },

  initialize: function() {
    this.widgets = new Backbone.Collection([]);

    this.widgets.bind('change:filter', function(widget, filter) {
      this.trigger('change:filter', this, widget, filter);
    }, this);

    MapLayer.prototype.initialize.apply(this, arguments);
  },

  isEqual: function(other) {
    var properties = ['query', 'query_wrapper', 'cartocss'];
    var self = this;
    return this.get('type') === other.get('type') && _.every(properties, function(p) {
      return other.get(p) === self.get(p);
    });
  },

  isVisible: function() {
    return true;
  },

  getInfowindowData: function() {
    return null;
  },

  getTooltipData: function() {
    return null;
  },

  getInteractiveColumnNames: function() {
    return [];
  },

  getInfowindowFieldNames: function() {
    return [];
  },

  hasInteraction: function() {
    return this.getInteractiveColumnNames() > 0;
  },

  getFilters: function() {
    return this.widgets.map(function(widget) {
      return widget.getFilter();
    });
  }

});

module.exports = TorqueLayer;