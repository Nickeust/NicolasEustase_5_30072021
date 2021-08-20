class CartObject {
    get products() {
        return JSON.parse(localStorage.getItem('OrderPage') || '{}')
    }

    set products(products) {
        localStorage.setItem('OrderPage', JSON.stringify(products))
    }

    addProduct(productObject,selectcolor) {
        let products = this.products

        const productAlreadyInCarte = !!products[productObject._id]

        if (productAlreadyInCarte) {
        // augmentation quantité
        products[productObject._id].quantity++
        } else {
            // ajout pruduit
            products[productObject._id] = {
            quantity: 1,
            ...productObject,
            color:selectcolor
            }
        }

        this.products = products
    }

    getProductQuantity(productId) {
        const products = this.products
        return products[productId].quantity
    }

    updateProductQuantity(productId, quantity) {
        const products = this.products
        products[productId].quantity = quantity
        console.log(products)
        this.products = products
    }

    getTotalPrice() {
        const products = this.products
        const totalPrice = Object.values(products).reduce((acc, curr) => {
            return acc + (curr.price * curr.quantity) / 100
        }, 0)
        return totalPrice
    }
}

const Order = new CartObject()