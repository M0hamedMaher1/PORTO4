let row = document.querySelector(".left-products");
let overlay = document.querySelector(".overlay");
let overRow = document.querySelector(".over-row");
let leftImage = document.querySelector(".left-image3 img");
let title = document.querySelector(".right-info h2");
let disc = document.querySelector(".discount-over span:nth-child(1)");
let price = document.querySelector(".discount-over span:nth-child(2)");
let close1 = document.querySelector(".close");
let plus = document.querySelector(".plus");
let minus = document.querySelector(".minus");
let counter = document.querySelector(".left-counts input");
let addToCart2 = document.querySelector(".addToCart2");
let overlay2 = document.querySelector(".overlay2");
let cartAside = document.querySelector(".cart");
let closeAside = document.querySelector(".close2");
let basket = document.querySelector(".basket");
let spanCount = document.querySelector("#basket span");
let storage = document.querySelector(".cart-row");
let empty = document.querySelector(".empty");
let lasted = document.querySelector(".lasted");
let total = document.querySelector(".total h4 span");
let upper = document.querySelector(".upper");
let close3 = document.querySelector(".close3");
let bars = document.querySelector("#bar");
let aside1 = document.querySelector(".aside1");

window.addEventListener("scroll", function(){
    let y = scrollY;
    if(y > 500){
        upper.style.transform = "translateY(0)";
    }else{
        upper.style.transform = "translateY(100%)";
    };
});

upper.addEventListener("click", function(){
    scrollTo(0,0)
})

let list = [];

let cart;
if(localStorage.getItem("jj") == null){
    cart = [];
    viewCartItems();
    checkThings();
}else{
    cart = JSON.parse(localStorage.getItem("jj"));
    viewCartItems();
    checkThings();
};

let index1;

let getData = async function(){
    try{
        let api = await fetch("data.json");
        let response = await api.json();
        let products = response.products;
        list = products;
        displayProducts(products);
    }catch(err){
        console.log(err);
    };
};
getData();

function displayProducts(take){
    let card = "";
    take.forEach((item, index) => {
        card += `
            <div class="card2">
                <div class="image2">
                    <img src="${item.image1}" alt="">
                    <img src="${item.image2}" alt="" class="img3">
                    <div class="top-icon" onclick="openInfo(${index})">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <span class="sale">Sale</span>
                    <div class="payments">
                        <div class="left-heart">
                            <i class="fa-solid fa-heart"></i>
                        </div>
                        <button class="addToCart" onclick="addToCart(${index})"><i class="fa-solid fa-bag-shopping"></i> add to cart</button>
                        <div class="right-signal">
                            <i class="fa-solid fa-signal"></i>
                        </div>
                    </div>
                </div>
                <div class="card-body2">
                    <h3>${item.title}</h3>
                    <div class="stars3">
                        <div class="star3"><i class="fa-solid fa-star"></i></div>
                        <div class="star3"><i class="fa-solid fa-star"></i></div>
                        <div class="star3"><i class="fa-solid fa-star"></i></div>
                        <div class="star3"><i class="fa-solid fa-star"></i></div>
                        <div class="star3"><i class="fa-solid fa-star"></i></div>
                    </div>
                    <div class="discount3">
                        <span class="disc3">${item?.disc}</span>
                        <span class="price3">$${item.price}</span>
                    </div>
                </div>
            </div>
        `
    });
    row.innerHTML = card;
};

function openInfo(index){
    index1 = index;
    overlay.style.display = "flex";
    setTimeout(() => {
        overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
        overRow.style.transform = "translateY(0)";
        overRow.style.opacity = "1";
    }, 0);
    title.textContent = list[index].title;
    leftImage.src = list[index].image1;
    disc.textContent = list[index].disc;
    price.textContent = list[index].price
};

close1.addEventListener("click", function(){
    overlay.style.backgroundColor = "transparent";
    overRow.style.transform = "translateY(-30%)";
    overRow.style.opacity = "0";
    setTimeout(() => {
        overlay.style.display = "none";
        counter.value = 1;
    }, 400)
});

plus.addEventListener("click", function(){
    counter.value++;
});

minus.addEventListener("click", function(){
    counter.value--;
    if(counter.value < 0){
        counter.value = 0;
    };
});

