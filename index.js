//https://github.com/SauravKanchan/NewsAPI//


const searchResultEl = document.getElementById("searchResult");
const searchBtnEl = document.getElementById("searchBtn");
const searchInputEl = document.getElementById("searchInput");
const formEl = document.querySelector("form");
const clearPageBtnEl = document.getElementById("clearPageBtn");

let newsDataArray = [];
let category = "";

async function getNews() {
  try {
    category = searchInputEl.value;
    const apiURL = `https://saurav.tech/NewsAPI/top-headlines/category/${category}/gb.json`;
    newsDataArray = newsDataArray = [];
    const response = await fetch(apiURL);
    const data = await response.json();
    newsDataArray = data.articles;
    console.log(data.articles);

    if (newsDataArray.length === 0) {
      searchResultEl.innerHTML = `<p> No News found, try a different search category</p>`;
      searchResultEl.style.fontSize = 30 + "px";
      searchResultEl.style.color = "red";
      return;
    } else {
      searchResultEl.innerText = "";
    }
    displayNewsArticles();
  } catch (error) {
    console.log("something wh]ent wrong, try again later");
    console.log(error);
  }
}

function displayNewsArticles() {
  newsDataArray.forEach((article) => {
    let date = article.publishedAt.split("T");
    let card = document.createElement("div");
    card.classList.add("card");

    let articleTitle = document.createElement("h2");
    articleTitle.innerText = article.title;
    articleTitle.classList.add("articleTitle");

    let cardImage = document.createElement("img");
    cardImage.classList.add("cardImg");
    cardImage.src = article.urlToImage;

    let published = document.createElement("div");
    published.innerHTML = `<p>Published: <span>${date[0]}</span></p>`;
    published.classList.add("published");

    let author = document.createElement("div");
    author.innerHTML = `<p>Author: <span>${article.author}</span></p>`;
    author.classList.add("author");

    let source = document.createElement('div')
    source.innerHTML = `<p>Source: <span>${article.source.name}</span></p>`;
    source.classList.add('source')

    let descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("descriptionDiv");
    let descriptionText = document.createElement("p");
    descriptionText.classList.add("descriptionText");
    descriptionText.innerText = article.description
    descriptionDiv.appendChild(descriptionText);

     let link = document.createElement("a");
     link.classList.add("link");
     link.setAttribute("target", "_blank");
     link.href = article.url;
     link.innerHTML = "Read More";


    card.appendChild(articleTitle);
    card.appendChild(cardImage);
    card.appendChild(published);
    card.appendChild(author);
    card.appendChild(source);
    card.appendChild(descriptionDiv);
    card.appendChild(link)

    searchResultEl.appendChild(card);
  });
}

clearPageBtnEl.addEventListener("click", (e) => {
  e.preventDefault();
  location.reload();
});

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  getNews();
});
