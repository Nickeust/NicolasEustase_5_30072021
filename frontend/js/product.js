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
}