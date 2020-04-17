//Import express framework
const express = require("express")
//Initialize server object
const app = express()
 
//Parse request data coming in
app.use(express.json())
//Serve ‘public’ folder as static website
app.use( express.static('public') )

//very basic HTTP handler template
//define /routeName
app.get("/hello", (req, res) => {
    //req.body is user data
    console.log(req.body)
    //return data to user
    res.json({
        message: "Hello!"
    })
})

//Define handler for POST on /login
app.post("/login", (req, res) => {
    const user = req.body.user

    const package = {
        message: null
    }

    if (isValid(user))
        package.message = "User info valid"
    else
        package.message = "User info invalid"     
    //TODO distinguish between login and register
    //TODO save/retrieve info from database

    //return data to user
    res.json(package)
})

/**
 * Validates user, all conditions must be true
 */
function isValid(user) {
    return (
    user.first.length > 1
    && user.last.length > 2
    && user.email.includes("@")
    && user.password.length > 4
    && user.age > -1 && user.age < 120
    && user.gender == "male" || "female"
    )
}

//Listens for web requests
app.listen(80, () => console.log("Server started") )