var MultiPolygonView = require('../../../../../src/geo/leaflet/geometries/multi-polygon-view');
var MultiPolygon = require('../../../../../src/geo/geometry-models/multi-polygon');
var SharedTestsForMultiGeometryViews = require('./shared-tests-for-multi-geometry-views');

describe('src/geo/leaflet/geometries/multi-polygon-view.js', function () {
  beforeEach(function () {
    this.geometry = new MultiPolygon(null, {
      latlngs: [
        [
          [0, 1],
          [1, 2],
          [2, 3],
          [3, 4]
        ],
        [
          [0, 10],
          [10, 20],
          [20, 30],
          [30, 40]
        ]
      ]
    });
    this.leafletMap = jasmine.createSpyObj('leafletMap', [ 'addLayer', 'removeLayer' ]);

    this.geometryView = new MultiPolygonView({
      model: this.geometry,
      nativeMap: this.leafletMap
    });
  });

  SharedTestsForMultiGeometryViews.call(this);

  it('should render the geometries', function () {
    expect(this.leafletMap.addLayer.calls.count()).toEqual(10); // 2 geometries with 4 markers each
  });
});