console.log("https://www.youtube.com/watch?v=NuAKnbIr6TE");

var loadingMark = document.getElementById('loading-mark');
var firstIndex = document.getElementById('first-index');

const poemSpace = document.getElementById('poem-space');
const indexList = document.getElementById('index');

const appendBtn = document.getElementById('append');
const randomizeBtn = document.getElementById('randomize');
const printBtn = document.getElementById('print');
const blockBtn = document.getElementById('block');
const refreshBtn = document.getElementById('refresh');

var poemList = [];
var poemCount = 0;









window.onload = (event) => {
  getPoem();
}









function getPoem() {
  fetch('https://maxmainio.github.io/webtype-Max/projects/p4v3/sources/data.json')
    .then((response) => response.json())
    .then((json) => {
      shuffle(json);
      poemList = json;
      displayPoem(poemCount);

      loadingMark.classList.remove('loading');
      firstIndex.remove();
    });
}









function displayPoem(poemIndex){
  let poem = poemList[poemIndex];

  let author = poem['poet'];
  let text = poem['content'];
  var phrase = text.split(/\n/);
  var words = [];

  for (var i = 0; i < phrase.length; i++){
    var temp = phrase[i].split(/\s/);
    words.push(temp);
  }

  poemWrite = '';

  for (var i = 0; i < words.length; i++){
    poemWrite = poemWrite + '<select data-poem-modal="' + poem['tag'] + '">';
    for (var j = 0; j < words[i].length; j++){
      poemWrite = poemWrite + '<option>' + words[i][j] + '</option>';
    }
    poemWrite = poemWrite + '</select>';
  }

  poemSpace.insertAdjacentHTML("beforeend", poemWrite);
  updateIndex(author, poem, poemIndex);

  poemCount++

  if (poemCount == 11){
    poemCount = 0;
  }
}









function updateIndex(author, poem, poemIndex){
  var authorCard = document.createElement('div');
  authorCard.setAttribute('class', 'author');
  authorCard.setAttribute('data-poem-index', poem['tag']);

  var poemIndex = poemIndex + 1;

  authorCard.innerHTML = '<p><a href="' + author['url'] + '" target="_blank">' + author['name'] + '</a></p><p>' + poemIndex + '</p>'

  indexList.appendChild(authorCard);
  updateIndexList();
}









function updateIndexList(){
  document.querySelectorAll('[data-poem-index').forEach(item => {
    item.addEventListener('mouseenter', event => {
      var hovering = event.target.dataset.poemIndex;
      
      document.querySelectorAll('[data-poem-modal=' + hovering + ']').forEach((element) => {
        element.classList.add('hovering');
      });
    });

    item.addEventListener('mouseleave', event => {
      var hovering = event.target.dataset.poemIndex;
      
      document.querySelectorAll('[data-poem-modal=' + hovering + ']').forEach((element) => {
        element.classList.remove('hovering');
      });
    });
  });
};









appendBtn.addEventListener('click', event => {
  displayPoem(poemCount);
});

printBtn.addEventListener('click', event => {
  window.print();
});

blockBtn.addEventListener('click', event => {
  document.querySelectorAll('select').forEach((element) => {
    element.classList.toggle('blockmode');
  });
});









function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}