//!------------ Start Section Global get ---------------/
let meals = document.getElementById("meals");
let mealsDescription = document.getElementById('mealsDescription');
let mealsSearch = document.getElementById("mealsSearch")
let mealsCategories = document.getElementById("mealsCategories");
let mealsArea = document.getElementById("mealsArea");
let mealsIngredients = document.getElementById("mealsIngredients");
let ContactUs = document.getElementById("ContactUs");

function close() {
    meals.classList.remove('d-block');
    meals.classList.add('d-none');

    mealsDescription.classList.remove('d-block');
    mealsDescription.classList.add('d-none');

    mealsSearch.classList.remove('d-block');
    mealsSearch.classList.add('d-none');

    mealsCategories.classList.remove('d-block');
    mealsCategories.classList.add('d-none');

    mealsArea.classList.remove('d-block');
    mealsArea.classList.add('d-none');

    mealsIngredients.classList.remove('d-block');
    mealsIngredients.classList.add('d-none');

    ContactUs.classList.remove('d-block');
    ContactUs.classList.add('d-none');

    $('body').removeClass('show-sidebar');
    $('body').find('.js-menu-toggle').removeClass('active');
};
let returnIcon = document.getElementById("returnIcon");
returnIcon.addEventListener('click', function () {
    $(function () {
        $('#preloader').fadeIn(1000).fadeOut(800);
    });
    let isHidden = true;
    if (isHidden == true) {
        close();
        meals.classList.remove('d-none');
        meals.classList.add('d-block');
    }
});
//!------------ End Section Global get ---------------/

//!------------ Start Section side minu ---------------/
$(function () {
    $('.js-menu-toggle').click(function (e) {

        var $this = $(this);

        if ($('body').hasClass('show-sidebar')) {
            $('body').removeClass('show-sidebar');
            $this.removeClass('active');
        } else {
            $('body').addClass('show-sidebar');
            $this.addClass('active');
        }
        e.preventDefault();
    });

    $(document).mouseup(function (e) {
        var container = $(".sidebar");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            if ($('body').hasClass('show-sidebar')) {
                $('body').removeClass('show-sidebar');
                $('body').find('.js-menu-toggle').removeClass('active');
            }
        }
    });
});
//!------------ end Section side minu ---------------/

//!==================================================/
//!==================================================/
//!==================================================/


//!------------ Start Section connection API Main Meals ---------------/
async function connectionMainMeals() {
    let mealsDataCon = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s');
    let mealsData = await mealsDataCon.json();
    return mealsData;
}
async function startMainApp() {
    let mealsData = await connectionMainMeals();

    let arr = [];
    arr.push(mealsData);
    if (arr.length < 0) {
        $(function () {
            $('#preloader');
        })
    } else {
        $(function () {
            $('#preloader').fadeOut(500);
        })
        displayMainMeals(mealsData);
    }
};
document.addEventListener('DOMContentLoaded', startMainApp);
//!------------ End Section connection API Main Meals ---------------/

//!==================================================/
//!==================================================/
//!==================================================/

//!------------ Start Section Main Meals ---------------/
let row = document.getElementById("rowMeals");

function displayMainMeals(data) {
    var Data = data.meals;
    let cartona = "";
    for (let i = 0; i < Data.length; i++) {
        cartona += `
            <div class="col-md-3" >
                <div class="card  border-0 rounded-2" id="cardImg" onclick="getMealsDescriptions('${Data[i].idMeal}')">
                    <div class="img rounded-2">
                        <div class="layout rounded-2 d-flex align-items-center" id="layoutImg">
                            <h1 class="text-black ms-2"> ${Data[i].strMeal} </h1>
                        </div>
                        <img src="${Data[i].strMealThumb}" alt="img" class="w-100 rounded-2" id="Images">
                    </div>
                </div>
            </div>
        `;
    }
    row.innerHTML = cartona;
}
//!------------ End Section side Main -----------------*/

//!==================================================/
//!==================================================/
//!==================================================/

