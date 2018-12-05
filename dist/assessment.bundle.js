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
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/assessment.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/assessment.js":
/*!**************************!*\
  !*** ./js/assessment.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const cardsContainer = document.getElementById(\"renderCard\");\nconst currentUser = sessionStorage.getItem('id');\ncheckIfUserHasFavorite(currentUser);\n\nlet ratingsInfo = {}\n\nfunction getRatedInfo(){\n    let localStorageInfo = localStorage.getItem('ratedUser');\n    if (localStorageInfo){\n        ratingsInfo = localStorageInfo;\n    } else {\n        ratingsInfo = {\n            interested: [],\n            ratings: [],\n        }\n    }\n    return ratingsInfo;\n}\n\nfunction existsIdUserRating(idUser, localStorageInfo){\n    localStorageInfo.ratings.forEach(function(currentValue, index){\n        if(currentValue.idUser == idUser){\n            return index;\n        }\n    });\n    return false;\n}\n\n\nfunction setRatedInfo(idUser ,userIdTextarea, userIdStars, checkUserInterested){\n    const ratedInfo = getRatedInfo();\n    if(!ratedInfo.checkUserInterested.includes(idUser) && checkUserInterested){\n        ratingsInfo.interested.push(checkUserInterested)\n    } else if (ratedInfo.checkUserInterested.includes(idUser) && !checkUserInterested){\n        const rateUserIndex = ratingsInfo.interested.indexOf(checkUserInterested);\n        ratingsInfo.interested.splice(rateUserIndex, 1);\n    }\n    let existsUserIndex = existsIdUserRating\n    if (existsUserIndex){\n        localStorageInfo.ratings[existsUserIndex].comments = userIdTextarea;\n        localStorageInfo.ratings[existsUserIndex].stars = userIdStars;\n    } else {\n        ratedUser = {\n        idUser: idUser,\n        comments: userIdTextarea,\n        stars: userIdStars\n        }\n        localStorageInfo.ratings.push(ratedUser);\n    }\n    let localStorageInfo = localStorage.setItem('ratedUser', localStorageInfo);\n}\n\n\nfunction saveRate(e){\n    const idUser = $(e).attr('id');\n    const userIdTextarea = $(`#${idUser}-textarea`).froalaEditor('html.get');\n    const userIdStars = $(`#${idUser}-stars`).val() ;\n    const checkUserInterested = $(`#${idUser}-interested`).prop('checked') ? true : false ;\n    setRatedInfo(idUser, userIdTextarea, userIdStars, checkUserInterested);\n}\n\n\nfunction exportCards() {\n    $.ajax({\n        url: \"https://cv-mobile-api.herokuapp.com/api/users\"\n    }).done(function (data) {\n        for (let i = 0; i < data.length; i++) {\n            const userIsChecked = checkIfUserIsMarked(data[i]);\n            const card = renderCard(data[i], userIsChecked);\n            cardsContainer.innerHTML += card;\n            renderstar(data[i])\n            if (i == data.length - 1) {\n                textarea()\n            }\n        }\n    });\n}\n\nfunction renderStarSave(json) {\n    let star = \"\";\n    for (let i = 0; i < json.star; i++) {\n        console.log(json.star + \" \" + i)\n        if (i == json.star - 1) {\n            star += `<i class=\"material-icons activeStar\" id=\"${json.id} ${i + 1}\"  onclick=\"star(id)\">star</i>`\n        } else {\n            star += `<i class=\"material-icons\" id=\"${json.id} ${i + 1}\"  onclick=\"star(id)\">star</i>`\n        }\n    }\n    for (let i = 0; i < 5 - json.star; i++) {\n\n        star += `<i class=\"material-icons\" id=\"${json.id} ${json.star + i + 1}\"  onclick=\"star(id)\">star_border</i>`\n    }\n    document.getElementById(json.id).innerHTML = star;\n}\nfunction renderTextareaSave(json) {\n    document.getElementById(json.id).innerHTML = json.textarea\n}\nfunction renderInterety(json) {\n    if (json.checked) {\n        document.getElementById(json.id).innerHTML = `<input type=\"checkbox\" class=\"mgc-switch mgc-sm interestedCheck\" id=\"${json._id}-interested\"  checked  style=\"margin-right: 5px;\"/><p>I\\'m interested</p>`\n    }\n\n}\nfunction textarea() {\n    $('textarea').froalaEditor();\n    $(document.querySelector('[title=\"Insert Image\"]')).remove();\n\n}\n\nexportCards();\n\nfunction renderCard(data, checked) {\n    var card = (\n        '<div class=\"card shadow m-3 p-4\"  style=\"width: 90%; height: auto;\">' +\n        '<img class=\"card-img-top m-auto\" src=\"' + data.logo + '\" alt=\"' + data.name + '\" onError=\"imgError(this)\"style=\"height:150px; width:150px; border-radius:50%;object-fit:cover;\" onerror=\"imgError(this)\">' +\n        '<div class=\"card-body p-0 mt-2\">' +\n        '<h5 class=\"card-title text-center mb-2\">' +\n        data.name +\n        '</h5>' +\n        `<div class=\"text-center mb-3\" id=\"${data._id}\">` +\n        '</div>' +\n        '<div class=\"d-flex flex-row justify-content-center\" style=\"margin-top:5px\">' +\n        `<input type=\"checkbox\" class=\"mgc-switch mgc-sm interestedCheck\" id=\"${data._id}-interested\" ${checked ? 'checked' : ''} onclick=\"checkInterested(this)\" style=\"margin-right: 5px;\"/><p>I\\'m interested</p>` +\n        '</div>' +\n        `<div class=\"d-flex justify-content-center\"id=\"\" >` +\n        `<textarea id=\"${data._id}-textarea\" name=\"editor1\"></textarea>` +\n        '</div >' +\n        '</div >' +\n        `<div class=\"d-flex justify-content-center mt-3\">` +\n        `<button class=\"btn btn-primary saveRate-btn\" onclick=\"saveRate(this)\" id=\"${data._id}\">` +\n        \"Save\" +\n        `</button>` +\n        '</div >' +\n        '</div >'\n    );\n    return card;\n}\nfunction imgError(image) {\n    image.onerror = \"\";\n    image.src = \"https://cv-mobile-api.herokuapp.com/uploads/default_avatar.png\";\n    return true;\n}\nfunction renderstar(data) {\n    document.getElementById(data._id).innerHTML = (\n        `<i class=\"material-icons\" id=\"${data._id} 1\"  onclick=\"star(id)\">star_border</i>` +\n        `<i class=\"material-icons\" id=\"${data._id} 2\"  onclick=\"star(id)\">star_border</i>` +\n        `<i class=\"material-icons\" id=\"${data._id} 3\"  onclick=\"star(id)\">star_border</i>` +\n        `<i class=\"material-icons\" id=\"${data._id} 4\"  onclick=\"star(id)\">star_border</i>` +\n        `<i class=\"material-icons\" id=\"${data._id} 5\"  onclick=\"star(id)\">star_border</i>`);\n}\n\n\n\nfunction star(id) {\n    var siteStar = id.split(\" \")[1];\n    let idStar = id.split(\" \")[0]\n    if (siteStar == 1) {\n        document.getElementById(idStar).innerHTML =\n            `<i class=\"material-icons activeStar\" id=\"${idStar} 1\" data-stars=\"1\"  onclick=\"star(id)\">star</i>` +\n            `<i class=\"material-icons\" id=\"${idStar} 2\"  onclick=\"star(id)\">star_border</i>` +\n            `<i class=\"material-icons\" id=\"${idStar} 3\"  onclick=\"star(id)\">star_border</i>` +\n            `<i class=\"material-icons\" id=\"${idStar} 4\"  onclick=\"star(id)\">star_border</i>` +\n            `<i class=\"material-icons\" id=\"${idStar} 5\"  onclick=\"star(id)\">star_border</i>`\n    } else if (siteStar == 2) {\n        document.getElementById(idStar).innerHTML =\n            `<i class=\"material-icons\" id=\"${idStar} 1\"  onclick=\"star(id)\">star</i>` +\n            `<i class=\"material-icons activeStar\" id=\"${idStar} 2\"  onclick=\"star(id)\">star</i>` +\n            `<i class=\"material-icons\" id=\"${idStar} 3\"  onclick=\"star(id)\">star_border</i>` +\n            `<i class=\"material-icons\" id=\"${idStar} 4\"  onclick=\"star(id)\">star_border</i>` +\n            `<i class=\"material-icons\" id=\"${idStar} 5\"  onclick=\"star(id)\">star_border</i>`;\n    } else if (siteStar == 3) {\n        document.getElementById(idStar).innerHTML =\n            `<i class=\"material-icons\" id=\"${idStar} 1\"  onclick=\"star(id)\">star</i>` +\n            `<i class=\"material-icons\" id=\"${idStar} 2\"  onclick=\"star(id)\">star</i>` +\n            `<i class=\"material-icons activeStar\" id=\"${idStar} 3\"  onclick=\"star(id)\">star</i>` +\n            `<i class=\"material-icons\" id=\"${idStar} 4\"  onclick=\"star(id)\">star_border</i>` +\n            `<i class=\"material-icons\" id=\"${idStar} 5\"  onclick=\"star(id)\">star_border</i>`;\n    } else if (siteStar == 4) {\n        document.getElementById(idStar).innerHTML =\n            `<i class=\"material-icons\" id=\"${idStar} 1\"  onclick=\"star(id)\">star</i>` +\n            `<i class=\"material-icons\" id=\"${idStar} 2\"  onclick=\"star(id)\">star</i>` +\n            `<i class=\"material-icons\" id=\"${idStar} 3\"  onclick=\"star(id)\">star</i>` +\n            `<i class=\"material-icons activeStar\" id=\"${idStar} 4\"  onclick=\"star(id)\">star</i>` +\n            `<i class=\"material-icons\" id=\"${idStar} 5\"  onclick=\"star(id)\">star_border</i>`;\n    } else if (siteStar == 5) {\n        document.getElementById(idStar).innerHTML =\n            `<i class=\"material-icons\" id=\"${idStar} 1\"  onclick=\"star(id)\">star</i>` +\n            `<i class=\"material-icons\" id=\"${idStar} 2\"  onclick=\"star(id)\">star</i>` +\n            `<i class=\"material-icons\" id=\"${idStar} 3\"  onclick=\"star(id)\">star</i>` +\n            `<i class=\"material-icons\" id=\"${idStar} 4\"  onclick=\"star(id)\">star</i>` +\n            `<i class=\"material-icons activeStar\" id=\"${idStar} 5\"  onclick=\"star(id)\">star</i>`;\n    }\n    document.getElementById(idStar).innerHTML += `<input value=\"${siteStar}\" id=\"${idStar}-stars\" type=\"hidden\"/>`;\n\n}\n\n\nfunction save(idS) {\n    console.log('oh yeah')\n    let id = idS.split(\" \")[0];\n    var activeStar = document.getElementsByClassName(\"activeStar\")\n    for (let i = 0; i < activeStar.length; i++) {\n        if (activeStar[i].id.split(\" \")[0] == id) {\n            var NumerStar = activeStar[i].id.split(\" \")[1]\n        }\n    }\n}\n\nfunction checkIfUserHasFavorite(id){\n    if(!localStorage.getItem(currentUser)) {\n        localStorage.setItem(id, JSON.stringify([]))\n    }\n}\n\nfunction checkIfUserIsMarked(user){\n    //Leemos el local storage y ver si el id del usuario está guardado dentro de ese array\n    const localData = JSON.parse(localStorage.getItem(currentUser));\n    if(localData.includes(user._id)){\n        return true;\n    }\n    return false;\n}\n\nfunction checkInterested(target){\n    const action = target.checked ? 'add' : 'remove';\n    const clickedUser = target.dataset.id;\n    const currentLocalState = JSON.parse(localStorage.getItem(currentUser));\n    if (action == 'add'){\n        currentLocalState.push(clickedUser);\n    } else {\n        const userIndex = currentLocalState.indexOf(clickedUser);\n        currentLocalState.splice(userIndex, 1);\n    }\n\n    localStorage.setItem(currentUser, JSON.stringify(currentLocalState));\n}\n\nfunction rateFilter() {\n    const ratedUsers = document.querySelector('#rated');\n    const notRatedUsers = document.querySelector('#not-rated');\n    const allUsers = document.querySelector('#all');\n    if (ratedUsers.checked){\n\n    } else if (notRatedUsers.checked){\n\n    }else if (allUsers.checked){\n        \n    }\n    \n}\n\n//# sourceURL=webpack:///./js/assessment.js?");

/***/ })

/******/ });