function addToCart(index){
    let choosenProduct = list[index];
    let final = cart.find((item) => item.id == choosenProduct.id);
    if(final){
        final.count++;
    }else{
        cart.push({...choosenProduct, count: 1});
    };
    localStorage.setItem("jj", JSON.stringify(cart));
    checkThings();
    viewCartItems();
};

addToCart2.addEventListener("click", function(){
    let choosenProduct = list[index1];
    let final = cart.find((item) => item.id == choosenProduct.id);
    if(counter.value > 1 && final){
        final.count = counter.value;
    }else{
        cart.push({...choosenProduct, count: 1});
    };
    localStorage.setItem("jj", JSON.stringify(cart))
    checkThings();
    viewCartItems();
});

basket.addEventListener("click", function(){
    overlay2.style.display = "flex";
    setTimeout(() => {
        overlay2.style.backgroundColor = "rgba(0,0,0,0.5)";
        cartAside.style.transform = "translateX(0)";
        cartAside.style.opacity = "1";
    }, 0);
});

closeAside.addEventListener("click", function(){
    overlay2.style.backgroundColor = "transparent";
    cartAside.style.opacity = "0";
    cartAside.style.transform = "translateX(calc(100% + 50px))";
    setTimeout(() => {
        overlay2.style.display = "none";
    }, 400);
});

function viewCartItems(){
    let card = "";
    let conts = 0;
    cart.forEach((item, index) => {
        conts += item.price * item.count;
        card += `
             <div class="card5">
                <div class="left-details">
                    <h3>${item.title}</h3>
                    <h4>see details <i class="fa-solid fa-angle-down"></i></h4>
                    <h5>$${item.price}</h5>
                    <h6>Qty: ${item.count}</h6>
                </div>
                <div class="right-image5">
                    <img src="${item.image1}"
                        alt="">
                    <img src="${item.image2}" alt="" class="img6">
                    <div class="remove" onclick="deleteElement(${index})">
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                </div>
            </div>
        `
    });
    storage.innerHTML = card;
    total.textContent = conts;
};
viewCartItems();

function deleteElement(index){
    cart.splice(index, 1);
    localStorage.setItem("jj", JSON.stringify(cart));
    checkThings();
    viewCartItems();
};

function checkThings(){
    if(cart.length == 0){
        empty.style.display = "block";
        lasted.style.display = "none"
        spanCount.innerHTML = cart.length;
    }else{
        empty.style.display = "none";
        lasted.style.display = "block"
        spanCount.innerHTML = cart.length
    }
}

function searchProducts(searching){
    let card = ""
    list.forEach((item, index) => {
        if(item.title.includes(searching)){
            card += `
                <div class="card2">
                <div class="image2">
                    <img src="${item.image1}" alt="">
                    <img src="${item.image2}" alt="" class="img3">
                    <div class="top-icon" onclick="openInfo(${index})">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <span class="sale">Sale</span>
                    <div class="payments">
                        <div class="left-heart">
                            <i class="fa-solid fa-heart"></i>
                        </div>
                        <button class="addToCart" onclick="addToCart(${index})"><i class="fa-solid fa-bag-shopping"></i> add to cart</button>
                        <div class="right-signal">
                            <i class="fa-solid fa-signal"></i>
                        </div>
                    </div>
                </div>
                <div class="card-body2">
                    <h3>${item.title}</h3>
                    <div class="stars3">
                        <div class="star3"><i class="fa-solid fa-star"></i></div>
                        <div class="star3"><i class="fa-solid fa-star"></i></div>
                        <div class="star3"><i class="fa-solid fa-star"></i></div>
                        <div class="star3"><i class="fa-solid fa-star"></i></div>
                        <div class="star3"><i class="fa-solid fa-star"></i></div>
                    </div>
                    <div class="discount3">
                        <span class="disc3">${item?.disc}</span>
                        <span class="price3">$${item.price}</span>
                    </div>
                </div>
            </div>
            `
        };
    });
    row.innerHTML = card;
};

bars.addEventListener("click", function(){
    aside1.style.transform = "translateX(0)";
    aside1.style.opacity = "1";
});

close3.addEventListener("click", function(){
    aside1.style.transform = "translateX(calc(-100% + -50px))";
    aside1.style.opacity = "0";
});