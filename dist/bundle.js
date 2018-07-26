var GS =
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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_greeting__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/greeting */ \"./src/modules/greeting.js\");\n/* harmony import */ var _modules_math_functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/math-functions */ \"./src/modules/math-functions.js\");\n\n\n\n// define GlobalScope\nlet GS = {};\n\nlet lastPage=56;\nlet pageNumber;\nlet searchTerm;\nlet category = 'nature';\nconst image_type = 'photo';\nlet header = document.querySelector('#header');\nlet imagesContainer = document.querySelector('#imagesContainer');\nlet paginationContainer = document.querySelector('#paginationContainer');\n\nlet loadSearchBox = function(){\n   let searchBox = document.createElement('form');\n\n   searchBox.id = 'searchBox'; \n   searchBox.innerHTML = \n     `<center>\n        <input type=\"text\" name='searchTerm' value=''>\n     </center>\n     <br>`;\n   header.appendChild(searchBox);\n\n   searchBox.addEventListener('submit', function(evt){\n      evt.preventDefault();\n      let input = searchBox.elements;\n      searchTerm = input['searchTerm'].value;\n      console.log('The current search is: ',searchTerm);\n      refreshDOM(1,searchTerm);\n   });\n}\n\nlet loadHeader = function(pageNumber) {\n    header.innerHTML = '';\n    let headerTitle = document.createElement('h3');\n    if(typeof searchTerm !== 'undefined'){\n        headerTitle.innerHTML = `Viewing Page ${pageNumber} for searchTerm \"${searchTerm}\"`\n    } else {\n      headerTitle.innerHTML = `Welcome to the Pixabay Search UX`\n    }\n\n    header.appendChild(headerTitle);\n};\n\n  \nlet loadImages = function(pageNumber, searchTerm){\n    let midPaginationBtn;\n    imagesContainer.innerHTML = '';\n    \n    if(typeof searchTerm !== 'undefined'){\n        category = searchTerm;\n    }\n\n    $.get(\"https://pixabay.com/api\", \n        {key: '9648595-648ea08d9441c4123d7acaff0',\n         image_type: image_type,\n         q: category,\n         page: pageNumber,\n         per_page: 9\n    }, \n        function( data ) {\n            if(!data.totalHits){\n                handleZeroResults();\n                return;\n            }\n            lastPage = Math.ceil(data.totalHits/9);\n            if (pageNumber < 4){\n               loadPaginationBtns(4);\n            } else if (pageNumber>(lastPage-3)){\n               loadPaginationBtns(lastPage-3);\n            } else {\n               loadPaginationBtns(pageNumber);\n            }\n\n            //Populate the Images Container\n            let images = data.hits;\n            let i=0;\n            for (i = 0; i < images.length; i++) { \n                let imageDiv = document.createElement(\"div\");\n                imageDiv.classList.add(\"imageBox\");\n                imageDiv.innerHTML = \n                `<img class='imgPreview' src='${images[i].webformatURL}'>\n                <img class='avatar' src='${images[i].userImageURL}'>\n                <p class='username'>\n                <a target=\"_blank\" href='https://pixabay.com/users/${images[i].user}'+'-'+${images[i].user_id}>${images[i].user}</a>\n                </p>`\n                imagesContainer.appendChild(imageDiv);\n            }\n     })\n};\n\n  \n//Populate the Pagination Section\nlet loadPaginationBtns = function(midPaginationBtn){\n   paginationContainer.innerHTML = '';\n\n   let paginationButtonsList = document.createElement(\"ul\");\n   paginationButtonsList.classList.add(\"theButtonsList\"); \n   paginationButtonsList.innerHTML = \n\n      `<li class=\"button\" onclick=\"window.refreshDOM(${pageNumber-1})\"><a>«</a></li>\n      <li class=\"button\" onclick=\"window.refreshDOM(1)\"><a>1</a></li>\n      <li class=\"button\" onclick=\"window.refreshDOM(${midPaginationBtn-2})\">${midPaginationBtn-2}</a></li>\n      <li class=\"button\" onclick=\"window.refreshDOM(${midPaginationBtn-1})\">${midPaginationBtn-1}</a></li>\n      <li class=\"button\" onclick=\"window.refreshDOM(${midPaginationBtn})\">${midPaginationBtn}</a></li>\n      <li class=\"button\" onclick=\"window.refreshDOM(${midPaginationBtn+1})\">${midPaginationBtn+1}</a></li>\n      <li class=\"button\" onclick=\"window.refreshDOM(${midPaginationBtn+2})\">${midPaginationBtn+2}</a></li>\n      <li class=\"button\" onclick=\"window.refreshDOM(${lastPage})\">${lastPage}</li>\n      <li class=\"button\" onclick=\"window.refreshDOM(${pageNumber+1})\">»</a></li>`\n\n      paginationContainer.appendChild(paginationButtonsList);      \n}\n\nlet handleZeroResults = function(){\n   let searchAgainBox = document.createElement('div');\n   searchAgainBox.innerHTML = \n     `<center>\n        <p>Ain't found nothing, muchacho. Please search again 🙄</p>\n     </center>`;\n   header.appendChild(searchAgainBox);\n   paginationContainer.innerHTML = '';\n}\n\nwindow.refreshDOM = function(pageToLoad, searchTerm){\n    if (1 > pageToLoad || pageToLoad > lastPage) {\n       return;\n    }\n    // set global pageNumber variable\n    pageNumber = pageToLoad;\n    loadHeader(pageToLoad);\n    loadSearchBox();\n    loadImages(pageToLoad, searchTerm);\n}\n\nlet initDOM = function(pageToLoad){\n    loadHeader(pageToLoad);\n    loadSearchBox();\n    loadImages(pageToLoad);\n}\n\ninitDOM(1);\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (GS);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXBwLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vR1MvLi9zcmMvYXBwLmpzPzExMTIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtzYXlIZWxsb30gZnJvbSAnLi9tb2R1bGVzL2dyZWV0aW5nJztcbmltcG9ydCB7c3VtLCBwcm9kdWN0fSBmcm9tICcuL21vZHVsZXMvbWF0aC1mdW5jdGlvbnMnO1xuXG4vLyBkZWZpbmUgR2xvYmFsU2NvcGVcbmxldCBHUyA9IHt9O1xuXG5sZXQgbGFzdFBhZ2U9NTY7XG5sZXQgcGFnZU51bWJlcjtcbmxldCBzZWFyY2hUZXJtO1xubGV0IGNhdGVnb3J5ID0gJ25hdHVyZSc7XG5jb25zdCBpbWFnZV90eXBlID0gJ3Bob3RvJztcbmxldCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaGVhZGVyJyk7XG5sZXQgaW1hZ2VzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ltYWdlc0NvbnRhaW5lcicpO1xubGV0IHBhZ2luYXRpb25Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGFnaW5hdGlvbkNvbnRhaW5lcicpO1xuXG5sZXQgbG9hZFNlYXJjaEJveCA9IGZ1bmN0aW9uKCl7XG4gICBsZXQgc2VhcmNoQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuXG4gICBzZWFyY2hCb3guaWQgPSAnc2VhcmNoQm94JzsgXG4gICBzZWFyY2hCb3guaW5uZXJIVE1MID0gXG4gICAgIGA8Y2VudGVyPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPSdzZWFyY2hUZXJtJyB2YWx1ZT0nJz5cbiAgICAgPC9jZW50ZXI+XG4gICAgIDxicj5gO1xuICAgaGVhZGVyLmFwcGVuZENoaWxkKHNlYXJjaEJveCk7XG5cbiAgIHNlYXJjaEJveC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbihldnQpe1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBsZXQgaW5wdXQgPSBzZWFyY2hCb3guZWxlbWVudHM7XG4gICAgICBzZWFyY2hUZXJtID0gaW5wdXRbJ3NlYXJjaFRlcm0nXS52YWx1ZTtcbiAgICAgIGNvbnNvbGUubG9nKCdUaGUgY3VycmVudCBzZWFyY2ggaXM6ICcsc2VhcmNoVGVybSk7XG4gICAgICByZWZyZXNoRE9NKDEsc2VhcmNoVGVybSk7XG4gICB9KTtcbn1cblxubGV0IGxvYWRIZWFkZXIgPSBmdW5jdGlvbihwYWdlTnVtYmVyKSB7XG4gICAgaGVhZGVyLmlubmVySFRNTCA9ICcnO1xuICAgIGxldCBoZWFkZXJUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgaWYodHlwZW9mIHNlYXJjaFRlcm0gIT09ICd1bmRlZmluZWQnKXtcbiAgICAgICAgaGVhZGVyVGl0bGUuaW5uZXJIVE1MID0gYFZpZXdpbmcgUGFnZSAke3BhZ2VOdW1iZXJ9IGZvciBzZWFyY2hUZXJtIFwiJHtzZWFyY2hUZXJtfVwiYFxuICAgIH0gZWxzZSB7XG4gICAgICBoZWFkZXJUaXRsZS5pbm5lckhUTUwgPSBgV2VsY29tZSB0byB0aGUgUGl4YWJheSBTZWFyY2ggVVhgXG4gICAgfVxuXG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKGhlYWRlclRpdGxlKTtcbn07XG5cbiAgXG5sZXQgbG9hZEltYWdlcyA9IGZ1bmN0aW9uKHBhZ2VOdW1iZXIsIHNlYXJjaFRlcm0pe1xuICAgIGxldCBtaWRQYWdpbmF0aW9uQnRuO1xuICAgIGltYWdlc0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICBcbiAgICBpZih0eXBlb2Ygc2VhcmNoVGVybSAhPT0gJ3VuZGVmaW5lZCcpe1xuICAgICAgICBjYXRlZ29yeSA9IHNlYXJjaFRlcm07XG4gICAgfVxuXG4gICAgJC5nZXQoXCJodHRwczovL3BpeGFiYXkuY29tL2FwaVwiLCBcbiAgICAgICAge2tleTogJzk2NDg1OTUtNjQ4ZWEwOGQ5NDQxYzQxMjNkN2FjYWZmMCcsXG4gICAgICAgICBpbWFnZV90eXBlOiBpbWFnZV90eXBlLFxuICAgICAgICAgcTogY2F0ZWdvcnksXG4gICAgICAgICBwYWdlOiBwYWdlTnVtYmVyLFxuICAgICAgICAgcGVyX3BhZ2U6IDlcbiAgICB9LCBcbiAgICAgICAgZnVuY3Rpb24oIGRhdGEgKSB7XG4gICAgICAgICAgICBpZighZGF0YS50b3RhbEhpdHMpe1xuICAgICAgICAgICAgICAgIGhhbmRsZVplcm9SZXN1bHRzKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGFzdFBhZ2UgPSBNYXRoLmNlaWwoZGF0YS50b3RhbEhpdHMvOSk7XG4gICAgICAgICAgICBpZiAocGFnZU51bWJlciA8IDQpe1xuICAgICAgICAgICAgICAgbG9hZFBhZ2luYXRpb25CdG5zKDQpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwYWdlTnVtYmVyPihsYXN0UGFnZS0zKSl7XG4gICAgICAgICAgICAgICBsb2FkUGFnaW5hdGlvbkJ0bnMobGFzdFBhZ2UtMyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgbG9hZFBhZ2luYXRpb25CdG5zKHBhZ2VOdW1iZXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL1BvcHVsYXRlIHRoZSBJbWFnZXMgQ29udGFpbmVyXG4gICAgICAgICAgICBsZXQgaW1hZ2VzID0gZGF0YS5oaXRzO1xuICAgICAgICAgICAgbGV0IGk9MDtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBpbWFnZXMubGVuZ3RoOyBpKyspIHsgXG4gICAgICAgICAgICAgICAgbGV0IGltYWdlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICBpbWFnZURpdi5jbGFzc0xpc3QuYWRkKFwiaW1hZ2VCb3hcIik7XG4gICAgICAgICAgICAgICAgaW1hZ2VEaXYuaW5uZXJIVE1MID0gXG4gICAgICAgICAgICAgICAgYDxpbWcgY2xhc3M9J2ltZ1ByZXZpZXcnIHNyYz0nJHtpbWFnZXNbaV0ud2ViZm9ybWF0VVJMfSc+XG4gICAgICAgICAgICAgICAgPGltZyBjbGFzcz0nYXZhdGFyJyBzcmM9JyR7aW1hZ2VzW2ldLnVzZXJJbWFnZVVSTH0nPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPSd1c2VybmFtZSc+XG4gICAgICAgICAgICAgICAgPGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj0naHR0cHM6Ly9waXhhYmF5LmNvbS91c2Vycy8ke2ltYWdlc1tpXS51c2VyfScrJy0nKyR7aW1hZ2VzW2ldLnVzZXJfaWR9PiR7aW1hZ2VzW2ldLnVzZXJ9PC9hPlxuICAgICAgICAgICAgICAgIDwvcD5gXG4gICAgICAgICAgICAgICAgaW1hZ2VzQ29udGFpbmVyLmFwcGVuZENoaWxkKGltYWdlRGl2KTtcbiAgICAgICAgICAgIH1cbiAgICAgfSlcbn07XG5cbiAgXG4vL1BvcHVsYXRlIHRoZSBQYWdpbmF0aW9uIFNlY3Rpb25cbmxldCBsb2FkUGFnaW5hdGlvbkJ0bnMgPSBmdW5jdGlvbihtaWRQYWdpbmF0aW9uQnRuKXtcbiAgIHBhZ2luYXRpb25Db250YWluZXIuaW5uZXJIVE1MID0gJyc7XG5cbiAgIGxldCBwYWdpbmF0aW9uQnV0dG9uc0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XG4gICBwYWdpbmF0aW9uQnV0dG9uc0xpc3QuY2xhc3NMaXN0LmFkZChcInRoZUJ1dHRvbnNMaXN0XCIpOyBcbiAgIHBhZ2luYXRpb25CdXR0b25zTGlzdC5pbm5lckhUTUwgPSBcblxuICAgICAgYDxsaSBjbGFzcz1cImJ1dHRvblwiIG9uY2xpY2s9XCJ3aW5kb3cucmVmcmVzaERPTSgke3BhZ2VOdW1iZXItMX0pXCI+PGE+wqs8L2E+PC9saT5cbiAgICAgIDxsaSBjbGFzcz1cImJ1dHRvblwiIG9uY2xpY2s9XCJ3aW5kb3cucmVmcmVzaERPTSgxKVwiPjxhPjE8L2E+PC9saT5cbiAgICAgIDxsaSBjbGFzcz1cImJ1dHRvblwiIG9uY2xpY2s9XCJ3aW5kb3cucmVmcmVzaERPTSgke21pZFBhZ2luYXRpb25CdG4tMn0pXCI+JHttaWRQYWdpbmF0aW9uQnRuLTJ9PC9hPjwvbGk+XG4gICAgICA8bGkgY2xhc3M9XCJidXR0b25cIiBvbmNsaWNrPVwid2luZG93LnJlZnJlc2hET00oJHttaWRQYWdpbmF0aW9uQnRuLTF9KVwiPiR7bWlkUGFnaW5hdGlvbkJ0bi0xfTwvYT48L2xpPlxuICAgICAgPGxpIGNsYXNzPVwiYnV0dG9uXCIgb25jbGljaz1cIndpbmRvdy5yZWZyZXNoRE9NKCR7bWlkUGFnaW5hdGlvbkJ0bn0pXCI+JHttaWRQYWdpbmF0aW9uQnRufTwvYT48L2xpPlxuICAgICAgPGxpIGNsYXNzPVwiYnV0dG9uXCIgb25jbGljaz1cIndpbmRvdy5yZWZyZXNoRE9NKCR7bWlkUGFnaW5hdGlvbkJ0bisxfSlcIj4ke21pZFBhZ2luYXRpb25CdG4rMX08L2E+PC9saT5cbiAgICAgIDxsaSBjbGFzcz1cImJ1dHRvblwiIG9uY2xpY2s9XCJ3aW5kb3cucmVmcmVzaERPTSgke21pZFBhZ2luYXRpb25CdG4rMn0pXCI+JHttaWRQYWdpbmF0aW9uQnRuKzJ9PC9hPjwvbGk+XG4gICAgICA8bGkgY2xhc3M9XCJidXR0b25cIiBvbmNsaWNrPVwid2luZG93LnJlZnJlc2hET00oJHtsYXN0UGFnZX0pXCI+JHtsYXN0UGFnZX08L2xpPlxuICAgICAgPGxpIGNsYXNzPVwiYnV0dG9uXCIgb25jbGljaz1cIndpbmRvdy5yZWZyZXNoRE9NKCR7cGFnZU51bWJlcisxfSlcIj7CuzwvYT48L2xpPmBcblxuICAgICAgcGFnaW5hdGlvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChwYWdpbmF0aW9uQnV0dG9uc0xpc3QpOyAgICAgIFxufVxuXG5sZXQgaGFuZGxlWmVyb1Jlc3VsdHMgPSBmdW5jdGlvbigpe1xuICAgbGV0IHNlYXJjaEFnYWluQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICBzZWFyY2hBZ2FpbkJveC5pbm5lckhUTUwgPSBcbiAgICAgYDxjZW50ZXI+XG4gICAgICAgIDxwPkFpbid0IGZvdW5kIG5vdGhpbmcsIG11Y2hhY2hvLiBQbGVhc2Ugc2VhcmNoIGFnYWluIPCfmYQ8L3A+XG4gICAgIDwvY2VudGVyPmA7XG4gICBoZWFkZXIuYXBwZW5kQ2hpbGQoc2VhcmNoQWdhaW5Cb3gpO1xuICAgcGFnaW5hdGlvbkNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbn1cblxud2luZG93LnJlZnJlc2hET00gPSBmdW5jdGlvbihwYWdlVG9Mb2FkLCBzZWFyY2hUZXJtKXtcbiAgICBpZiAoMSA+IHBhZ2VUb0xvYWQgfHwgcGFnZVRvTG9hZCA+IGxhc3RQYWdlKSB7XG4gICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBzZXQgZ2xvYmFsIHBhZ2VOdW1iZXIgdmFyaWFibGVcbiAgICBwYWdlTnVtYmVyID0gcGFnZVRvTG9hZDtcbiAgICBsb2FkSGVhZGVyKHBhZ2VUb0xvYWQpO1xuICAgIGxvYWRTZWFyY2hCb3goKTtcbiAgICBsb2FkSW1hZ2VzKHBhZ2VUb0xvYWQsIHNlYXJjaFRlcm0pO1xufVxuXG5sZXQgaW5pdERPTSA9IGZ1bmN0aW9uKHBhZ2VUb0xvYWQpe1xuICAgIGxvYWRIZWFkZXIocGFnZVRvTG9hZCk7XG4gICAgbG9hZFNlYXJjaEJveCgpO1xuICAgIGxvYWRJbWFnZXMocGFnZVRvTG9hZCk7XG59XG5cbmluaXRET00oMSk7XG5cblxuZXhwb3J0IGRlZmF1bHQgR1M7Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/app.js\n");

