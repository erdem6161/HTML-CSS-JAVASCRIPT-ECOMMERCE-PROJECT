const form = document.querySelector('.register-form');//register formu

const nameInput = document.getElementById('name');//idsi name olan
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

/* console.log('nameInput degeeri => ',nameInput.value)
console.log('usernameInput',usernameInput)
console.log('passwordInput',passwordInput) */

const nameError = document.querySelector('#error-name');//name boş bırakıldığındaki hata kısmı için tanımladık
const usernameError= document.querySelector('#error-username');
const passwordError= document.querySelector('#error-password');

/* console.log('nameError',nameError)
console.log('usernameError',usernameError)
console.log('passwordError',passwordError) */


const buttonRegister= document.querySelector('.btn-register');//register formu

document.addEventListener('keydown', function(e){
    if (e.key === "Enter") {
        console.log('ENTERA BASILDI')
        // buttonRegister.click()//register butonuna tikla
    }
})

form.addEventListener("submit", function(e){
    e.preventDefault();
    // console.log('E degeri', e)
   /*  console.log('nameInput.value degeri =>',nameInput.value)
    console.log('usernameInput.value degeri =>',usernameInput.value)
    console.log('passwordInput.value degeri =>',passwordInput.value) */


    const newUsers ={
        name: nameInput.value,
        username: usernameInput.value,
        password: passwordInput.value
    }

    console.log('javascript kismi icin newUsers=>',newUsers)
    console.log('local storage kismi icin newUsers=>',JSON.stringify(newUsers))

    console.log('ŞARTTAN ÖNCE')
    /* BURDA */
    //1.sart
    if (nameInput.value === '') {//nameINput value si boş ise
        console.log('nameInput  BOS')
        nameError.style.color='red'
        nameInput.focus()
    }else {
        console.log('nameInput  BOS DEGILSE')
        nameError.style.color='transparent'
    }
    //2.sart
    if(usernameInput.value === ''){
        console.log('usernameInput  BOS')
        usernameError.style.color='red'
        usernameInput.focus()//focus ile o inputa odaklanir
    }else{
        console.log('usernameInput  BOS DEGILSE')
        usernameError.style.color='transparent'//username style rengini degistirme
    }
    //3.sart
    if(passwordInput.value === ''){
        console.log('passwordInput  BOS')
        passwordError.style.color='red'
        passwordInput.focus()
    }else{
        console.log('passwordInput  BOS DEGILSE')
        passwordError.style.color='transparent'
    }
    //en az 1 ide bos oldugunda
    if (nameInput.value==='' || usernameInput.value==='' || passwordInput.value==='') {
        return //return ile donguden cikar
    }

    console.log('ŞARTLAR SAĞLANDI')

    //javascriptte kullanacagim icin localRepoyu js formatinda lazım
    let localRepo = JSON.parse(localStorage.getItem('users')) || [];
    // console.log('localRepo =>',localRepo)
    localRepo.push(newUsers)//localrepo dizine newUsersi ekler
    localStorage.setItem('users',JSON.stringify(localRepo))

    console.log('localREpo =>', localRepo)

    //MODAL KISMI JS İŞLEMİ

    const modal = document.querySelector('.modal')
    const modalText = document.querySelector('.modal-content span')

    modal.style.display = 'flex'
    modalText.innerHTML =` merhaba <b>${nameInput.value}</b>`   

    setTimeout(() => {
        //3 sn sonra icindeki islemi yapar
        console.log('3 SN SONRA YAZILDI')
        modal.style.display='none';
        window.location.href='login.html'//3 sn sonunda login html gider
        /* window.location.href='gidilecek sayfa' */
    }, 3000);

})


