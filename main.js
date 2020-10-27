//load required libaries from node_modules
const express = require('express')
const handlebars = require('express-handlebars')

//configure the environment
//from commandline, environment variable, default
const PORT = parseInt(process.argv[2]) || parseInt(process.env.MYPORT) || 3000 //MYPORT is just a environment variable name, can be anything

//create an instance of the express application
const app = express()

//configure handlebars
app.engine('hbs', 
    handlebars({defaultLayout: 'default.hbs'})
)
app.set('view engine', 'hbs')


//response should be most specific to less specific apart from logging
//log request
app.use(
    (req, resp, next) => {
        console.info(`${new Date()}: ${req.method} ${req.originalUrl}`)
        next();
    }
)

//random a number from 1-6
function randomNum(){
    ranNum=Math.floor(Math.random()*6)+1
    return ranNum
}

//run when get /roll is called
app.get('/roll',
    (req, resp) => {
        resp.status(200)
        resp.type('text/html')
        let random1 = randomNum()
        let random2 = randomNum()
        resp.render('dice',
            {
                randomDice: '/images/' + random1 + '.png',
                randomDice2: '/images/' + random2 + '.png'
            }
        )
    }
)

//configure express
//serve HTMLs from the public directory, __dirname is the directory of this file

app.use(express.static(__dirname + '/public'))

app.use(
    (req, resp) => {
        resp.status(200)
        resp.type('text/html')
        resp.redirect('/')
    }
)

//start express
app.listen(PORT, 
    () => {//callback, execute after express has started
        console.info(`Application started on port ${PORT} at ${new Date()}`)
    }
)