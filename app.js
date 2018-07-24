let lastPage;
let currentPage = 1;
const image_type = 'photo';
const category = 'nature';
let imagesContainer = document.querySelector('#imagesContainer');
let paginationContainer = document.querySelector('#paginationContainer');

let loadImages = function(currentPage){
    var midPaginationBtn;
        
    if (1 > currentPage || currentPage > lastPage){
       return;
    }

    imagesContainer.innerHTML = '';
    paginationContainer.innerHTML = '';
        
    $.get("https://pixabay.com/api", 
        {key: '9463119-69ef5d64c755fd0eb340937ae',
         image_type: image_type,
         category: category,
         page: currentPage,
         per_page: 9
    }, 
        function( data ) {
            let total = data.totalHits;
            lastPage = Math.ceil(data.totalHits/9);
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
                imagesContainer.appendChild(imageDiv)
            }

      //Populate the Pagination Section
      let loadPaginationBtns = function(midPaginationBtn){
          let paginationButtonsList = document.createElement("ul");
          paginationButtonsList.classList.add("theButtonsList"); 
          paginationButtonsList.innerHTML = 

          `<li class="button" onclick="loadImages(${currentPage-1})"><a>«</a></li>
          <li class="button" onclick="loadImages(1)"><a>1</a></li>
          <li class="button" onclick="loadImages(${midPaginationBtn-2})">${midPaginationBtn-2}</a></li>
          <li class="button" onclick="loadImages(${midPaginationBtn-1})">${midPaginationBtn-1}</a></li>
          <li id="currentPage" class="button" onclick="loadImages(${midPaginationBtn})">${midPaginationBtn}</a></li>
          <li class="button" onclick="loadImages(${midPaginationBtn+1})">${midPaginationBtn+1}</a></li>
          <li class="button" onclick="loadImages(${midPaginationBtn+2})">${midPaginationBtn+2}</a></li>
          <li class="button" onclick="loadImages(${lastPage})">${lastPage}</li>
          <li class="button" onclick="loadImages(${currentPage+1})">»</a></li>`

          paginationContainer.appendChild(paginationButtonsList);      
      }

      if (currentPage < 4){
          loadPaginationBtns(4);
      } else if (currentPage>(lastPage-3)){
          loadPaginationBtns(lastPage-3);
      } else {
          loadPaginationBtns(currentPage);
      } 
  });
}

loadImages(currentPage);