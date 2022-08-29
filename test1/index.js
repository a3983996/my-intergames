//貪吃蛇
document.querySelector(".menuGame1").addEventListener("click", () => {
  //切換script
  let scr = document.getElementsByTagName("script")[1];
  let scr1 = document.createElement("script");
  scr1.src = "/js/game1.js";
  scr1.type = "text/javascript";
  scr.parentNode.appendChild(scr1);
  scr.parentNode.removeChild(scr);
  // scr.setAttribute("src", "/js/game1.js");
  //切換遊戲頁面
  let gamesNum =
    document.querySelector(".game1").parentNode.children.length - 3;
  for (let i = 0; i < gamesNum; i++) {
    document.querySelector(".game1").parentNode.children[i + 1].style.display =
      "none";
  }

  document.querySelector(".game1").style.display = "flex";
});
function abc() {
  console.log(1);
}
//俄羅斯方塊
document.querySelector(".menuGame2").addEventListener("click", () => {
  //切換script
  let scr = document.getElementsByTagName("script")[1];
  scr.setAttribute("src", "/js/game2.js");
  //切換遊戲頁面
  let gamesNum =
    document.querySelector(".game2").parentNode.children.length - 3;
  for (let i = 0; i < gamesNum; i++) {
    document.querySelector(".game2").parentNode.children[i + 1].style.display =
      "none";
  }

  document.querySelector(".game2").style.display = "flex";
});
//炸彈超人
document.querySelector(".menuGame3").addEventListener("click", () => {
  //切換script
  let scr = document.getElementsByTagName("script")[1];
  scr.setAttribute("src", "/js/game3.js");
  //切換遊戲頁面
  let gamesNum =
    document.querySelector(".game3").parentNode.children.length - 3;
  for (let i = 0; i < gamesNum; i++) {
    document.querySelector(".game3").parentNode.children[i + 1].style.display =
      "none";
  }

  document.querySelector(".game3").style.display = "flex";
});
