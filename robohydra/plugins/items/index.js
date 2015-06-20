var RoboHydraHeadStatic = require("robohydra").heads.RoboHydraHeadStatic;

exports.getBodyParts = function(conf) {
  return {
    heads: [
      new RoboHydraHeadStatic({
        path: '/foo',
        content: {
          "success": true,
          "results": [
            {"url": "http://robohydra.org",
             "title": "RoboHydra testing tool"},
            {"url": "http://en.wikipedia.org/wiki/Hydra",
             "title": "Hydra - Wikipedia"}
          ]
        }
      })
    ]
  };
};
