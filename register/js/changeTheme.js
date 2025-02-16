const changeThemeBtn = document.querySelector('#change-theme');


//Toogle light mode
function toggleLightMode() {
    document.body.classList.toggle("light");
}

//Load light or dark mode
function loadTheme() {
    const lightMode = localStorage.getItem("light");

    if(lightMode) {
        toggleLightMode();
    }
}

loadTheme();

changeThemeBtn.addEventListener("change", function() {
    toggleLightMode();

    //Save or remove light mode
    localStorage.removeItem("light");

    if(document.body.classList.contains("light")) {
        localStorage.setItem("light", 1);
    }

})