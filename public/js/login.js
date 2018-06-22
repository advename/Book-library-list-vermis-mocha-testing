// ###########################
// LOGIN
// ###########################

const loginButton = document.querySelector("form.login input[name='login']");

loginButton.addEventListener("click", login);

function login() {
    const email = document.querySelector("form.login input[name='email']").value;
    const password = document.querySelector("form.login input[name='password']").value;

    let verifyUser = {
        email: email,
        password: password
    }
    
    fetch("/login", {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(verifyUser)
    }).then(result => result.json()).then(result => checkLoginStatus(result));
}

function checkLoginStatus(result){
    console.log(result);
    if(result.status === true){
        console.log("Redirect User");
        window.location.replace("/admin/dashboard.html");
    }
    else{
        console.log("Error");
    }
}