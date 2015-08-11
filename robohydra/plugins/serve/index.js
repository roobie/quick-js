var heads = require('robohydra').heads;
var RoboHydraHeadFilesystem = heads.RoboHydraHeadFilesystem;
var RoboHydraHeadProxy = heads.RoboHydraHeadProxy;

exports.getBodyParts = function(conf) {
  return {
    heads: [
      new RoboHydraHeadFilesystem({
        mountPath: '/',
        documentRoot: 'dist'
      }),
      new RoboHydraHeadProxy({
        mountPath: '/api',
        proxyTo: 'http://localhost:9090/api/v1'
      })
    ]
  };
};
