const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

class ProductsList {
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];//массив товаров из JSON документа
        this._getProducts()
            .then(data => { //data - объект js
                 this.goods = [...data];
                 this.render()
            });
    }
    // _fetchProducts(cb){
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         this.goods = JSON.parse(data);
    //         console.log(this.goods);
    //         cb();
    //     })
    // }
    _getProducts(){
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    calcSum(){
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new ProductItem(product);
//            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }
}


class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150'){
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render(){
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}


class Cart{ // методы корзины
    constructor(container = '.cart-list'){
        this.container = container;
        this.goods = [];//массив товаров из JSON документа
        this._clickCart();
        this._getCart()
            .then(data => { //data - объект js
                 this.goods = data.contents;
                 this.render()
            });
    }
    _clickCart(){
        document.querySelector(".btn-cart").addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('none');
        });
    }
    _getCart(){
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new CartItem();
            block.insertAdjacentHTML('beforeend', productObj.render(product));
        }

    }

    addCart(){ // добавить в корзину
    }
    delCart(){ // удалить из корзины
    }

}

class CartItem{ // методы товаров корзины
    render(product, img = 'https://via.placeholder.com/50x50'){ // вывести на страницу единицу товара     
    return `<div class="cart-item">
            <div class="cart-item-left">
            <img src="${img}" alt="image">
            <div class="cart-product">
            <p class="cart-product-title">${product.product_name}</p>
            <p class="cart-product-quantity">Quantity: ${product.quantity}</p>
            </div>
            </div>
            <div class="cart-item-right">
                <p class="cart-product-price">$${product.quantity * product.price}</p>
                <button class="del-btn">x</button>
            </div>
            </div>`
    }
}


let list = new ProductsList();
console.log(list);
let cart = new Cart;
console.log(cart);