var tapSpec = require('tap-spec');
var spawn = require('child_process').spawn;
var _ = require('lodash');

module.exports = TapSpecWebpackPlugin;

function TapSpecWebpackPlugin() { };

TapSpecWebpackPlugin.prototype.apply = function (compiler) {
  compiler.plugin('after-emit', emitted);

  function emitted(compilation, callback) {

    var source = _(compilation.chunks)
          .filter('entry')
          .map(function (c) {
            return c.files[0];
          })
          .map(function (f) {
            return compilation.assets[f];
          })
          .map(function (a) {
            return a.source();
          }).valueOf().join('\n;');


    var proc = spawn(process.execPath, {
      stdio: ['pipe', 'pipe', 'inherit']
    });

    proc.stdout.pipe(tapSpec())
      .pipe(process.stdout);
    proc.stdin.end(source, 'utf8');
    proc.on('exit', exited);

    function exited(code) {
      return callback();
    }
  }
};
