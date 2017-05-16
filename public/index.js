var imageUrlList = ['./images/Qiita01.png', './images/Qiita02.png', './images/Qiita03.png'];
var loadImage = [];



function clearRect(ctx) {
  ctx.clearRect(0, 0, 200, 300);
  ctx.save();
}

/**
 * canvasに描画する処理
 */
function drawImage(ctx, image) {
  // 現在描画している内容に上書きする
  ctx.globalCompositeOperation = 'source-over'; 
  ctx.drawImage(image, 0, 0, 200, 300);
  ctx.save();
}

/**
 * ブレンドモードを有効にしてcanvasに描画する
 */
function blendModeEnabledDrawImage(ctx, image, blendMode) {
  // 既に描画された図形と、新規で描画する図形で重なる領域のみ描画する
  ctx.globalCompositeOperation = 'source-in';
  ctx.drawImage(image, 0, 0, 200, 300);
  ctx.save();
}


/**
 * 合成された画像が重なっているかどうかをチェックする
 * @return {{Boolean}} true: 重なっている, false: 重なっていない
 */
function isOverlapping(selectore) {
   // 重なっている場合はどちらもcanvasには何も描画されないため、toDataURLの値が一致する
   return ($('#js-canvas01')[0].toDataURL() !== $(selectore)[0].toDataURL());
}

/**
 * Canvasの「ブレンドモード」と「toDataURL」を利用した
 * 画像の重なりを判定する処理
 */
function main() {

  // パターン1: 重なりがない状態
  console.log('パターン1: 重なりがない状態のアバターチェック');
  var ctx = $('#js-canvas02')[0].getContext('2d');
  clearRect(ctx);
  drawImage(ctx, loadImage[0]);
  blendModeEnabledDrawImage(ctx, loadImage[1]);
  console.log('重なり判定:' + isOverlapping('#js-canvas02'));


  // パターン2: 重なりがある状態
  console.log('パターン2: 重なりがある状態のアバターチェック');
  var ctx = $('#js-canvas03')[0].getContext('2d');
  clearRect(ctx);
  drawImage(ctx, loadImage[1]);
  blendModeEnabledDrawImage(ctx, loadImage[2]);
  console.log('重なり判定:' + isOverlapping('#js-canvas03'));
}

/**
 * 画像の読み込みが完了したら呼ばれる処理
 */
function onLoadImage(image) {
  loadImage.push(image);
  if (imageUrlList.length === loadImage.length) {
    console.log('画像の読み込みが完了');
    main();
  }
}

$(function(){

  // 全ての画像の事前読み込みを実施しておく
  for(var i = 0; i < imageUrlList.length; i++) {
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageUrlList[i];
    img.onload = function() {
      onLoadImage(this);
    };
  }

});
