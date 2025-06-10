
let form = document.querySelector(".form-login")
form.addEventListener("submit", async function (event) {
    event.preventDefault()

    let email = document.querySelector(".input-email").value
    let password = document.querySelector(".input-password").value

    console.log(email)
    console.log(password)

    let data = {
        email: email,
        password: password
    }

    try {
        let response = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                "Content-Type": "aplication/json"
            },
            body: JSON.stringify(data)
        })
        let result = await response.json()
        console.log("Respuesta del servidor", result)
    } catch (error) {
        
    }

    window.location.href = "http://localhost:8080/";
})