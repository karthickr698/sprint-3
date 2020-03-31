let search = document.getElementById("search");
let git = []
let activePage = 1;
let pageData = [];
let perPage = 3;
function fetchdata() {
    let name = document.getElementById("movie").value;
    let url = "http://www.omdbapi.com/?apikey=b19722fa&s=" + name;
    fetch(url)
        .then(response => response.json())
        .then(data => git = data.Search)
        .then(() => console.log(git))
        .then(() => pagination(activePage))
}

function pagination(page) {
    let total = Number(git.length);
    let pageCount = Number(Math.ceil(total / perPage));
    let pages = document.getElementById("pages");
    pages.innerHTML = '';
    console.log(pages, git.length);
    for (let i = 0; i < pageCount; ++i) {
        let li = document.createElement("li");
        if (i === page - 1) {
            li.setAttribute("class", "page-item active");
        } else {
            li.setAttribute("class", "page-item");
        }
        li.setAttribute("onclick", `changePage(${i + 1})`);
        let a = document.createElement("a");
        a.setAttribute("class", "page-link");
        a.setAttribute("href", `#${i + 1}`);
        a.textContent = i + 1;
        li.append(a);
        pages.append(li);
    }
    loadData();
}
function changePage(newpage) {
    let liActive = document.querySelector(`#pages li:nth-child(${activePage})`);
    liActive.setAttribute("class", "page-item");
    activePage = newpage;
    let liNew = document.querySelector(`#pages li:nth-child(${activePage})`);
    liNew.setAttribute("class", "page-item active");
    loadData();
}
function loadData() {
    let page = activePage;
    let low = (page - 1) * perPage;
    let high = page * perPage;
    pageData = git.filter((a, i) => i >= low && i < high);
    fillPage();
}
function fillPage() {
    let div = document.getElementById("data");
    div.innerHTML = "";
    pageData.forEach(item => {
        let child = document.createElement("div");

        let description = document.createElement("p");
        description.textContent = "Title = " + item.Title;

        let img = document.createElement("img");
        img.src = item.Poster;

        let issueCount = document.createElement("p");
        issueCount.textContent = "Year = " + item.Year;
        let language = document.createElement("p");
        language.textContent = "Movie ID = " + item.imdbID;
        let de = document.createElement("hr");
        //child.appendChild(des);
        child.appendChild(description);
        child.appendChild(language);
        child.appendChild(issueCount);
        child.appendChild(img);
        child.appendChild(de);
        div.append(child);
        //console.log(child);
    });
}

search.addEventListener("click", fetchdata);