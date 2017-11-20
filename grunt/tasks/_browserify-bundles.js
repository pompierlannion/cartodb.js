module.exports = {
  'src-specs': {
    src: [
      'test/fail-tests-if-have-errors-in-src.js',
      'test/spec/api/**/*',
      'test/spec/core/**/*',
      'test/spec/dataviews/**/*',
      'test/spec/util/**/*',
      'test/spec/geo/**/*',
      'test/spec/ui/**/*',
      'test/spec/vis/**/*',
      'test/spec/windshaft/**/*',
      'test/spec/windshaft-integration/**/*',
      'test/spec/analysis/**/*',
      'test/spec/engine.spec.js',

      // not actually used anywhere in cartodb.js, only for editor?
      // TODO can be (re)moved?
      '!test/spec/ui/common/tabpane.spec.js'
    ],
    dest: '<%= config.tmp %>/src-specs.js'
  },

  cartodb: {
    src: 'src/cartodb.js',
    exclude: [
      'src/api/v4/'
    ],
    dest: '<%= config.dist %>/internal/cartodb.uncompressed.js'
  },

  'carto-public': {
    src: [
      'src/api/v4/index.js',
      'node_modules/camshaft-reference/versions/0.59.4/reference.json'
    ],
    dest: '<%= config.dist %>/public/carto.uncompressed.js',
    options: {
      external: [ 'leaflet' ]
    }
  }
};
