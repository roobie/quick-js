var heads = require('robohydra').heads;
var RoboHydraHeadProxy = heads.RoboHydraHeadProxy;
var RoboHydraHeadFilesystem = heads.RoboHydraHeadFilesystem;

exports.getBodyParts = function(conf) {
  return {
    heads: [
      // The order of heads are important.
      // Most specific to the top.
      // Most general to the bottom.
      new RoboHydraHeadProxy({
        mountPath: '/api',
        proxyTo: 'http://localhost:3030/api/v1',
        setHostHeader: true
      }),
      new RoboHydraHeadFilesystem({
        mountPath: '/',
        documentRoot: 'dist'
      })
    ]
  };
};
