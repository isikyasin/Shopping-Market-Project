class UI {
    constructor() {
        this.products = document.querySelector(".products");
        this.cart = [];
        this.productList = [
            {
                id: 1,
                name: "Portakal",
                image_url:
                    "https://migros-dali-storage-prod.global.ssl.fastly.net/sanalmarket/product/27304007/portakal-kg-72075c.jpg",
                price: 5.99,
            },
            {
                id: 2,
                name: "Elma",
                image_url:
                    "https://www.entazem.com/Uploads/UrunResimleri/buyuk/elma-kirmizi-yaz-f85f.jpg",
                price: 4.99,
            },
            {
                id: 3,
                name: "Muz",
                image_url:
                    "https://i.sozcu.com.tr/wp-content/uploads/2017/08/440muz-1.jpg",
                price: 9.99,
            },
        ];
    }

    addToCart = (productID) => {
        if (this.cart.some((v,i) => v.id == productID)) {
            const product = this.cart.find((v,i) => v.id == productID)
            product.unit++;
            this.renderCartDOM();
            return
        }
        this.cart.push({
            id: productID,
            unit: 1
        });
        this.renderCartDOM();
    };

    removeFromCart = (productID) => {
       const product = this.cart.find((v) => v.id == productID);
       if (product.unit == 1) {
           this.cart = this.cart.filter((v) => v.id !== productID);
           this.renderCartDOM();
           return
       }
       product.unit--;
       this.renderCartDOM();
    };

    renderCartDOM = () => {
        const cartDOMItem = document.querySelector(".cart");
        cartDOMItem.innerHTML = ``;
        const self = this
        this.cart.forEach(function (value) {
            const product = self.productList.find((v) => v.id == value.id)
            const elem = document.createElement("li");

            elem.dataset.id = value.id;
            elem.innerHTML = `<div class="product cart-product"> <img
                src="${product.image_url}"
                class="product-img"
                alt=""
            />
            <span class="product-name">${product.name}</span>
            <span class="price">${product.price} TRY</span>
            <span class="unit">${value.unit}</span>

            <button data-id="${value.id}" class="add-to-cart danger">-</button></div>`;
            cartDOMItem.appendChild(elem);
        });
        this.calculateTotal();
    }
    calculateTotal = () => {
        let totalPrice = 0;
        this.cart.map((data,index) => {
            const productID = data.id;
            const productUnit = data.unit;
            const product = this.productList.find((v) => v.id == productID);
            totalPrice += product.price * productUnit;
        })

        const totalPriceDOM = document.querySelector("#totalPrice");
        totalPriceDOM.innerHTML = `${totalPrice.toFixed(2)} TRY`
    }
}

function addItemsToDom(productList, productDOMItem) {
    console.log(productDOMItem);
    productList.forEach(function (value) {
        const elem = document.createElement("div");
        elem.classList.add("product");
        elem.innerHTML = ` <img
            src="${value.image_url}"
            class="product-img"
            alt=""
        />
        <span class="product-name">${value.name}</span>
        <span class="price">${value.price} TRY</span>
        <button data-id="${value.id}" class="add-to-cart">SEPETE EKLE</button>`;
        productDOMItem.appendChild(elem);
    });
}

function eventListeners() {
    const ui = new UI();
    addItemsToDom(ui.productList, ui.products);
    const addToCartButton = document.querySelectorAll(".add-to-cart");

    for (let i = 0; i < addToCartButton.length; i++) {
        addToCartButton[i].addEventListener("click", function (e) {
            const dataID = addToCartButton[i].dataset.id;
            ui.addToCart(dataID);
            e.preventDefault();
        });
    }
    const cartList = document.querySelector(".cart");
    cartList.addEventListener("click", function(e) {
        var productID = e.target.dataset.id;
        if (productID == undefined) {
            return
        }
        ui.removeFromCart(productID);
    })
    

}


document.addEventListener("DOMContentLoaded", function () {
    eventListeners();
});
