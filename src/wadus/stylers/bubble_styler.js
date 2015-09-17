var BubbleStyler = function(options) {
  this.options = this._parseOptions(options);
}

BubbleStyler.prototype._parseOptions = function(options) {
  // TODO: Check if all required options are present and extract only the ones we need
  return options;
}

BubbleStyler.prototype.fetchRequiredData = function() {
  var POINTS = 10;

  // TODO: Move this somewhere else
  var CLUSTERING_FUNCTIONS = {
    'quantile': 'CDB_QuantileBins',
    'jenks': 'CDB_JenksBins'
  }

  var columnName = this.options.columnName;
  var tableName = this.options.tableName;
  var clusteringMethod = this.options.clusteringMethod || Object.keys(CLUSTERING_FUNCTIONS[0]);
  var dataModel = this.options.data;

  var SQLTemplate = _.template('select unnest(<%= functionName %>(array_agg(<%= simplify_fn %>((<%= column %>::numeric))), <%= slots %>)) as buckets from (<%= sql %>) _table_sql where <%= column %> is not null');

  var sql = SQLTemplate({
    slots: POINTS,
    sql: encodeURIComponent("select * from " + tableName),
    column: columnName,
    functionName: CLUSTERING_FUNCTIONS[clusteringMethod],
    simplify_fn: 'distinct'
  })

  var requiredData = new Backbone.Model({});
  SQLApiRequest(sql, {
    success: function(data) {
      var buckets = _(data.rows).pluck('buckets');
      requiredData.set({
        quartiles: buckets,
        points: POINTS
      });
    },
    error: function() {
      // errorCallback();
    }
  });

  return requiredData;
}

BubbleStyler.prototype.generateCartoCSS = function(data) {
  var generator = new BubbleCSSGenerator();
 
  var quartiles = data.get('quartiles');
  var points = data.get('points');

  var cartoCSS = generator.generateCartoCSS(_.defaults(this.options, {
    quartiles: quartiles,
    points: points
  }));
  
  return cartoCSS;
}


