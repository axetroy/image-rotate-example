function showUnsupported() {
  if (!document.getElementById("err")) {
    var errMsg = document.createElement("p");
    errMsg.id = "err";
    errMsg.innerHTML = "Canvas is not supported!";
    document.getElementById("workzone").appendChild(errMsg);
  }
}

/**
 * 旋转图片
 * @param {number} degrees 角度，360 度
 * @param {string} imgSrc 图片地址
 * @param {*} callback 旋转之后的回调函数
 * @returns
 */
function rotateDegrees(degrees, imgSrc, callback) {
  const canvas = document.getElementById("canvas")
  //We use an additional img to get the sizes
  var img = document.getElementById("tmpImg");
  img.onload = function () {
    var canvasWidth = img.width, // canvas 的宽度
      canvasHeight = img.height,// canvas 的高度
      canvasXOffset = 0, // canvas 的 x 轴偏移量
      canvasYOffset = 0; // canvas 的 y 轴偏移量
    switch (degrees) {
      case 90:
        canvasWidth = img.height;
        canvasHeight = img.width;
        canvasYOffset = img.height * -1;
        break;
    }
    console.log(canvasXOffset,canvasYOffset)
    var context = canvas.getContext("2d");
    canvas.setAttribute("width", canvasWidth);
    canvas.setAttribute("height", canvasHeight);
    context.rotate((degrees * Math.PI) / 180);
    context.drawImage(img, 0, 0);
    var result = canvas.toDataURL();
    callback && callback(result);
  };
  img.src = imgSrc;
}

function getImg() {
  return document.getElementById("img");
}
function getImgSrc() {
  return getImg().src;
}
function setImgSrc(src) {
  getImg().src = src;
}
function rotate90() {
  rotateDegrees(90, getImgSrc(), setImgSrc);
}
function rotate180() {
  rotateDegrees(180, getImgSrc(), setImgSrc);
}
function rotate270() {
  rotateDegrees(270, getImgSrc(), setImgSrc);
}

document.getElementById("btn90").onclick = rotate90;
document.getElementById("btn180").onclick = rotate180;
document.getElementById("btn270").onclick = rotate270;
