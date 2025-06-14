const alertInvalid = () => {
    Swal.fire({
        icon: "error",
        title: "Invalid Credentials"
    })
}

let form = document.querySelector(".form-login")
form.addEventListener("submit", async function (event) {
    event.preventDefault()

    let email = document.querySelector(".input-email").value
    let password = document.querySelector(".input-password").value

    let data = {
        email: email,
        password: password
    }

    try {
        let response = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            window.location.href = "http://localhost:8080/";
        } else {
            alertInvalid()
        }
    } catch (error) {
        console.error("Error en la solicitud", error);
    }
})  