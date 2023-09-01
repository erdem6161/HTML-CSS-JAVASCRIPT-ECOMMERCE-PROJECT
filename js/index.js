const openOffcanvas = document.querySelector(".open-offcanvas"); //offcanvas acma iconu
const closeOffcanvas = document.querySelector(".close-offcanvas"); //offcanvas kapatma iconu

const offcanvasMenu = document.querySelector(".offcanvas");

//openOffcanvas acma iconuna tiklaninca calisan bir addEventListener ozellgii
openOffcanvas.addEventListener("click", function () {
  //zaten bu fonk.a tikaldigimda çalışacağı için isim vermedik
  console.log("OPEN offcanvas iconuna TIKLANDI");
  offcanvasMenu.style.cssText = "left:0%; transition: ease .7s;";
});

//closeOffcanvas yani kapatma iconun tiklaninca calisan bir addEventListener ozellgii
//closeOffcanvas yani kapatma iconun tiklaninca calisan bir addEventListener ozellgii
closeOffcanvas.addEventListener("click", function () {
  console.log("CLOSE offcanvas iconuna tiklandi");
  offcanvasMenu.style.cssText = "left: -100%; transition: ease .7s;";
});

//offcanvas icindeki a etiketi icindeki i iconu icin sadece
const offCanvasSubmenuIcon = document.querySelector(".offcanvas-middle a i");
const offCanvasSubmenu = document.querySelector(".submenu"); //icona tiklaninca acilacak olan class

offCanvasSubmenuIcon.addEventListener("click", function () {
  console.log("OFFCANVAS ICINDEKI ICONA TIKLANDI");
  //offCanvasSubmenu display flex ise
  if (offCanvasSubmenu.style.display === "flex") {
    console.log("IF");
    //offCanvasSubmenu display flex ise none yap
    offCanvasSubmenu.style.display = "none";
  } else {
    console.log("ELSE");
    //offCanvasSubmenu display none ise flex yap
    offCanvasSubmenu.style.display = "flex";
  }
});

//headermain menu icin tıklayacağımız icon
const openMainmenuIcon = document.querySelector(".for-mainmenu .fa-bars");
//tıklanınca acılacak olan maınmenu
const openMainMenu = document.querySelector(".for-mainmenu .mainmenu");

//header-main classi icindeki mainmenu iconuna tıklanınca
openMainmenuIcon.addEventListener("click", function () {
  console.log("openMainmenu ICINDEKI ICONA TIKLANDI");
  console.log("openMainMenu.style.display", openMainMenu.style.display, "+");
  if (openMainMenu.style.display === "flex") {
    openMainMenu.style.display = "none";
  } else {
    openMainMenu.style.display = "flex";
  }
});

/* SWIPPER JS KODLARI */

const swiper = new Swiper(".swiper", {
  // Optional parameters
  loop: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },
});

/* CARTI KAPATMA VE ACMA */
const openCartIcon = document.querySelector(".open-cart");
const mycartPanel = document.querySelector(".mycart");

openCartIcon.addEventListener("click", function () {
  mycartPanel.style.display = "flex";
});
//mycartPanelden mouse ayrıldığında
mycartPanel.addEventListener("mouseleave", function () {
  mycartPanel.style.display = "none";
});

//ürünlerin listeleneceği class
const productCardLeft = document.querySelector(".product-card-left");

//ürün verilerini tutacak değişken
let product = [];

/* 
response.json() bu kısımda .json() yapısı ile json tipine dönüştürüp
 veriyi alabiliyorum
*/

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json()) //.json() yapisi ıle javascript objesine dndürdük
  .then((response) => {
    // console.log(response);
    product = response; //tüm verilieri productsa atadık
    showProductsCards(product); //cardlarin goruntulenegi fon.u çağırdık
  })
  .catch((err) => console.log("HATANIN ADI:", err));

//urunlerin product panelinde görüntülenmesi için çağrılacak fonksyon
function showProductsCards(gelenUrunler) {
  // console.log("EVET BEN CAGRILDIM KARTLARI GORUNTULEMEK ICIN OLUSTURULDUM",gelenUrunler);

  let cardsHtml = "";
  // console.log("product", product);
  if (!gelenUrunler.length) {
    //product bos ise
    cardsHtml = "<p>Ürün Bulunamadı</p>";
  } else {
    //product boş değil ise
    //tum ürünleri sırayla gezerek cardsHtml değişkine html kodularını ekleyerek burda tüm kodlarımı tutuyorum
    gelenUrunler.forEach((product) => {
      //foreach diziyi gezmemize yarar
      // cardHtml yapsının içinde değişken kullanacağım için ` backtick işaretini kullnyoruz
      const onlyOneCard = `
        <div class="card">
            <img src=${product.image} alt=${product.title}>
            <div class="card-rate">
                <i class="fa-solid fa-star"></i>
                <span>${product.rating.rate}</span>
            </div>
            <h3>${product.title}</h3>
            <div class="card-process">
            <i class="fa-solid fa-heart"></i>
            <button onClick=addProduct(${product.id})>$${product.price}</button>
            </div>
        </div>
    `;
      cardsHtml = cardsHtml + onlyOneCard; //her olusturulan card yapisini foreach ile gezerken sırayla hepsını ekler
    });
  }
  //   console.log("cardsHtml =>", cardsHtml);
  //
  productCardLeft.innerHTML = cardsHtml;
}

