/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_greeting__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/greeting */ \"./src/modules/greeting.js\");\n/* harmony import */ var _modules_math_functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/math-functions */ \"./src/modules/math-functions.js\");\n\n\n\nlet lastPage=56;\nlet pageNumber;\nlet searchTerm;\nlet category = 'nature';\nconst image_type = 'photo';\nlet header = document.querySelector('#header');\nlet imagesContainer = document.querySelector('#imagesContainer');\nlet paginationContainer = document.querySelector('#paginationContainer');\n\nlet loadSearchBox = function(){\n   let searchBox = document.createElement('form');\n\n   searchBox.id = 'searchBox'; \n   searchBox.innerHTML = \n     `<center>\n        <input type=\"text\" name='searchTerm' value=''>\n     </center>\n     <br>`;\n   header.appendChild(searchBox);\n\n   searchBox.addEventListener('submit', function(evt){\n      evt.preventDefault();\n      let input = searchBox.elements;\n      searchTerm = input['searchTerm'].value;\n      console.log('The current search is: ',searchTerm);\n      refreshDOM(1,searchTerm);\n   });\n}\n\nlet loadHeader = function(pageNumber) {\n    header.innerHTML = '';\n    let headerTitle = document.createElement('h3');\n    if(typeof searchTerm !== 'undefined'){\n        headerTitle.innerHTML = `Viewing Page ${pageNumber} for searchTerm \"${searchTerm}\"`\n    } else {\n      headerTitle.innerHTML = `Welcome to the Pixabay Search UX`\n    }\n\n    header.appendChild(headerTitle);\n};\n\n  \nlet loadImages = function(pageNumber, searchTerm){\n    let midPaginationBtn;\n    imagesContainer.innerHTML = '';\n    \n    if(typeof searchTerm !== 'undefined'){\n        category = searchTerm;\n    }\n\n    $.get(\"https://pixabay.com/api\", \n        {key: '9648595-648ea08d9441c4123d7acaff0',\n         image_type: image_type,\n         q: category,\n         page: pageNumber,\n         per_page: 9\n    }, \n        function( data ) {\n            if(!data.totalHits){\n                handleZeroResults();\n                return;\n            }\n            lastPage = Math.ceil(data.totalHits/9);\n            if (pageNumber < 4){\n               loadPaginationBtns(4);\n            } else if (pageNumber>(lastPage-3)){\n               loadPaginationBtns(lastPage-3);\n            } else {\n               loadPaginationBtns(pageNumber);\n            }\n\n            //Populate the Images Container\n            let images = data.hits;\n            let i=0;\n            for (i = 0; i < images.length; i++) { \n                let imageDiv = document.createElement(\"div\");\n                imageDiv.classList.add(\"imageBox\");\n                imageDiv.innerHTML = \n                `<img class='imgPreview' src='${images[i].webformatURL}'>\n                <img class='avatar' src='${images[i].userImageURL}'>\n                <p class='username'>\n                <a target=\"_blank\" href='https://pixabay.com/users/${images[i].user}'+'-'+${images[i].user_id}>${images[i].user}</a>\n                </p>`\n                imagesContainer.appendChild(imageDiv);\n            }\n     })\n};\n\n  \n//Populate the Pagination Section\nlet loadPaginationBtns = function(midPaginationBtn){\n   paginationContainer.innerHTML = '';\n\n   let paginationButtonsList = document.createElement(\"ul\");\n   paginationButtonsList.classList.add(\"theButtonsList\"); \n   paginationButtonsList.innerHTML = \n\n      `<li class=\"button\" onclick=\"refreshDOM(${pageNumber-1})\"><a>«</a></li>\n      <li class=\"button\" onclick=\"refreshDOM(1)\"><a>1</a></li>\n      <li class=\"button\" onclick=\"refreshDOM(${midPaginationBtn-2})\">${midPaginationBtn-2}</a></li>\n      <li class=\"button\" onclick=\"refreshDOM(${midPaginationBtn-1})\">${midPaginationBtn-1}</a></li>\n      <li id=\"pageNumber\" class=\"button\" onclick=\"refreshDOM(${midPaginationBtn})\">${midPaginationBtn}</a></li>\n      <li class=\"button\" onclick=\"refreshDOM(${midPaginationBtn+1})\">${midPaginationBtn+1}</a></li>\n      <li class=\"button\" onclick=\"refreshDOM(${midPaginationBtn+2})\">${midPaginationBtn+2}</a></li>\n      <li class=\"button\" onclick=\"refreshDOM(${lastPage})\">${lastPage}</li>\n      <li class=\"button\" onclick=\"refreshDOM(${pageNumber+1})\">»</a></li>`\n\n      paginationContainer.appendChild(paginationButtonsList);      \n}\n\nlet handleZeroResults = function(){\n   let searchAgainBox = document.createElement('div');\n   searchAgainBox.innerHTML = \n     `<center>\n        <p>Ain't found nothing, muchacho. Please search again 🙄</p>\n     </center>`;\n   header.appendChild(searchAgainBox);\n   paginationContainer.innerHTML = '';\n}\n\nlet refreshDOM = function(pageToLoad, searchTerm){\n    if (1 > pageToLoad || pageToLoad > lastPage) {\n       return;\n    }\n    // set global pageNumber variable\n    pageNumber = pageToLoad;\n    loadHeader(pageToLoad);\n    loadSearchBox();\n    loadImages(pageToLoad, searchTerm);\n}\n\nlet initDOM = function(pageToLoad){\n    loadHeader(pageToLoad);\n    loadSearchBox();\n    loadImages(pageToLoad);\n}\n\ninitDOM(1);\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXBwLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5qcz8xMTEyIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7c2F5SGVsbG99IGZyb20gJy4vbW9kdWxlcy9ncmVldGluZyc7XG5pbXBvcnQge3N1bSwgcHJvZHVjdH0gZnJvbSAnLi9tb2R1bGVzL21hdGgtZnVuY3Rpb25zJztcblxubGV0IGxhc3RQYWdlPTU2O1xubGV0IHBhZ2VOdW1iZXI7XG5sZXQgc2VhcmNoVGVybTtcbmxldCBjYXRlZ29yeSA9ICduYXR1cmUnO1xuY29uc3QgaW1hZ2VfdHlwZSA9ICdwaG90byc7XG5sZXQgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2hlYWRlcicpO1xubGV0IGltYWdlc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbWFnZXNDb250YWluZXInKTtcbmxldCBwYWdpbmF0aW9uQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BhZ2luYXRpb25Db250YWluZXInKTtcblxubGV0IGxvYWRTZWFyY2hCb3ggPSBmdW5jdGlvbigpe1xuICAgbGV0IHNlYXJjaEJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcblxuICAgc2VhcmNoQm94LmlkID0gJ3NlYXJjaEJveCc7IFxuICAgc2VhcmNoQm94LmlubmVySFRNTCA9IFxuICAgICBgPGNlbnRlcj5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT0nc2VhcmNoVGVybScgdmFsdWU9Jyc+XG4gICAgIDwvY2VudGVyPlxuICAgICA8YnI+YDtcbiAgIGhlYWRlci5hcHBlbmRDaGlsZChzZWFyY2hCb3gpO1xuXG4gICBzZWFyY2hCb3guYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24oZXZ0KXtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbGV0IGlucHV0ID0gc2VhcmNoQm94LmVsZW1lbnRzO1xuICAgICAgc2VhcmNoVGVybSA9IGlucHV0WydzZWFyY2hUZXJtJ10udmFsdWU7XG4gICAgICBjb25zb2xlLmxvZygnVGhlIGN1cnJlbnQgc2VhcmNoIGlzOiAnLHNlYXJjaFRlcm0pO1xuICAgICAgcmVmcmVzaERPTSgxLHNlYXJjaFRlcm0pO1xuICAgfSk7XG59XG5cbmxldCBsb2FkSGVhZGVyID0gZnVuY3Rpb24ocGFnZU51bWJlcikge1xuICAgIGhlYWRlci5pbm5lckhUTUwgPSAnJztcbiAgICBsZXQgaGVhZGVyVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICAgIGlmKHR5cGVvZiBzZWFyY2hUZXJtICE9PSAndW5kZWZpbmVkJyl7XG4gICAgICAgIGhlYWRlclRpdGxlLmlubmVySFRNTCA9IGBWaWV3aW5nIFBhZ2UgJHtwYWdlTnVtYmVyfSBmb3Igc2VhcmNoVGVybSBcIiR7c2VhcmNoVGVybX1cImBcbiAgICB9IGVsc2Uge1xuICAgICAgaGVhZGVyVGl0bGUuaW5uZXJIVE1MID0gYFdlbGNvbWUgdG8gdGhlIFBpeGFiYXkgU2VhcmNoIFVYYFxuICAgIH1cblxuICAgIGhlYWRlci5hcHBlbmRDaGlsZChoZWFkZXJUaXRsZSk7XG59O1xuXG4gIFxubGV0IGxvYWRJbWFnZXMgPSBmdW5jdGlvbihwYWdlTnVtYmVyLCBzZWFyY2hUZXJtKXtcbiAgICBsZXQgbWlkUGFnaW5hdGlvbkJ0bjtcbiAgICBpbWFnZXNDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgXG4gICAgaWYodHlwZW9mIHNlYXJjaFRlcm0gIT09ICd1bmRlZmluZWQnKXtcbiAgICAgICAgY2F0ZWdvcnkgPSBzZWFyY2hUZXJtO1xuICAgIH1cblxuICAgICQuZ2V0KFwiaHR0cHM6Ly9waXhhYmF5LmNvbS9hcGlcIiwgXG4gICAgICAgIHtrZXk6ICc5NjQ4NTk1LTY0OGVhMDhkOTQ0MWM0MTIzZDdhY2FmZjAnLFxuICAgICAgICAgaW1hZ2VfdHlwZTogaW1hZ2VfdHlwZSxcbiAgICAgICAgIHE6IGNhdGVnb3J5LFxuICAgICAgICAgcGFnZTogcGFnZU51bWJlcixcbiAgICAgICAgIHBlcl9wYWdlOiA5XG4gICAgfSwgXG4gICAgICAgIGZ1bmN0aW9uKCBkYXRhICkge1xuICAgICAgICAgICAgaWYoIWRhdGEudG90YWxIaXRzKXtcbiAgICAgICAgICAgICAgICBoYW5kbGVaZXJvUmVzdWx0cygpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxhc3RQYWdlID0gTWF0aC5jZWlsKGRhdGEudG90YWxIaXRzLzkpO1xuICAgICAgICAgICAgaWYgKHBhZ2VOdW1iZXIgPCA0KXtcbiAgICAgICAgICAgICAgIGxvYWRQYWdpbmF0aW9uQnRucyg0KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGFnZU51bWJlcj4obGFzdFBhZ2UtMykpe1xuICAgICAgICAgICAgICAgbG9hZFBhZ2luYXRpb25CdG5zKGxhc3RQYWdlLTMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgIGxvYWRQYWdpbmF0aW9uQnRucyhwYWdlTnVtYmVyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9Qb3B1bGF0ZSB0aGUgSW1hZ2VzIENvbnRhaW5lclxuICAgICAgICAgICAgbGV0IGltYWdlcyA9IGRhdGEuaGl0cztcbiAgICAgICAgICAgIGxldCBpPTA7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgaW1hZ2VzLmxlbmd0aDsgaSsrKSB7IFxuICAgICAgICAgICAgICAgIGxldCBpbWFnZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgaW1hZ2VEaXYuY2xhc3NMaXN0LmFkZChcImltYWdlQm94XCIpO1xuICAgICAgICAgICAgICAgIGltYWdlRGl2LmlubmVySFRNTCA9IFxuICAgICAgICAgICAgICAgIGA8aW1nIGNsYXNzPSdpbWdQcmV2aWV3JyBzcmM9JyR7aW1hZ2VzW2ldLndlYmZvcm1hdFVSTH0nPlxuICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9J2F2YXRhcicgc3JjPScke2ltYWdlc1tpXS51c2VySW1hZ2VVUkx9Jz5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz0ndXNlcm5hbWUnPlxuICAgICAgICAgICAgICAgIDxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9J2h0dHBzOi8vcGl4YWJheS5jb20vdXNlcnMvJHtpbWFnZXNbaV0udXNlcn0nKyctJyske2ltYWdlc1tpXS51c2VyX2lkfT4ke2ltYWdlc1tpXS51c2VyfTwvYT5cbiAgICAgICAgICAgICAgICA8L3A+YFxuICAgICAgICAgICAgICAgIGltYWdlc0NvbnRhaW5lci5hcHBlbmRDaGlsZChpbWFnZURpdik7XG4gICAgICAgICAgICB9XG4gICAgIH0pXG59O1xuXG4gIFxuLy9Qb3B1bGF0ZSB0aGUgUGFnaW5hdGlvbiBTZWN0aW9uXG5sZXQgbG9hZFBhZ2luYXRpb25CdG5zID0gZnVuY3Rpb24obWlkUGFnaW5hdGlvbkJ0bil7XG4gICBwYWdpbmF0aW9uQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuXG4gICBsZXQgcGFnaW5hdGlvbkJ1dHRvbnNMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpO1xuICAgcGFnaW5hdGlvbkJ1dHRvbnNMaXN0LmNsYXNzTGlzdC5hZGQoXCJ0aGVCdXR0b25zTGlzdFwiKTsgXG4gICBwYWdpbmF0aW9uQnV0dG9uc0xpc3QuaW5uZXJIVE1MID0gXG5cbiAgICAgIGA8bGkgY2xhc3M9XCJidXR0b25cIiBvbmNsaWNrPVwicmVmcmVzaERPTSgke3BhZ2VOdW1iZXItMX0pXCI+PGE+wqs8L2E+PC9saT5cbiAgICAgIDxsaSBjbGFzcz1cImJ1dHRvblwiIG9uY2xpY2s9XCJyZWZyZXNoRE9NKDEpXCI+PGE+MTwvYT48L2xpPlxuICAgICAgPGxpIGNsYXNzPVwiYnV0dG9uXCIgb25jbGljaz1cInJlZnJlc2hET00oJHttaWRQYWdpbmF0aW9uQnRuLTJ9KVwiPiR7bWlkUGFnaW5hdGlvbkJ0bi0yfTwvYT48L2xpPlxuICAgICAgPGxpIGNsYXNzPVwiYnV0dG9uXCIgb25jbGljaz1cInJlZnJlc2hET00oJHttaWRQYWdpbmF0aW9uQnRuLTF9KVwiPiR7bWlkUGFnaW5hdGlvbkJ0bi0xfTwvYT48L2xpPlxuICAgICAgPGxpIGlkPVwicGFnZU51bWJlclwiIGNsYXNzPVwiYnV0dG9uXCIgb25jbGljaz1cInJlZnJlc2hET00oJHttaWRQYWdpbmF0aW9uQnRufSlcIj4ke21pZFBhZ2luYXRpb25CdG59PC9hPjwvbGk+XG4gICAgICA8bGkgY2xhc3M9XCJidXR0b25cIiBvbmNsaWNrPVwicmVmcmVzaERPTSgke21pZFBhZ2luYXRpb25CdG4rMX0pXCI+JHttaWRQYWdpbmF0aW9uQnRuKzF9PC9hPjwvbGk+XG4gICAgICA8bGkgY2xhc3M9XCJidXR0b25cIiBvbmNsaWNrPVwicmVmcmVzaERPTSgke21pZFBhZ2luYXRpb25CdG4rMn0pXCI+JHttaWRQYWdpbmF0aW9uQnRuKzJ9PC9hPjwvbGk+XG4gICAgICA8bGkgY2xhc3M9XCJidXR0b25cIiBvbmNsaWNrPVwicmVmcmVzaERPTSgke2xhc3RQYWdlfSlcIj4ke2xhc3RQYWdlfTwvbGk+XG4gICAgICA8bGkgY2xhc3M9XCJidXR0b25cIiBvbmNsaWNrPVwicmVmcmVzaERPTSgke3BhZ2VOdW1iZXIrMX0pXCI+wrs8L2E+PC9saT5gXG5cbiAgICAgIHBhZ2luYXRpb25Db250YWluZXIuYXBwZW5kQ2hpbGQocGFnaW5hdGlvbkJ1dHRvbnNMaXN0KTsgICAgICBcbn1cblxubGV0IGhhbmRsZVplcm9SZXN1bHRzID0gZnVuY3Rpb24oKXtcbiAgIGxldCBzZWFyY2hBZ2FpbkJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgc2VhcmNoQWdhaW5Cb3guaW5uZXJIVE1MID0gXG4gICAgIGA8Y2VudGVyPlxuICAgICAgICA8cD5BaW4ndCBmb3VuZCBub3RoaW5nLCBtdWNoYWNoby4gUGxlYXNlIHNlYXJjaCBhZ2FpbiDwn5mEPC9wPlxuICAgICA8L2NlbnRlcj5gO1xuICAgaGVhZGVyLmFwcGVuZENoaWxkKHNlYXJjaEFnYWluQm94KTtcbiAgIHBhZ2luYXRpb25Db250YWluZXIuaW5uZXJIVE1MID0gJyc7XG59XG5cbmxldCByZWZyZXNoRE9NID0gZnVuY3Rpb24ocGFnZVRvTG9hZCwgc2VhcmNoVGVybSl7XG4gICAgaWYgKDEgPiBwYWdlVG9Mb2FkIHx8IHBhZ2VUb0xvYWQgPiBsYXN0UGFnZSkge1xuICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gc2V0IGdsb2JhbCBwYWdlTnVtYmVyIHZhcmlhYmxlXG4gICAgcGFnZU51bWJlciA9IHBhZ2VUb0xvYWQ7XG4gICAgbG9hZEhlYWRlcihwYWdlVG9Mb2FkKTtcbiAgICBsb2FkU2VhcmNoQm94KCk7XG4gICAgbG9hZEltYWdlcyhwYWdlVG9Mb2FkLCBzZWFyY2hUZXJtKTtcbn1cblxubGV0IGluaXRET00gPSBmdW5jdGlvbihwYWdlVG9Mb2FkKXtcbiAgICBsb2FkSGVhZGVyKHBhZ2VUb0xvYWQpO1xuICAgIGxvYWRTZWFyY2hCb3goKTtcbiAgICBsb2FkSW1hZ2VzKHBhZ2VUb0xvYWQpO1xufVxuXG5pbml0RE9NKDEpO1xuXG5cbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/app.js\n");

