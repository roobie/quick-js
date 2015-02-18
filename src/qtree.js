
var QTREE
, assign = require('object-assign')
;


var abs = function(a) {
  return a < 0 ? -a : a;
};

var memoize = function (fn) {
  var cache = {};
  return function (a){
    if(a in cache) {
      return cache[a];
    } else {
      return cache[a] = fn.call(this, a);
    }
  };
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
  if (!props.half_dim) {
    // assume width & height is specified
    props.half_dim = new Point(
      props.center.x + 0.5 * props.width,
      props.center.y + 0.5 * props.height
    );
  }
  assign(this, {

    center: props.center, // Point
    half_dim: props.half_dim, // Point

    half_width: memoize(function() {
      return this.half_dim.x - this.center.x;
    }),
    half_height: memoize(function() {
      return this.half_dim.y - this.center.y;
    }),
    start_x: memoize(function() {
      return this.center.x - this.half_width();
    }),
    start_y: memoize(function() {
      return this.center.y - this.half_height();
    })
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
    level: props.level || 0,

    boundary: props.boundary || new AABB({
      center: new Point(50, 50),
      half_dim: new Point(100, 100)
    }),

    points: props.points || [ ],

    //nw, ne, sw, se
    children: props.children || { }
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
    var qt = this;
    var next_level = this.level + 1,
        hw = this.bounds.half_width(),
        hh = this.bounds.half_height(),
        qw = 0.5 * hw,
        qh = 0.5 * hh,
        x = this.bounds.start_x,
        y = this.bounds.start_y;

    ([
      { name: 'nw', center: new Point(x + qw, y + qh) },
      { name: 'ne', center: new Point(x + hw + qw, y + qh) },
      { name: 'sw', center: new Point(x + qw, y + hh + qh) },
      { name: 'se', center: new Point(x + qw + hw, y + hh + qh) },
    ]).forEach(function(child_cfg) {
      qt.children[child_cfg.name] = new QuadTree({
        level: next_level,
        boundary: new AABB({
          center: child_cfg.center,
          width: hw,
          height: hh
        })
      });
    });
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
