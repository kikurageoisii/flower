const flowers = ["🌸","🌼","🌻","🌷","🐕","🐈","🦒"];

const flowerURL = [
"https://upload.wikimedia.org/wikipedia/commons/4/40/Sunflower_sky_backdrop.jpg",
"https://nyanko-peace-winds-org.s3.ap-northeast-1.amazonaws.com/wp-content/uploads/2025/01/28094017/1_AdobeStock_128624186-2048x1193.jpeg",
"https://aikenonline.jp/contents/wp-content/uploads/2025/07/AdobeStock_397179585.jpeg",
"https://www.yamanashibank.co.jp/fuji_note/tanuki_05.jpg"
];


// ランダム取得
function random(arr){
  return arr[Math.floor(Math.random()*arr.length)];
}


// ---------------------
// 文字置換
// ---------------------
function replaceText(node){

  if(node.nodeType === Node.TEXT_NODE){

    node.textContent =
      node.textContent.replace(/./g, () => random(flowers));

    return;
  }

  if(node.nodeType === Node.ELEMENT_NODE){

    const tag = node.tagName;

    if(["SCRIPT","STYLE","TEXTAREA","INPUT","CODE"].includes(tag)) return;

    node.childNodes.forEach(replaceText);
  }
}


// ---------------------
// 画像置換
// ---------------------
function replaceImages(root){

  const imgs = root.querySelectorAll
    ? root.querySelectorAll("img")
    : [];

  imgs.forEach(img=>{
    img.src = random(flowerURL);
  });

}


// ---------------------
// 初回実行
// ---------------------
replaceText(document.body);
replaceImages(document);


// ---------------------
// 動的DOM対応
// ---------------------
const observer = new MutationObserver((mutations)=>{

  mutations.forEach(m=>{
    m.addedNodes.forEach(node=>{

      replaceText(node);
      replaceImages(node);

    });
  });

});

observer.observe(document.body,{
  childList:true,
  subtree:true
});