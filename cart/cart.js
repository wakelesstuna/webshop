console.log("cart.js running...");

function renderCart(){
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    let cartProducts = document.querySelector('.cart-products');

    if(cartItems === null){
        document.getElementById('total-price').textContent = "0";
    }

    if(cartItems && cartProducts){
        cartProducts.innerHTML = '';
        // här sätter vi id på cart-product till den aktuellt 
        // productens id så vi har tillgång till den senare
        Object.values(cartItems).map(e => {
            cartProducts.innerHTML +=` 
            <div class="cart-product" id="${e.id}">
                <img src="${e.image}" class="cart-img">
                <span class="cart-product-name cart-font-size">${e.productName}</span>
                <div class="cart-price cart-font-size">${e.price}</div>
                <div class="cart-quantity">
                    <ion-icon name="add-circle-outline" class="add-product-to-cart"></ion-icon>
                    <span class="cart-font-size" class="quantity">${e.inCart}</span>
                    <ion-icon name="remove-circle-outline" class="remove-product-to-cart"></ion-icon>
                </div>
                <div class="cart-total cart-font-size">${e.price * e.inCart}</div>
            </div>
            `
        });

        const addBtns = document.querySelectorAll('.add-product-to-cart');
        const removeBtns = document.querySelectorAll('.remove-product-to-cart');

        addBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                addProductToCart(cartItems[e.target.parentElement.parentElement.id]);
                totalSumOfCart(cartItems[e.target.parentElement.parentElement.id], "add");
                cartNumbers(cartItems[e.target.parentElement.parentElement.id],"add");
                updateCartUI();
                updateTotalPriceUI();
                renderCart();
            });
        });
        removeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                if(cartItems[e.target.parentElement.parentElement.id].inCart !== 0){
                removeProductFromCart(cartItems[e.target.parentElement.parentElement.id]);
                totalSumOfCart(cartItems[e.target.parentElement.parentElement.id], "subtract");
                cartNumbers(cartItems[e.target.parentElement.parentElement.id],"subtract");
                updateCartUI();
                updateTotalPriceUI();
                renderCart();
                }      
            });
        });        
    }
} 

// to save products in cart to local strage
function addProductToCart(product){
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    
    if(cartItems != null){
            cartItems[product.id].inCart += 1;
            cartNumbers("add");
    } 
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
  }

function removeProductFromCart(product){
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    
    if(cartItems != 0){
            cartItems[product.id].inCart -= 1;
            cartNumbers("subtract");
    } 
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
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
            if(localStorage.getItem('cartNumbers') == 0){
                document.querySelector('.cart span').textContent = 0;
            }
        }
    }else {
        if(subtractAdd === "add"){
            localStorage.setItem('cartNumbers', productNumbers + 1);
            document.querySelector('.cart span').textContent = productNumbers + 1;
        }
    }
};

// to save totalprice of cart to local storage
function totalSumOfCart(product, subtractAdd){
    let price = localStorage.getItem('totalPriceOfCart');
    if(price != null){
        // convert localstorage from string to number
        if(subtractAdd === "add"){
            price = parseFloat(price);
            localStorage.setItem('totalPriceOfCart', price + product.price);
        }else if (subtractAdd === "subtract"){
            price = parseFloat(price);
            localStorage.setItem('totalPriceOfCart', price - product.price);
        }else{
            
        }
    }else{
        localStorage.setItem('totalPriceOfCart', product.price);
    }    
}

const clearBtn = document.getElementById('clear-cart-btn');
clearBtn.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
});

// to update cart UI when page loads
function updateCartUI(){
  let productNumbers = parseInt(localStorage.getItem('cartNumbers'));
  productNumbers ? document.querySelector('.cart span').textContent = productNumbers : document.querySelector('.cart span').textContent = 0;
}

function updateTotalPriceUI(){
    let price = parseFloat(localStorage.getItem('totalPriceOfCart'));
    let totalPrice = document.querySelector('.total-cart-price-number');
    if(!price){
        totalPrice.textContent = 0;
    }else {
        totalPrice.textContent = price;
    }
} 

window.onload = () => {
  renderCart();
  updateCartUI();
  updateTotalPriceUI();
};