import {sayHello} from './modules/greeting';
import {sum, product} from './modules/math-functions';

let lastPage=56;
let pageNumber;
let searchTerm;
let category = 'nature';
const image_type = 'photo';
let header = document.querySelector('#header');
let imagesContainer = document.querySelector('#imagesContainer');
let paginationContainer = document.querySelector('#paginationContainer');

let loadSearchBox = function(){
   let searchBox = document.createElement('form');

   searchBox.id = 'searchBox'; 
   searchBox.innerHTML = 
     `<center>
        <input type="text" name='searchTerm' value=''>
     </center>
     <br>`;
   header.appendChild(searchBox);

   searchBox.addEventListener('submit', function(evt){
      evt.preventDefault();
      let input = searchBox.elements;
      searchTerm = input['searchTerm'].value;
      console.log('The current search is: ',searchTerm);
      refreshDOM(1,searchTerm);
   });
}

let loadHeader = function(pageNumber) {
    header.innerHTML = '';
    let headerTitle = document.createElement('h3');
    if(typeof searchTerm !== 'undefined'){
        headerTitle.innerHTML = `Viewing Page ${pageNumber} for searchTerm "${searchTerm}"`
    } else {
      headerTitle.innerHTML = `Welcome to the Pixabay Search UX`
    }

    header.appendChild(headerTitle);
};

  
let loadImages = function(pageNumber, searchTerm){
    let midPaginationBtn;
    imagesContainer.innerHTML = '';
    
    if(typeof searchTerm !== 'undefined'){
        category = searchTerm;
    }

    $.get("https://pixabay.com/api", 
        {key: '9648595-648ea08d9441c4123d7acaff0',
         image_type: image_type,
         q: category,
         page: pageNumber,
         per_page: 9
    }, 
        function( data ) {
            if(!data.totalHits){
                handleZeroResults();
                return;
            }
            lastPage = Math.ceil(data.totalHits/9);
            if (pageNumber < 4){
               loadPaginationBtns(4);
            } else if (pageNumber>(lastPage-3)){
               loadPaginationBtns(lastPage-3);
            } else {
               loadPaginationBtns(pageNumber);
            }

            //Populate the Images Container
            let images = data.hits;
            let i=0;
            for (i = 0; i < images.length; i++) { 
                let imageDiv = document.createElement("div");
                imageDiv.classList.add("imageBox");
                imageDiv.innerHTML = 
                `<img class='imgPreview' src='${images[i].webformatURL}'>
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

let handleZeroResults = function(){
   let searchAgainBox = document.createElement('div');
   searchAgainBox.innerHTML = 
     `<center>
        <p>Ain't found nothing, muchacho. Please search again 🙄</p>
     </center>`;
   header.appendChild(searchAgainBox);
   paginationContainer.innerHTML = '';
}

let refreshDOM = function(pageToLoad, searchTerm){
    if (1 > pageToLoad || pageToLoad > lastPage) {
       return;
    }
    // set global pageNumber variable
    pageNumber = pageToLoad;
    loadHeader(pageToLoad);
    loadSearchBox();
    loadImages(pageToLoad, searchTerm);
}

let initDOM = function(pageToLoad){
    loadHeader(pageToLoad);
    loadSearchBox();
    loadImages(pageToLoad);
}

initDOM(1);