//toplam fiyatin gösterildiği öğeyi
const total = document.querySelector(".total-price");

//sepetteki toplam ürün miktarı
const countQuantity = document.querySelector(".count-quantiy");

//boş sepet oluşturdum
let cart = [];

function addProduct(gelenId) {
  //   console.log("addProduct çalıştı", gelenId);

  //eklemek  istediğmiz ürünü bululım
  const eklenecekUrun = product.find((item) => item.id === gelenId);

  //   console.log("eklenecekUrun", eklenecekUrun);
  //sepetimde(cart değişkeninde) eklenmiş ürün var ise indexini verir, yoksa -1 döndürür
  const index = cart.findIndex((item) => item.id === gelenId);

  // console.log('index',index)

  Toastify({
    text: `${eklenecekUrun.title.slice(0, 10) + "... sepete eklendi"}`,
    duration: 1000, //1sn boyunca goruntulensin
  }).showToast();

  if (index !== -1) {
    //sepette o ürün var ise yani tıklanan ürün var ise
    // console.log("BU urun sepette var yani cart degiskeninde ");
    // cart[index].quantity = cart[index].quantity+1
    cart[index].quantity += 1;

    //Güncellelencek urunun kartını secıyoruz
    const existingCard = document.getElementById(eklenecekUrun.id);

    //miktari gosteren span Öğesini seciyoruz
    const quantitySpan = existingCard.querySelector(".mycart-price span");
    quantitySpan.textContent = `$${eklenecekUrun.price} x ${cart[index].quantity}`;

    //toplam fiyat
    const priceSpan = existingCard.querySelector(".mycart-total");
    priceSpan.textContent = `$${(
      eklenecekUrun.price * cart[index].quantity
    ).toFixed(2)} `;
  } else {
    //urun sepette yok ise cart a yani sepete ekleme İşlemi
    // console.log("BU URUN DAHA ONCE EKLENMEMIS SEPET BOSTU ZATEN");
    const yeniUrunHtml = `
        <div class="card" id='${eklenecekUrun.id}'>
            <img src=${eklenecekUrun.image} alt="">
            <div class="mycart-price">
                <p>${eklenecekUrun.title}</p>
                <span>$${eklenecekUrun.price} x 1</span>
            </div>
            <div class="mycart-total">
                $ ${eklenecekUrun.price}
            </div>
        </div>
        `;
    //var olan cart a her tıklanıldığında yeniUrunHtml i eklemek için
    mycartPanel.innerHTML = mycartPanel.innerHTML + yeniUrunHtml;
    // console.log('yeniUrunHtml',yeniUrunHtml)

    const newItem = {
      quantity: 1,
      ...eklenecekUrun,
    };
    // console.log("newItem", newItem);
    cart.push(newItem);
  }

  //toplam fiyat guncelleme
  total.innerHTML = cart
    .reduce(
      (toplam, oAnkiIndex) => toplam + oAnkiIndex.price * oAnkiIndex.quantity,
      0
    )
    .toFixed(2);

  //sepetteki toplam ruun miktari
  countQuantity.innerHTML = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  /* console.log("cart:", cart);
  console.log(
    "CARD REDUCE ISLEMI ",
    cart.reduce((toplam, oAnkiIndex) => toplam + oAnkiIndex.price * oAnkiIndex.quantity, 0)
  ); */
}

/*arama butonunu seciyoruz  */
const searchButton = document.querySelector(".header-main-right button");

/*arama kutusunu seciyoruz  */
const searchInput = document.querySelector(".header-main-right input");

//ARAMA KUTUSUNDA HER DEğİŞİKLİK OLup ENTERA TIKLANINCA CALIŞACAK OLAN 'CHANGE' EVENT OLAYINI DİNLEYELİM
searchInput.addEventListener("change", function () {
  // console.log("BIR SEY YAAZDIN")

  const searchValue = searchInput.value.toLowerCase();

  const filteredProducts = product.filter((item) => {
    // console.log('product.title.toLowerCase().includes(searchValue)',item.title.toLowerCase().includes(searchValue))
    return item.title.toLowerCase().includes(searchValue);
  });
  console.log("filteredProducts", filteredProducts);

  showProductsCards(filteredProducts);
});

