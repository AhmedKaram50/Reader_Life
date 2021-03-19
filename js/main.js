let input = document.getElementById("inputPassword2"),
    searchValue = "harry",
    theForm = document.querySelector(".form"),
    createResults = document.createElement("div"),
    searchItems = [],
    chosenItems = [],
    booksName = document.getElementById("books"),
    submit = document.querySelector("form button");

    input.addEventListener("keyup", function () {
        searchItems = [];
         if (input.value !== "") {
            searchValue = input.value
            document.querySelector(".row")
            trigger()
         } else{
             createResults.remove()
         }
        
    });


    
let trigger = async function (){
    let data = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchValue}&printType=books&filter=partial&key=AIzaSyC6zTJT-oN75Z3MOYUt4OuZFxiMojgGF5c`),
        response = await data.json();
    
    createResults.classList.add("results")    

    createResults.innerHTML = "" // Empty the old content

    console.log(response.items)
    for (let i = 0; i < 10; i++){
        let createImgHolder = document.createElement('div'),
        createInfo = document.createElement('div'),
        createImg = document.createElement('img'),
        createTitle = document.createElement('h3'),
        createDate = document.createElement('h6'),
        createAuthor = document.createElement('span'),
        createDescription = document.createElement('p'),
        createResult = document.createElement("div");

        createResult.classList.add("result")
        createImgHolder.classList.add("result-img")
        createInfo.classList.add("result-info")

        searchItems.push(response.items[i].volumeInfo) // push items that the user searched for

        if (searchItems[i].readingModes.image === true) {
            createImg.setAttribute("src", searchItems[i].imageLinks.smallThumbnail)
        } else{
            createImg.setAttribute("src", "https://via.placeholder.com/150")
        }
        createResults.appendChild(createResult)
        createImgHolder.appendChild(createImg)
        createResult.appendChild(createImgHolder)
        createResult.appendChild(createInfo)

        createTitle.appendChild(document.createTextNode(searchItems[i].title))
        createDate.appendChild(document.createTextNode(searchItems[i].publishedDate))
        createAuthor.appendChild(document.createTextNode(searchItems[i].authors))
        if (searchItems[i].readingModes.text === true) {
            createDescription.appendChild(document.createTextNode(searchItems[i].description))
        } else{
        }
        
        createInfo.appendChild(createTitle)
        createInfo.appendChild(createDate)
        createInfo.appendChild(createAuthor)
        createInfo.appendChild(createDescription)

        theForm.appendChild(createResults)

        // Check The Length of Paragraph
        function truncateText(selector, maxLength) {
            let element = document.querySelector(selector),
                truncated = element.innerText;
        
            if (truncated.length > maxLength) {
                truncated = truncated.substr(0,maxLength) + '...';
            }
            return truncated;
        }
        
        document.querySelector(".result-info p").innerText = truncateText('.result-info p', 200);


        // Add Event Click On Elements
        let elements = Array.from(document.querySelectorAll(".results .result"));

        elements[i].addEventListener("click", function () {
            let informations = searchItems[elements.indexOf(this)]
            chosenItems.push(informations)
            let createBook = document.createElement("li");
            createBook.appendChild(document.createTextNode(informations.title))
            booksName.appendChild(createBook)
            this.style.display = "none"
        });
    }
    
}

// On submit - Calc The Pages
submit.addEventListener("click", (e) => {
    document.querySelector(".result-holder").style.display = "block"
    e.preventDefault();
    let pageCount = 0;
    chosenItems.forEach(ele => {
        pageCount += ele.pageCount
        // Calc The Pages
        document.getElementById("pageCount").innerHTML = pageCount
        // Books Count
        document.getElementById("booksCount").innerHTML = chosenItems.length
        // Hours Spent
        document.getElementById("hours").innerHTML = Math.round((pageCount * 1.7) / 60)
        // Words Read
        document.getElementById("words").innerHTML = pageCount * 250 / 1000000
        // Favorite Author
        document.getElementById("author").innerHTML = "Unknown"
    });

});;