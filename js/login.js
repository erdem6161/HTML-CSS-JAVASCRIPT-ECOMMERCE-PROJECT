const form = document.querySelector(".login-form"); //form etiketi

const usernameInput = document.getElementById("username"); //input id si username olan
const passwordInput = document.getElementById("password"); //input id si password olan

const usernameError = document.querySelector("#error-username");
const passwordError = document.querySelector("#error-password");
const enterError = document.querySelector('#error-user')

const buttonRegister = document.querySelector(".btn-register");

//keydown basinca çalışır
//keyup tuştan elimizi kaldırınca çalışır
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    console.log("a BASILDI");
  }
});
/* 
 JSON verisi = localStroge bu kurallara göre saklanır
 { //localStrogetan javascript olarak veri alinirken JSON.parse() = stringe cevirir
  "name": "John",
  "age": 30,
  "city": "New York"
}
Javascript objesindeki kullanıl biçimi
{
 javascript localStroge olarak veri alinirken JSON.stringfy() => obje ceviriyor
    name: "John",
    age: 30,
    city: "New York"
}
*/
let users = JSON.parse(localStorage.getItem("users")) || [];
// console.log('users DEGERI=>',JSON.parse(localStorage.getItem('users')))
console.log("users DEGERI=>", users);

form.addEventListener("submit", function (e) {
  //form submit etme islemi
  //submit edildiginde icindeki isimisiz fonk. çalışacak
  e.preventDefault(); //asenkron islem

  /* console.log('usernameInput',usernameInput.value)
    console.log('passwordInput',passwordInput.value) */

  if (usernameInput.value === "") {
    usernameError.style.color = "red";
    usernameInput.focus(); //focuslanir usernameInputuna
  } else usernameError.style.color = "transparent";
  if (passwordInput.value === "") {
    passwordError.style.color = "red";
    passwordInput.focus();
  } else passwordError.style.color = "transparent";

  //ikiside bos ise
  if (usernameInput.value === "" || passwordInput.value === "") {
    return; //donguden cikar
  }
  console.log("IKISIDE DOLU OLDUĞU İÇİN DEVAM ETTİ");

  console.log("KULANICILARMIZ", users);

  //Kullanıcının oturum açıp açmadığını takip eden bir değişken
  let isLoggedIn = false; //hayir giris yapmadi
  /* `${değişken-adı}` İçinw değişken eklemek için*/
  //find = dizilerde öğe bulmak için kullanılır
  users.find((item, i) => {
    //eğer kullanıcı adı ve şifre doğruysa if içine 
    if(item.username === usernameInput.value && item.password === passwordInput.value ){
        console.log('EVET EŞLEŞTİ ve degerler => ', item)
        isLoggedIn=true //giriş yaptığı için true oldu yani giriş yapıldı
        /* CSS MANİPÜLASYONU */
        enterError.style.cssText = 'color:green; font-weight:700; text-align:center'
        /* HTML MANİPÜLASYONU */
        enterError.innerHTML = `Hoşgeldiniz ${item.name}`/* BACKTICK ` ${yazdirmakIstedigimDegisken}` */
        window.location.href='index.html'
    }
  });
  /* FALSE MU?  */
//   if (isLoggedIn) {Gİriş yapıldı mı?
  if (!isLoggedIn) {//Gİriş yapılmadı mı?
    console.log('EVET GIRIS YAPILMA DI!!!')
    enterError.style.cssText='color:red; font-weight:700; text-align:center;'
  }

});

//KAYIT OL BUTONUNA TIKLANINCA
buttonRegister.addEventListener("click", function () {
  console.log("buttonRegister a tiklandi");
  window.location.href = "register.html";
});

/*
`` => backtick işareti ile değişken tutulur
`${değişkenadı}`
let isim = "dursun";

console.log(`Benim adim ${isim}`) */

/* diziler 0.indexten başlar */
/* let dizi = ['armut','kivi',6,true]
//find - dizide eleman bulmak icin
dizi.find((item, index) => {
    console.log(item, index)
}) */

let isLoggedIn1 = false; //hayir giris yapmadi
/* 
    isLoggedIn1 = true mu?
    basinda ünlem olunca 
    !isLoggedIn1 = false mu?
*/
console.log('isLoggedIn1', !isLoggedIn1)