/***/ }),

/***/ "./src/modules/greeting.js":
/*!*********************************!*\
  !*** ./src/modules/greeting.js ***!
  \*********************************/
/*! exports provided: sayHello */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sayHello\", function() { return sayHello; });\nconst sayHello = (greeting) => {\n    const currentHour = new Date().getHours();\n    let timeGreeting = 'Good morning!';\n\n    if (currentHour >= 12 && currentHour <= 17) {\n        timeGreeting = 'Good afternoon!';\n    } else if (currentHour >= 17) {\n        timeGreeting = 'Good evening!';\n    }\n\n    return `${timeGreeting} ${greeting}`;\n}\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbW9kdWxlcy9ncmVldGluZy5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL2dyZWV0aW5nLmpzPzIwMDciXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc2F5SGVsbG8gPSAoZ3JlZXRpbmcpID0+IHtcbiAgICBjb25zdCBjdXJyZW50SG91ciA9IG5ldyBEYXRlKCkuZ2V0SG91cnMoKTtcbiAgICBsZXQgdGltZUdyZWV0aW5nID0gJ0dvb2QgbW9ybmluZyEnO1xuXG4gICAgaWYgKGN1cnJlbnRIb3VyID49IDEyICYmIGN1cnJlbnRIb3VyIDw9IDE3KSB7XG4gICAgICAgIHRpbWVHcmVldGluZyA9ICdHb29kIGFmdGVybm9vbiEnO1xuICAgIH0gZWxzZSBpZiAoY3VycmVudEhvdXIgPj0gMTcpIHtcbiAgICAgICAgdGltZUdyZWV0aW5nID0gJ0dvb2QgZXZlbmluZyEnO1xuICAgIH1cblxuICAgIHJldHVybiBgJHt0aW1lR3JlZXRpbmd9ICR7Z3JlZXRpbmd9YDtcbn1cblxuZXhwb3J0IHtzYXlIZWxsb307XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/modules/greeting.js\n");

/***/ }),

/***/ "./src/modules/math-functions.js":
/*!***************************************!*\
  !*** ./src/modules/math-functions.js ***!
  \***************************************/
/*! exports provided: sum, product */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sum\", function() { return sum; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"product\", function() { return product; });\nconst sum = (a, b) => {\n    return a + b;\n};\n\nconst product = (a, b) => {\n    return a * b;\n};\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbW9kdWxlcy9tYXRoLWZ1bmN0aW9ucy5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL21hdGgtZnVuY3Rpb25zLmpzPzJlZTgiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc3VtID0gKGEsIGIpID0+IHtcbiAgICByZXR1cm4gYSArIGI7XG59O1xuXG5jb25zdCBwcm9kdWN0ID0gKGEsIGIpID0+IHtcbiAgICByZXR1cm4gYSAqIGI7XG59O1xuXG5leHBvcnQge3N1bSwgcHJvZHVjdH07XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/modules/math-functions.js\n");

/***/ })

/******/ });