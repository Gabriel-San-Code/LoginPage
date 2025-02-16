const changeThemeBtn = document.querySelector('#change-theme');

function toggleLightMode() {
    document.body.classList.toggle("light");
}

function loadTheme(){
    const lightMode = localStorage.getItem('light');

    if(lightMode) {
        toggleLightMode();
    }
}

loadTheme()

changeThemeBtn.addEventListener('change', function(){
    toggleLightMode();

    localStorage.removeItem('light');

    if(document.body.classList.getItem('light')) {
        localStorage.setItem('light', 1);
    }
})