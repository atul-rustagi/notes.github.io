let mainbtn = document.getElementById ("login-signup");
mainbtn.addEventListener ("click", (element) => {
    element.preventDefault ();

    if (mainbtn.innerText === "Sign-Up") {

        mainbtn.innerText = "Login";

        let card_text = document.getElementById ("login-signup-text");
        card_text.innerText = "Sign-Up";

        let btn = document.getElementById ("login-signup-btn");
        btn.innerText = "Sign Up";

        let form = document.getElementById ("login-signup-form");
        form.removeAttribute ("onsubmit");
        form.setAttribute ("onsubmit", "SignUp ()");

        document.title = "Notes App | SignUp";
    } else {

        mainbtn.innerText = "Sign-Up";

        let card_text = document.getElementById ("login-signup-text");
        card_text.innerText = "Login";

        let btn = document.getElementById ("login-signup-btn");
        btn.innerText = "Log In";

        let form = document.getElementById ("login-signup-form");
        form.removeAttribute ("onsubmit");
        form.setAttribute ("onsubmit", "Login ()");

        document.title = "Notes App | Login";
    }
})
