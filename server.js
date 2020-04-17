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

//Listens for web requests
app.listen(80, () => console.log("Server started") )