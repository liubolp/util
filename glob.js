var glob = require('glob')
var resolve = require('path').resolve
// 获取文件入口
exports.getEntry = function (entryPath, deep) {
  var entry = {}
  glob.sync(entryPath).forEach(function (path) {
    var key = path.replace(/\.js$/, '').split('/').splice(deep).join('/')
    entry[key] = resolve(path)
  })
  return entry
}
