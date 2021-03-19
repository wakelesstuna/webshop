console.log("app.js running...");

const products = [];
const tempProducts = [];


// https://webacademy.se/fakestore/
// https://fakestoreapi.com/products
function getAllProducts(){
    fetch('https://webacademy.se/fakestore/')
    .then(res=>res.json())
    .then(data=> data.forEach(e => tempProducts.push(e)))
    .then(() => productRender())
    .then(() => addFuctionToAllProductCardButtons())
}


function productRender(){
    let productContainer = document.querySelector('.product-container');
    if(productContainer){
        productContainer.innerHTML = '';
    Object.values(tempProducts).map(e => {
        let productName = e.title;
        productName = productName.substring(0,productName.indexOf(' '));
        let price = parseInt(e.price);
        // createing product object       
        const product = {
        id: e.id,
        title: e.title,
        price: price,
        category: e.category,
        description: e.description,
        image: e.image,
        inCart: 0,
        productName: productName
        };
        products.push(product);
        productContainer.innerHTML += `
        <div class="product-div">
            <h1 class="product-title">${product.title}</h1>
            <img class="product-img"src="${product.image}" alt="product image">
            <p class="product-text" >${product.description}</p>
            <h2 class="product-price">${product.price}</h2>
            <button class="add-to-cart-btn" id="${product.id}">Add to cart</button>
        </div>
        `;   
    });
    }
    localStorage.setItem('productList', JSON.stringify(products));
}

// add function to all product cards buttons
function addFuctionToAllProductCardButtons() {
    let btns = document.querySelectorAll('.add-to-cart-btn');
    btns.forEach(e => {
        e.addEventListener('click', (e) => {
             // detta är för att vi ska hämta rätt element i arrayen med produkter
             // därför tar vi knapp id -1 
            cartNumbers("add");
            // spara proucter till kundvagnen
            addProductToCart(products[e.target.id -1]);
            // lägg till productens värde i totalsumman
            totalSumOfCart(products[e.target.id -1]);
            }); 
    });
}

// to save products in cart to local strage
function addProductToCart(product){
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    
    if(cartItems != null){
        if(cartItems[product.id] == undefined){
            product.inCart = 1
            cartItems = {
                ...cartItems, 
                [product.id]: product
            }
        }else{
            cartItems[product.id].inCart += 1;
        }
    } else {
        product.inCart = 1
        cartItems = {
            [product.id]: product
        }
    }
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
    updateCartUI();
}

function cartNumbers(subtractAdd){
    // vi får en sträng från local storage för att kunna lägga till en 
    // vara behöver vi parsa den till int
    let productNumbers = parseInt(localStorage.getItem('cartNumbers'));
    // kollar om de finns något i cart om de finns lägger vi till 1 till värdet, annars lägger vi in 1
    if (productNumbers) {
        if(subtractAdd === "add"){
            localStorage.setItem('cartNumbers', productNumbers + 1);
            document.querySelector('.cart span').textContent = productNumbers + 1;
        }else if (subtractAdd === "subtract"){
            localStorage.setItem('cartNumbers', productNumbers - 1);
            document.querySelector('.cart span').textContent = productNumbers - 1;
        }
    }else {
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.cart span').textContent = 0;
    }
};

// to save totalprice of cart to local storage
function totalSumOfCart(product){
    let price = localStorage.getItem('totalPriceOfCart');
    price != null ? localStorage.setItem('totalPriceOfCart', parseInt(price) + product.price) : localStorage.setItem('totalPriceOfCart', product.price);
} 

// to update cart UI when page loads
function updateCartUI(){
    let productNumbers = parseInt(localStorage.getItem('cartNumbers'));
    productNumbers ? document.querySelector('.cart span').textContent = productNumbers : document.querySelector('.cart span').textContent = 0;
}

// localStorage.clear();
// onLoad fetch products from api
window.onload = () => {
    getAllProducts();
    updateCartUI();
};