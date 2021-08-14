(async function() {
    const articleId = getArticleId()
    const article = await getArticle(articleId)
    hydrateArticle(article)
})()

function getArticleId() {
    return new URL(location.href).searchParams.get("id")
}

function getArticle(articleId) {
    return fetch(`http://localhost:3000/api/teddies/${articleId}`)
    .then(function(httpBodyResponse) {
        return httpBodyResponse.json()
    })
    .then(function(articles){
        return articles
    })
    .catch(function(error) {
        alert("La connexion au serveur n'a pas pu être effectué. verifiez si le serveur est en ligne!")
    })
}

function hydrateArticle(article) {
    document.getElementById("productName").textContent = article.name
    document.getElementById("productDescription").textContent = article.description
    document.getElementById("productPrice").textContent = `${article.price / 100}.00 €`
    document.getElementById("productImage").src = article.imageUrl

    document.getElementById("buy").onclick = (event) => {
        event.preventDefault()
        Order.addProduct(article)
        redirectToOrderPage(article.name)
    }
}

function redirectToOrderPage(articleName) {
    window.location.href = `order.html?lastAddedProductName=${articleName}`
}



class CartObject {
    get products() {
        return JSON.parse(localStorage.getItem('OrderPage') || '{}')
    }

    set products(products) {
        localStorage.setItem('OrderPage', JSON.stringify(products))
    }

    addProduct(productObject) {
        let products = this.products

        const productAlreadyInCarte = !!products[productObject._id]

        if (productAlreadyInCarte) {
        // Increase quantity
        products[productObject._id].quantity++
        } else {
            // Add product
            products[productObject._id] = {
            quantity: 1,
            ...productObject,
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