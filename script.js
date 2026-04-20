
document.addEventListener("DOMContentLoaded", function () {
    initValidation("myform", "successMessage");
});

function changeTheme() {
    let theme = document.getElementById("theme-style");

    if (theme) {
        theme.remove();
    } else {
        let link = document.createElement("link");
        link.id = "theme-style";
        link.rel = "stylesheet";
        link.href = "css/theme.css";

        document.head.appendChild(link);
    }
}