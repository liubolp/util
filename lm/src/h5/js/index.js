
! function() {
  var style = document.createElement("STYLE"),
    docEl = document.documentElement,
    header = document.getElementsByTagName("HEAD")[0],
    viewport = document.createElement("meta"),
    dpr = 0,
    isAndroid = navigator.appVersion.match(/android/gi),
    isIPhone = navigator.appVersion.match(/iphone/gi),
    baseDpr = "devicePixelRatio" in window ? devicePixelRatio : 1,
    dpr = baseDpr;
  dpr = isIPhone ? devicePixelRatio >= 3 && (!dpr || dpr >= 3) ? 1 : devicePixelRatio >= 2 && (!dpr || dpr >= 2) ? 1 : 1 : 1, scale = 1 / dpr, docEl.setAttribute("data-dpr", dpr), docEl.setAttribute("data-device-type", isIPhone ? "iphone" : isAndroid ? "android" : "other"), viewport.name = "viewport", viewport.content = "initial-scale=" + scale + ", maximum-scale=" + scale + ", minimum-scale=" + scale + ", user-scalable=no", header.appendChild(viewport);
  var width = document.documentElement.clientWidth,
    height = document.documentElement.clientHeight;
  isIPhone || screen.availWidth == width || (width = screen.availWidth / baseDpr, height = screen.availHeight / baseDpr);
  var portrait = Math.min(width, height) / 320 * 10,
    landscape = Math.max(width, height) / 568 * 17.75;
  if(portrait > 18){
    portrait = 18;
  }
  if(landscape > 18){
    landscape = 18;
  }
  style.innerHTML = "@media screen and (orientation:portrait) { html,body { font-size: " + portrait + "px!important; } }\n@media screen and (orientation:landscape) { html,body { font-size: " + portrait+ "px!important; } }", header.appendChild(style) }();