const categoryFilter = document.querySelector(".category-filter select");
const priceFilter = document.querySelector(".price-filter select");
const radioButton = document.querySelector(".rate-filter");

// console.log("categoryFilter", categoryFilter);

//filtrelemek icin tiklanacak buton
const applyFilterButton = document.getElementById("apply-filter");

import priceFunc from "./function.js";
applyFilterButton.addEventListener("click", function () {
  const selectedCategory = categoryFilter.value;
  const selectPrice = priceFilter.value;
  const selectRadio = document.querySelector(
    'input[name="rate-filter"]:checked'
  ).value;

  // console.log("selectRadio", selectRadio.value);
  //butona tıklandıgğında filtrelenmiş olan özelliklere göre eşleşen product ürünlerini buraya atayaağız her seferınde
  let filtered = [];
  //filtreleme-filter(), diğer ES6 map() find() filter() reduce() sort() findIndex()
  const filteredProducts = product.filter((item, index) => {
    if (
      item.category === selectedCategory ||
      selectedCategory === "allCategory"
    ) {
      //   console.log("category", item.category);
      //   return priceFunc(item, selectPrice, selectRadio);
      // console.log('item.category === selectedCategory', selectedCategory)
      /* console.log(
        "item.category === selectedCategory",
        priceFunc(item, selectPrice, selectRadio)
      ); */

      return priceFunc(item, selectPrice, selectRadio);
    }
  });
  console.log("filteredProducts", filteredProducts);
  showProductsCards(filteredProducts);
});

const helpWindow = document.querySelector(".help");
const helpOpenIcon = document.querySelector(".help-process i");
const chatWindow = document.querySelector(".help-chat");

helpOpenIcon.addEventListener("click", () => {
  if (chatWindow.style.display === "flex") {
    chatWindow.style.display = "none";
    helpWindow.style.cssText = "right:-250px;";
    helpOpenIcon.className = "fa-solid fa-comment-dots";
  } else {
    chatWindow.style.display = "flex";
    helpWindow.style.cssText = "right:0;";
    helpOpenIcon.className = "fa-solid fa-arrow-right";
  }
});

const myQuestion = document.querySelector(".help-process input");
const leftChat = document.querySelector(".help-chat-left");
const rightChat = document.querySelector(".help-chat-right");

myQuestion.addEventListener("keypress", () => {
  // console.log('neye tiklandi', event.key)
  if (event.key === "Enter") {
    // console.log('EVENT ENTERA TIKLANDi')

    let myQuestionHtml = "";

    //Kullanıcının sorusunu içeren HTML oluşturulur
    myQuestionHtml = `
      <div class="help-chat-right">
        <p>${myQuestion.value}</p>
      </div>
    `;
    //beforeeend parametresi, chatWindow elementinin sonuna eklemek için kullanılır.
    //insertAdjacentHTML() yöntemi, HTML kodunu belirtilen bir konuma ekler..
    chatWindow.insertAdjacentHTML("beforeend", myQuestionHtml);

    //chatWindow.scrollHeight yatay eksende px cinsinden yuksekligini verir
    console.log("chatWindow.scrollHeight", chatWindow.scrollHeight);
    //(x, y) olaarak 2 parametre alir biz y ekseninde sadece scrool odaklama yaptik
    chatWindow.scrollTo(0, chatWindow.scrollHeight);

    /* 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 */

    /* 
    model="gpt-3.5-turbo",
    messages=[
      {"role": "user", "content": "Hello!"}
    ]
    */
    const model = "gpt-3.5-turbo";
    const userMessage = { role: "user", content: myQuestion.value };

   /*  const body = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Hello!" }],
    }; */

    console.log("GIDECEK OLAN=>", { model, userMessage });

    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer OPEN_AI_API_KEY`,
        "Content-Type": "application/json",
      },
      //FETCH API, body parametresine gonderilen JSON formatında çalışır.
      //veriyi JSON formatına dönüştürmek için JSON.stringify() kullanırız
      body: JSON.stringify({
        model: model,
        messages: [userMessage],
      }),
    })
      .then((res) => res.json()) //JAVASCRIPT OBJE MODELINE DONDURUYORUZ
      .then((data) => {
        console.log("gelen cevap =>", data);

        let comedResponse = `
        <div class="help-chat-left">
          <p>${data.choices[0].message.content}</p>
        </div>
      `;

        chatWindow.insertAdjacentHTML("beforeend", comedResponse);

        chatWindow.scrollTo(0, chatWindow.scrollHeight);

        myQuestion.value=''
      })
      .catch((err) => console.log(err));
  }

});
