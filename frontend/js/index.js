(async function() {
    const articles = await getArticles()

    for (article of articles) {
        displayArticle(article)
    }
})()

function getArticles() {
    return fetch("http://localhost:3000/api/teddies")
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

function displayArticle(article) {
    const templateElt = document.getElementById("product")
    const cloneElt = document.importNode(templateElt.content, true)

    cloneElt.getElementById("productImage").src = article.imageUrl
    cloneElt.getElementById("productName").textContent = article.name
    cloneElt.getElementById("productPrice").textContent = `${article.price / 100}.00 €`
    cloneElt.getElementById("productDescription").textContent = article.description
    cloneElt.getElementById('productLink').href = `/product.html?id=${article._id}`

    document.getElementById("productsList").appendChild(cloneElt)
}