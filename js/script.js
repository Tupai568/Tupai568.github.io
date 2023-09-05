const container = document.querySelector(".container");
const customCursor = document.querySelector(".cursor");
const star = document.querySelector(".star h2");
const starOne = document.querySelector(".star h4");
const mulai = document.querySelector(".mulai");

let Result;
let Res = true;
let score = 0;

//Mengacak angka
function acak(min, max) {
  const angkaAcak = Math.floor(Math.random() * (max - min + 1)) + min;
  return angkaAcak;
}

//membuat element baru
function create(text, text1, text2, text3) {
  const tanah = document.createElement(text);
  const tikus = document.createElement(text1);

  tanah.classList.add(text2);
  tikus.classList.add(text3);
  container.appendChild(tanah);
  tanah.appendChild(tikus);
}

//mencari tanah random
function TanahRandom() {
  const random = Math.floor(Math.random() * 8);
  if (random == Result) {
    TanahRandom();
  } else {
    Result = random;
  }
  return random;
}

//memunculkan tikus
function Tikus() {
  const tanah = document.querySelectorAll(".tanah");
  const tikus = document.querySelectorAll(".tikus");
  const m = acak(1000, 1500);
  const hasil = TanahRandom();
  let activ = true;

  tanah[hasil].classList.add("muncul");
  tikus[hasil].addEventListener("click", () => {
    tikus[hasil].disabled = true;
    if (activ) {
      activ = false;
      tikus[hasil].classList.add("kenak");
      tikus[hasil].classList.add("disabled");

      setTimeout(() => {
        tikus[hasil].classList.remove("kenak");
        tanah[hasil].classList.remove("muncul");
        tikus[hasil].classList.remove("disabled");
      }, m);
      score++;
      star.innerHTML = `Score: ${score}`;
    }
  });

  setTimeout(() => {
    tanah[hasil].classList.remove("muncul");
    if (Res == true) {
      Tikus();
    }
  }, m);
}
//menjalankan
function play() {
  Tikus();
  setTimeout(() => {
    Res = false;
    mulai.disabled = false;
    mulai.innerHTML = "Start";
  }, 1000 * 60);
}

//menggerakkan cursor
function go() {
  document.addEventListener("mousemove", (e) => {
    const widh = customCursor.offsetWidth;
    const heig = customCursor.offsetHeight;
    const x = e.clientX - widh / 2;
    const y = e.clientY - heig / 2;
    customCursor.style.left = `${x}px`;
    customCursor.style.top = `${y}px`;
    document.addEventListener("click", () => {
      customCursor.classList.add("pukul");
      setTimeout(() => {
        customCursor.classList.remove("pukul");
      }, 100);
    });
  });
}

function waktu(text) {
  let second = text;
  let stard = setInterval(() => {
    starOne.innerHTML = `${second} Detik Tersisa`;
    second--;
    if (second < 0) {
      clearInterval(stard);
      starOne.innerHTML = "";
    }
  }, 1000);
}

for (let i = 0; i <= 7; i++) {
  create("div", "div", "tanah", "tikus");
}

mulai.addEventListener("click", () => {
  mulai.disabled = true;
  mulai.innerHTML = "Wait..";
  waktu(59);
  go();
  play();
  Res = true;
  score = 0;
});