//!------------ Start Section connection meals descriptions ---------------/
async function getMealsDescriptions(idMeal) {
    let mealsDataCon = await fetch(`https://themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
    let mealsData = await mealsDataCon.json();

    let isHidden = true;
    if (isHidden == true) {
        close();
        mealsDescription.classList.remove('d-none');
        mealsDescription.classList.add('d-block');
    };
    let mealsDescData = mealsData;
    if (mealsDescData.meals != null) {
        displayMealsDescriptions(mealsDescData);
    }
};
//!------------ End Section connection meals descriptions ---------------/

//!------------ Start Section display meals descriptions -----------------*/
let rowMealsDescription = document.getElementById("rowMealsDescription");

function displayMealsDescriptions(data) {
    var Data = data.meals[0];

    let ingredients = ``
    for (let i = 1; i <= 20; i++) {
        if (Data[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${Data[`strMeasure${i}`]} ${Data[`strIngredient${i}`]}</li>`
        }
    }
    let tags = Data.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }
    let cartona = "";
    cartona += `
        <div class="col-md-4">
                <div class="img">
                    <img src="${Data.strMealThumb}" alt="" class="w-100 rounded-3">
                </div>
                <div class="name">
                    <h1 class="text-light">${Data.strMeal}</h1>
                </div>
        </div>
        <div class="col-md-8 text-light">
            <h2 class="text-light">Instructions</h2>
            <p class="text-light">${Data.strInstructions}</p>
            <h3><span class="fw-bolder">Area : </span>${Data.strArea}</h3>
            <h3><span class="fw-bolder">Category : </span>${Data.strCategory}</h3>
            <h3>Recipes :</h3> 
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${ingredients}
                </ul>
            <h3>Tags :</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${tagsStr}
            </ul>
            <a target="_blank" href="${Data.strSource}"
                class="btn btn-success">Source</a>
            <a target="_blank" href="${Data.strYoutube}"
                class="btn btn-danger">Youtube</a>
        </div>
        `;
    rowMealsDescription.innerHTML = cartona;
}
//!------------ End Section display meals descriptions -----------------*/

//!==================================================/
//!==================================================/
//!==================================================/

//!------------ Start Section connection API Search Meals by Name ---------------/
let SearchMealsBtn = document.getElementById("SearchMealsBtn");
SearchMealsBtn.addEventListener('click', () => {
    $(function () {
        $('#preloader').fadeIn(800).fadeOut(1000);
    })

    let isHidden = true;
    if (isHidden == true) {
        close();
        mealsSearch.classList.add('d-block');
        mealsSearch.classList.remove('d-none');
    }
})
async function searchInputName(name) {
    let searchMealsDataCon = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    let searchMealsDataByName = await searchMealsDataCon.json();

    searchMealsDataByName.meals ? displayMainMeals(searchMealsDataByName) : displayMainMeals([])
    
    close();
    mealsSearch.classList.add('d-block');
    mealsSearch.classList.remove('d-none');
    meals.classList.add('d-block');
    meals.classList.remove('d-none');
};
//!------------ End Section connection API Search Meals by Name ---------------/

// //!------------ Start Section connection API Search Meals by F-letter ---------------/

async function searchInputFletter(Letter) {
    Letter == "" ? Letter = "a" : "";
    let searchMealsDataCon = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${Letter}`);
    let searchMealsDataByFLetter = await searchMealsDataCon.json();

    searchMealsDataByFLetter.meals ? displayMainMeals(searchMealsDataByFLetter) : displayMainMeals([])
    close();
    mealsSearch.classList.add('d-block');
    mealsSearch.classList.remove('d-none');
    meals.classList.add('d-block');
    meals.classList.remove('d-none');
}
//!------------ End Section connection API Search Meals by F-letter ---------------/

//!==================================================/
//!==================================================/
//!==================================================/

//!------------ Start Section Categories Connection -----------------*/
async function CategoriesCon() {
    let CategoriesCon = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    let categories = await CategoriesCon.json();
    return categories;
}
async function startCategoriesApp() {
    let category = await CategoriesCon();
    if (category.categories !== null) {
        displayCategories(category);
    }
}
startCategoriesApp();
//!------------ End Section Categories Connection -----------------*/

//!------------ Start Section Categories Connection -----------------*/
async function CategoriesConByName(name) {
    let CategoriesCon = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`);
    let categories = await CategoriesCon.json();

    displayMainMeals(categories);
    close();
    meals.classList.add('d-block');
    meals.classList.remove('d-none');
};
//!------------ End Section Categories Connection -----------------*/

//!------------ Start Section Categories -----------------*/
let CategoriesBtn = document.getElementById("CategoriesBtn");

CategoriesBtn.addEventListener('click', () => {
    $(function () {
        $('#preloader').fadeIn(800).fadeOut(1000);
    })
    let isHidden = true;
    if (isHidden == true) {
        close();
        mealsCategories.classList.add('d-block');
        mealsCategories.classList.remove('d-none');
    }
});
let rowCategories = document.getElementById("rowCategories");

function displayCategories(data) {
    var Data = data.categories;
    let cartona = " ";
    for (let i = 0; i < Data.length; i++) {
        cartona += `
                <div class="col-md-3" id="card">
                    <div class="card  border-0 rounded-2" onclick="CategoriesConByName('${Data[i].strCategory}')">
                        <div class="img rounded-2" id="img">
                            <div class="layout rounded-2 text-center" id="layout">
                                <h1 class="text-black"> ${Data[i].strCategory}</h1>
                                <p class="text-black">${Data[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                            </div>
                            <img src="${Data[i].strCategoryThumb}" alt="img" class="w-100 rounded-2 bg-transparent" id="images">
                        </div>
                    </div>
                </div>
            `;
    }
    rowCategories.innerHTML = cartona;
};
//!------------ End Section Categories -----------------*/

//!==================================================/
//!==================================================/
//!==================================================/


//!------------ Start Section Area Connection -----------------*/

