(async function() {
    const articleId = getArticleId()
    const article = await getArticle(articleId)
    hydrateArticle(article)
})()

//récupération de l'ID de l'ourson de la page
function getArticleId() {
    return new URL(location.href).searchParams.get("id")
}

// récupération des données de l'ourson sélectionné par son id
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

// Hydratation de la page avec les données de l'ourson sélectionné
function hydrateArticle(article) {
    document.getElementById("productName").textContent = article.name
    document.getElementById("productDescription").textContent = article.description
    document.getElementById("productPrice").textContent = `${article.price / 100}.00 €`
    document.getElementById("productImage").src = article.imageUrl
    // création choix couleur
    const select = document.getElementById("productColor") 
        // ajout des différentes couleurs 
        for (const color of article.colors) {
            select.innerHTML+= `<option>${color}</option>`
        }
    


    document.getElementById("buy").onclick = (event) => {
        event.preventDefault()
        Order.addProduct(article,select.value)
        console.log("Administration : le produit a été ajouté au panier");
        alert("Vous avez ajouté ce produit dans votre panier")
        redirectToOrderPage(article.name)
    }
}

function redirectToOrderPage(articleName) {
    window.location.href = `order.html?lastAddedProductName=${articleName}`
}