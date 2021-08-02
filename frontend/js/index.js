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
            alert(error)
        })
}

function displayArticle(article) {
    const templateElt = document.getElementById("templateArticle")
    const cloneElt = document.importNode(templateElt.content, true)

    cloneElt.getElementById("nounours_title").textContent = article.name
    cloneElt.getElementById("nounours_price").textContent = article.price
    cloneElt.getElementById("nounours_img").src = article.imageUrl

    document.getElementById("main").appendChild(cloneElt)
}