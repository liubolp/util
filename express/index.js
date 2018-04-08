var express = require('express')
var app = express()

app.get('/index', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*')
  res.send('<krpano onstart="loadscene(0,null,MERGE);" >\n' +
    '  <scene name="scene_0" onstart="activatespot(spot0,0);">\n' +
    '    <view hlookat="0" vlookat="0" fovtype="MFOV" fov="100" fovmin="45" fovmax="120" />\n' +
    '    <preview url="http://wximg.165183.com/UserFiles/720/8048/preview.jpg?v=20171208174351000000" />\n' +
    '    <image>\n' +
    '      <cube url="http://29e5534ea20a8.cdn.sohucs.com/c_zoom,h_213/c_cut,x_277,y_4,w_889,h_593/os/news/9f1cd0d2f77a4c748b5d093930d9b000.jpg" />\n' +
    '    </image>\n' +
    '  </scene>\n' +
    '  <autorotate enabled="true" />\n' +
    '  <events onnewpano="delayedcall(autoscene,15,nextscene);" onremovepano="stopdelayedcall(autoscene);" /></krpano>')
})
app.use(express.static('images'))
app.listen(8080)