/***/ }),

/***/ "./src/modules/greeting.js":
/*!*********************************!*\
  !*** ./src/modules/greeting.js ***!
  \*********************************/
/*! exports provided: sayHello */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sayHello\", function() { return sayHello; });\nconst sayHello = (greeting) => {\n    const currentHour = new Date().getHours();\n    let timeGreeting = 'Good morning!';\n\n    if (currentHour >= 12 && currentHour <= 17) {\n        timeGreeting = 'Good afternoon!';\n    } else if (currentHour >= 17) {\n        timeGreeting = 'Good evening!';\n    }\n\n    return `${timeGreeting} ${greeting}`;\n}\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbW9kdWxlcy9ncmVldGluZy5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovL0dTLy4vc3JjL21vZHVsZXMvZ3JlZXRpbmcuanM/MjAwNyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzYXlIZWxsbyA9IChncmVldGluZykgPT4ge1xuICAgIGNvbnN0IGN1cnJlbnRIb3VyID0gbmV3IERhdGUoKS5nZXRIb3VycygpO1xuICAgIGxldCB0aW1lR3JlZXRpbmcgPSAnR29vZCBtb3JuaW5nISc7XG5cbiAgICBpZiAoY3VycmVudEhvdXIgPj0gMTIgJiYgY3VycmVudEhvdXIgPD0gMTcpIHtcbiAgICAgICAgdGltZUdyZWV0aW5nID0gJ0dvb2QgYWZ0ZXJub29uISc7XG4gICAgfSBlbHNlIGlmIChjdXJyZW50SG91ciA+PSAxNykge1xuICAgICAgICB0aW1lR3JlZXRpbmcgPSAnR29vZCBldmVuaW5nISc7XG4gICAgfVxuXG4gICAgcmV0dXJuIGAke3RpbWVHcmVldGluZ30gJHtncmVldGluZ31gO1xufVxuXG5leHBvcnQge3NheUhlbGxvfTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/modules/greeting.js\n");

/***/ }),

/***/ "./src/modules/math-functions.js":
/*!***************************************!*\
  !*** ./src/modules/math-functions.js ***!
  \***************************************/
/*! exports provided: sum, product */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sum\", function() { return sum; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"product\", function() { return product; });\nconst sum = (a, b) => {\n    return a + b;\n};\n\nconst product = (a, b) => {\n    return a * b;\n};\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbW9kdWxlcy9tYXRoLWZ1bmN0aW9ucy5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovL0dTLy4vc3JjL21vZHVsZXMvbWF0aC1mdW5jdGlvbnMuanM/MmVlOCJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzdW0gPSAoYSwgYikgPT4ge1xuICAgIHJldHVybiBhICsgYjtcbn07XG5cbmNvbnN0IHByb2R1Y3QgPSAoYSwgYikgPT4ge1xuICAgIHJldHVybiBhICogYjtcbn07XG5cbmV4cG9ydCB7c3VtLCBwcm9kdWN0fTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/modules/math-functions.js\n");

/***/ })

/******/ });