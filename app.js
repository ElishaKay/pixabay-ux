let lastPage;
let pageNumber;
let searchBox;
const image_type = 'photo';
const category = 'nature';
let header = document.querySelector('#header');
let imagesContainer = document.querySelector('#imagesContainer');
let paginationContainer = document.querySelector('#paginationContainer');

let loadSearchBox = function(){
   let searchBox = document.createElement('form');
   // searchBox.setAttribute('onsubmit', 'executeSearch();return false;');

   searchBox.id = 'searchBox'; 
   searchBox.innerHTML = 
     `<center>
        <input type="text" name='searchTerm'>
     </center>
     <br>`;
   header.appendChild(searchBox);

   searchBox.addEventListener('submit', function(evt){
    evt.preventDefault();
    let input = searchBox.elements;
    let searchTerm = input['searchTerm'];
    console.log(searchTerm);
   });
}

let loadHeader = function(pageNumber) {
    header.innerHTML = '';
    let headerTitle = document.createElement('h1');
    headerTitle.innerHTML = `Viewing Page ${pageNumber}`
    header.appendChild(headerTitle);
};

  
let loadImages = function(pageNumber){
    let midPaginationBtn;

    imagesContainer.innerHTML = '';
        
    $.get("https://pixabay.com/api", 
        {key: '9463119-69ef5d64c755fd0eb340937ae',
         image_type: image_type,
         category: category,
         page: pageNumber,
         per_page: 9
    }, 
        function( data ) {
            let total = data.totalHits;
            lastPage = Math.ceil(data.totalHits/9);
            if (pageNumber < 4){
               loadPaginationBtns(4);
            } else if (pageNumber>(lastPage-3)){
               loadPaginationBtns(lastPage-3);
            } else {
               loadPaginationBtns(pageNumber);
            }
            console.log(data);

            //Populate the Images Container
            let images = data.hits;
            for (i = 0; i < images.length; i++) { 
                let imageDiv = document.createElement("div");
                imageDiv.classList.add("imageBox");
                imageDiv.innerHTML = 
                `<img class='imgPreview' src='${images[i].largeImageURL}'>
                <img class='avatar' src='${images[i].userImageURL}'>
                <p class='username'>
                <a target="_blank" href='https://pixabay.com/users/${images[i].user}'+'-'+${images[i].user_id}>${images[i].user}</a>
                </p>`
                imagesContainer.appendChild(imageDiv);
            }
     })
};

  
//Populate the Pagination Section
let loadPaginationBtns = function(midPaginationBtn){
   paginationContainer.innerHTML = '';

   let paginationButtonsList = document.createElement("ul");
   paginationButtonsList.classList.add("theButtonsList"); 
   paginationButtonsList.innerHTML = 

      `<li class="button" onclick="refreshDOM(${pageNumber-1})"><a>«</a></li>
      <li class="button" onclick="refreshDOM(1)"><a>1</a></li>
      <li class="button" onclick="refreshDOM(${midPaginationBtn-2})">${midPaginationBtn-2}</a></li>
      <li class="button" onclick="refreshDOM(${midPaginationBtn-1})">${midPaginationBtn-1}</a></li>
      <li id="pageNumber" class="button" onclick="refreshDOM(${midPaginationBtn})">${midPaginationBtn}</a></li>
      <li class="button" onclick="refreshDOM(${midPaginationBtn+1})">${midPaginationBtn+1}</a></li>
      <li class="button" onclick="refreshDOM(${midPaginationBtn+2})">${midPaginationBtn+2}</a></li>
      <li class="button" onclick="refreshDOM(${lastPage})">${lastPage}</li>
      <li class="button" onclick="refreshDOM(${pageNumber+1})">»</a></li>`

      paginationContainer.appendChild(paginationButtonsList);      
}

let refreshDOM = function(pageToLoad){
    if (1 > pageToLoad || pageToLoad > lastPage){
       return;
    }
    // set global pageNumber variable
    pageNumber = pageToLoad;
    loadHeader(pageToLoad);
    loadSearchBox();
    loadImages(pageToLoad);
}

 
refreshDOM(1);