async function AreaCon() {
    let AreaCon = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    let Area = await AreaCon.json();
    return Area;
}
async function startAreaApp() {
    let Area = await AreaCon();
    if (Area.meals !== null) {
        displayArea(Area);
    }
}
startAreaApp();
//!------------ End Section Area Connection -----------------*/

//!------------ Start Section Area Connection BY Name -----------------*/
async function AreaConByName(name) {
    let AreaCon = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${name}`);
    let Area = await AreaCon.json();

    displayMainMeals(Area);
    close();
    meals.classList.add('d-block');
    meals.classList.remove('d-none');
};
//!------------ End Section Area Connection BY Name -----------------*/

//!------------ Start Section Area -----------------*/
let AreaBtn = document.getElementById("AreaBtn");
AreaBtn.addEventListener('click', () => {
    $(function () {
        $('#preloader').fadeIn(800).fadeOut(1000);
    })

    let isHidden = true;
    if (isHidden == true) {
        close();
        mealsArea.classList.add('d-block');
        mealsArea.classList.remove('d-none');
    }
});
let rowArea = document.getElementById("rowArea");

function displayArea(data) {
    var Data = data.meals;
    let cartona = " ";
    for (let i = 0; i < Data.length; i++) {
        cartona += `
                    <div class="col-md-3 text-white" onclick="AreaConByName('${Data[i].strArea}')">
                        <div class="rounded-2 text-center cursor-pointer" style="cursor:pointer;">
                            <i class="fa-solid fa-house-laptop fa-4x "></i>
                            <h3>${Data[i].strArea}</h3>
                        </div>
                    </div>
            `;
    }
    rowArea.innerHTML = cartona;
}
//!------------ End Section Categories -----------------*/

//!==================================================/
//!==================================================/
//!==================================================/

//!------------ Start Section Ingredients Connection -----------------*/
async function IngredientsCon() {
    let IngredientsCon = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    let Ingredients = await IngredientsCon.json();
    return Ingredients;
}
async function startIngredientsApp() {
    let Ingredients = await IngredientsCon();
    if (Ingredients.meals !== null) {
        displayIngredients(Ingredients);
    }
}
startIngredientsApp();
//!------------ End Section Ingredients Connection -----------------*/

//!------------ End Section Ingredients Connection BY Name -----------------*/
async function IngredientsConByName(name) {
    let IngredientsCon = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`);
    let Ingredients = await IngredientsCon.json();

    displayMainMeals(Ingredients);
    close();
    meals.classList.add('d-block');
    meals.classList.remove('d-none');
}
//!------------ End Section Ingredients Connection BY Name -----------------*/

//!------------ Start Section Ingredients -----------------*/
let IngredientsBtn = document.getElementById("IngredientsBtn");
IngredientsBtn.addEventListener('click', () => {
    $(function () {
        $('#preloader').fadeIn(800).fadeOut(1000);
    })

    let isHidden = true;
    if (isHidden == true) {
        close();
        mealsIngredients.classList.add('d-block');
        mealsIngredients.classList.remove('d-none');
    }
});
let rowIngredients = document.getElementById("rowIngredients");
function displayIngredients(data) {
    var Data = data.meals;
    let cartona = " ";
    for (let i = 0; i < 20; i++) {
        cartona += `
                    <div class="col-md-3 text-light" style="cursor:pointer;" onclick="IngredientsConByName('${Data[i].strIngredient}')">
                        <div class="rounded-2 text-center cursor-pointer">
                            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                            <h3>${Data[i].strIngredient}</h3>
                            <p style="overflow-y:hidden; height: 150px;">${Data[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                        </div>
                    </div>
            `;
    }
    rowIngredients.innerHTML = cartona;
};
//!------------ End Section Ingredients -----------------*/

//!==================================================/
//!==================================================/
//!==================================================/

//!------------ Start Section contactUs -----------------*/
let ContactUsBtn = document.getElementById("ContactUsBtn");
ContactUsBtn.addEventListener('click', () => {
    $(function () {
        $('#preloader').fadeIn(800).fadeOut(800);
    })
    let isHidden = true;
    if (isHidden == true) {
        close();
        ContactUs.classList.add('d-block');
        ContactUs.classList.remove('d-none');
    }
})
submitBtn = document.getElementById("submitBtn")

document.getElementById("nameInput").addEventListener("focus", () => {
    nameInputTouched = true
})
document.getElementById("emailInput").addEventListener("focus", () => {
    emailInputTouched = true
})
document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneInputTouched = true
})
document.getElementById("ageInput").addEventListener("focus", () => {
    ageInputTouched = true
})
document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordInputTouched = true
})
document.getElementById("repasswordInput").addEventListener("focus", () => {
    repasswordInputTouched = true
})
let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")
        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")
        }
    }
    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")
        }
    }
    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")
        }
    }
    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")
        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")
        }
    }
    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}
function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}
function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}
function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}
function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}
function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}
function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}
//!------------ End Section contactUs -----------------*/