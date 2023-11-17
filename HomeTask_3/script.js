const revKey = 'likedFoto';
const likeArr = getRevew();


  function getRevew() {
    const data = localStorage.getItem(revKey);
    if (data === null) {
        return [];
    } 
    return JSON.parse(data);    
};



function homeTask2(imgArray) {
const listOfImageEl = document.querySelector(".listOfImage");
const naviEl = document.querySelector(".navi");
const bigImageDivEl = document.querySelector('.bigImageDiv');

for (let index = 0; index < imgArray.length; index++) {
  listOfImageEl.insertAdjacentHTML(
    "beforeend",
    `
    <div class="smallImageDiv"><img src=${imgArray[index].urls.regular} alt="image${index}" class="smallImage" id ="${index}"></div>
    `
  );
  naviEl.insertAdjacentHTML(
    "beforeend",
    `<div class="circle "></div>
    `
  );
}

bigImageDivEl.insertAdjacentHTML('beforeend', `
<h3 class="title">Foto created by : ${imgArray[0].user.name}</h3>
<img src=${imgArray[0].urls.regular} alt="image1" class="bigImage" id="0">
`);
const titleEl = document.querySelector('.title');
const bigImageEl = document.querySelector(".bigImage");
const smallImageEls = document.querySelectorAll(".smallImage");

const leftTurnEl = document.querySelector(".leftTurn");
const rightTurnEl = document.querySelector(".rightTurn");
//*********************************block Like********************************************* */
const likeEl = document.querySelector('.like');
likeEl.addEventListener('click', e => {
  //***************add like to local storage **************************
if (!checkFotoInArray(imgArray[bigImageEl.id].urls.regular)){
  if (!imgArray[bigImageEl.id].liked_by_user){
    const newItem = {name:`${imgArray[bigImageEl.id].user.name}`,
                    url:`${imgArray[bigImageEl.id].urls.regular}`}
    likeArr.push(newItem);
    const json = JSON.stringify(likeArr); 
    localStorage.setItem(revKey, json);                 
}}
  //***************delete like from local storage********************
  if (imgArray[bigImageEl.id].liked_by_user){    
    let namber = 0;
    likeArr.forEach((item, index) => {
      if (item.url === imgArray[bigImageEl.id].urls.regular){ namber = index}});
    likeArr.splice(namber, 1);
    const json = JSON.stringify(likeArr); 
    localStorage.setItem(revKey, json);
  }
  //***************** change hart color */
  imgArray[bigImageEl.id].liked_by_user = !imgArray[bigImageEl.id].liked_by_user;
  const likedEl = likeEl.querySelectorAll('svg');
  likedEl.forEach(item => item.classList.toggle('hidden'));
});
//******************************end of block like***************************************** */

let chossenEl = document.querySelector(".smallImage");
chossenEl.classList.toggle("choosenElem");

let chossenCircle = document.querySelector(".circle");
chossenCircle.classList.toggle("grayCircle");

smallImageEls.forEach((elem, id) => {
  elem.addEventListener("click", (e) => {  
    changeClass(id);
  });
});
//****************************************************************************************** */

leftTurnEl.addEventListener("click", (e) => {
  let number = +bigImageEl.id;
  if (number === 0) {
    number = imgArray.length - 1;
  } else {
    number = number - 1;
  }
  changeClass(number);
});

rightTurnEl.addEventListener("click", (e) => {
  let number = +bigImageEl.id;
  if (number === imgArray.length - 1) {
    number = 0;
  } else {
    number = number + 1;
  }
  changeClass(number);
});
//*********************************************************************** */
document.querySelectorAll(".circle").forEach((elem, id) => {
  elem.addEventListener("click", (e) => {
    changeClass(id);
  });
});

function changeClass(id){
  chossenEl.classList.toggle("choosenElem");
  chossenEl = smallImageEls[id];
  chossenEl.classList.toggle("choosenElem");

  chossenCircle.classList.toggle("grayCircle");
  chossenCircle = document.querySelectorAll(".circle")[id];
  chossenCircle.classList.toggle("grayCircle");

  bigImageEl.src = imgArray[id].urls.regular;
  bigImageEl.id = id;
  titleEl.textContent = `Foto created by : ${imgArray[id].user.name}`;

  const likeEl = document.querySelector('.hidden');
  if ( imgArray[bigImageEl.id].liked_by_user){ 
    if (likeEl.id !== 'likeFalse'){
      const divlikeEl = document.querySelector('.like');
      const likedEl = divlikeEl.querySelectorAll('svg');
      likedEl.forEach(item => item.classList.toggle('hidden'));
    }
  } else {
    if (likeEl.id !== 'likeTrue'){
      const divlikeEl = document.querySelector('.like');
      const likedEl = divlikeEl.querySelectorAll('svg');
      likedEl.forEach(item => item.classList.toggle('hidden'));
    }
  }
}
}
//********************************************************* */
function addPictures() {
  const ACCESS_KEY = 'R_-StvXALY4iKv-S9hc6mo6LCd1ZXbXIr3uiaa_chok';
  const arrayOfUrl =[];
  fetch(`https://api.unsplash.com/photos/?page=100`, {
  method: 'GET',
  headers: {
  'Authorization': `Client-ID ${ACCESS_KEY}`,
  }
  })
  .then(response => response.json())
  .then(arr => {
    console.log(arr);
    homeTask2(arr);})
  .catch(e => console.log(e));
  }
//************************************************************** */
function checkFotoInArray(url){
  let flag = false;
  likeArr.forEach((item) => {
    if (item.url === url) {    
      flag = true}    
  });  
  return flag;
}
//************************************************************** */
addPictures();

