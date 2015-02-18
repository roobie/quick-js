
var QTREE
, assign = require('object-assign')
;


var abs = function(a) {
  return a < 0 ? -a : a;
};

function XY(x, y) {
  assign(this, {
    x: x,
    y: y
  });
}

// assign(XY, {
//   from_props: function (props) {
//     return new XY(props.x, props.y);
//   }
// });

assign(XY.prototype, {
  distance: function(p) {
    return {
      x: p.x - this.x,
      y: p.y - this.y
    };
  },
  toString: function xy_toString() {
    return this.x + ',' + this.y;
  }
});

var Point = XY;

function AABB(props) {
  assign(this, {
    center: props.center, // Point
    half_dim: props.half_dim // Point
  });
}

assign(AABB.prototype, {
  /// p:Point
  contains_point: function aabb_contains_point(p) {
    var distance = this.center.distance(p);
    return (
      abs(distance.x) <= this.half_dim.x &&
        abs(distance.y) <= this.half_dim.y
    );
  },
  half_width: function() {
    return this.half_dim.x - this.center.x;
  },
  half_height: function() {
    return this.half_dim.y - this.center.y;
  },
  start_x: function() {
    return this.center.x - this.half_width();
  },
  start_y: function() {
    return this.center.y - this.half_height();
  },
  /// other:AABB
  intersects: function aabb_intersects(other) {
    return (abs(this.start_x() - other.start_x()) <
            (this.half_width() + other.half_width())) &&
      (abs(this.start_y() - other.start_y()) <
       (this.half_height() + other.half_height()));
  }
});

const Q = 4;
function QuadTree(props) {
  assign(this, {
    boundary: props.boundary || new AABB({}),
    points: props.points || [],
    children: props.children || {
      //nw, ne, sw, se
    }
  });
}

assign(QuadTree.prototype, {
  insert: function qt_insert(p) {
    if (!this.boundary.contains_point(p)) {
      return false;
    }

    if (this.points.length < Q) {
      this.points.push(p);
      return true;
    }

    if (!this.children.length) {
      this.subdivide();
    }

    return this.children.nw.insert(p) ||
      this.children.ne.insert(p) ||
      this.children.sw.insert(p) ||
      this.children.se.insert(p);
  },
  subdivide: function qt_subdivide() {

  },
  query_range: function qt_query_range(range) {
    var result = [],
        i;

    if (!this.boundary.intersects(range)) {
      return result;
    }

    for(i = 0; i < this.points.length; i++) {
      if (range.contains_point(this.points[i])) {
        result.push(this.points[i]);
      }
    }

    if (!this.children.length) {
      return result;
    }

    return result.concat(this.children.nw.queryRange(range))
      .concat(this.children.ne.queryRange(range))
      .concat(this.children.sw.queryRange(range))
      .concat(this.children.se.queryRange(range));
  }
});
