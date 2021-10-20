class ProductList{
    constructor(container='.products'){
        this.container = container;
        this.goods = [];
        this._fetchProducts();
        this.render();//вывод товаров на страницу
        this.getSum();//вывод стоимости товаров
    }
    _fetchProducts(){
        this.goods = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 20},
            {id: 3, title: 'Keyboard', price: 200},
            {id: 4, title: 'Gamepad', price: 50},
        ];
    }
    
    render(){
        const block = document.querySelector(this.container);
        for(let product of this.goods){
            const item = new ProductItem(product);
             block.insertAdjacentHTML("beforeend",item.render());
//           block.innerHTML += item.render();
        }

    }
    getSum(){
        let sum = 0;
        const block = document.querySelector("main");
        for(let product of this.goods){
            sum += product.price;
        }
        block.insertAdjacentHTML("beforeend",`<h1 class="get-sum">Стоимость всех товаров = ${sum} рублей.</h1>`);
    }
}

class ProductItem{
    constructor(product,img='https://static.tildacdn.com/tild6365-3435-4366-a261-306434376661/Screenshot_17.jpg'){
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = img;
    }
    render(){
           return `<div class="product-item">
                <img src="${this.img}">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

class Cart{ // методы корзины
    addCart(){ // добавить в корзину
    }
    delCart(){ // удалить из корзины
    }
    render(){ // вывести на страницу корзину
    }
}

class CartItem{ // методы товаров корзины
    render(){ // вывести на страницу единицу товара  
    }
}

let list = new ProductList();