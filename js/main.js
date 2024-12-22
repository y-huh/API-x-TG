let elProductsList = document.querySelector(".products-list")
let elGetInfoBtn = document.querySelector(".get-info-btn")
let elModalWrapper = document.querySelector(".modal-wrapper")
let elModalInner = document.querySelector(".modal-inner")
let elInfoForm = document.querySelector(".info-form")

// elModalWrapper.addEventListener("submit", (e) => e.target.id == "wrapper" ? elModalWrapper.classList.add("scale-0") : elModalWrapper.classList.remove("scale-0"))
elModalWrapper.addEventListener("click", (e) => {
    if (e.target.id === "wrapper") {
        elModalWrapper.classList.add("scale-0");
    }
});


let TOKEN = "7769484127:AAGrZR7j9OrQgDIzMCcQ2Wd-KMnM1Pqddrg"
let CHAT_ID = "-1002354850698"
let HTTPPhoto = `https://api.telegram.org/bot${TOKEN}/sendPhoto`
let HTTPMessage = `https://api.telegram.org/bot${TOKEN}/sendMessage`

async function getProducts(API){
    const promise = new Promise((resolve,reject) =>{
        axios.get(API).then(res => {
            resolve(res.data.products);
        })
    })
    return promise
}

getProducts("https://dummyjson.com/products").then(result => {
    result.map(item => {
        let elItem = document.createElement("li")
        elItem.className = "w-[300px] p-2 rounded-md bg-slate-200"
        elItem.innerHTML = `
        <img class="mb-2 h-[300px] object-contain" src=${item.images[0]} alt="Product img" width="300" height="300" />
        <h2 class="font-bold text-[22px] line-clamp-1 mb-2">${item.title}</h2>
        <p class="text-slate-400 line-clamp-3">${item.description}</p>
        <div class="flex items-center mt-5 justify-between">
            <strong class="text-[23px]">${item.price}$</strong>
            <button onclick="handleSendBtnClick(${item.id})" class="w-[30%] p-2 rounded-md bg-green-500 text-white font-semibold">Sell</button>
        </div>
    `
    elProductsList.appendChild(elItem)
    })
    
} )


function handleSendBtnClick(id){
    axios.get(`https://dummyjson.com/products/${id}`).then(res =>{
        console.log(res.data);
        message = ` Site Info \n`
        message += ` Title: ${res.data.title} \n`
        message += ` Description: ${res.data.description} \n`

            let data = {
                chat_id:CHAT_ID,
                parse_mod:`html`,
                caption:message,
                photo:res.data.images[0]
            }

        axios.post(HTTPPhoto, data).then(res => {
            console.log(res);
        })
    })
}

function handleGetInfoButtonClick(){
    elModalWrapper.classList.remove("scale-0")
}


elInfoForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let message = `User Info \n`;
    message += `Username: ${e.target.username.value} \n`;
    message += `Email: ${e.target.email.value} \n`;
    message += `Phone number: ${e.target.phone_number.value} \n`;
    

    const data = {
        chat_id:CHAT_ID,
        parse_mod:"html",
        text:message,
    }

    axios.post(HTTPMessage, data).then(res => {
        elModalWrapper.classList.add("scale-0")
    })
});
