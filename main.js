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

app.get('/roll',
    (req, resp) => {
        resp.status(200)
        resp.type('text/html')
        resp.render('dice',
            {
                randomDice: '/images/roll2.png',
                randomDice2: '/images/four.png'
            }
        )
    }
)

//configure express
//serve HTMLs from the public directory, __dirname is the directory of this file
app.use(express.static(__dirname + '/public'))

//
app.use((req, resp) => {
    resp.status(404)
    resp.type('text/html')
    resp.sendFile(__dirname + '/public')
    }
)

//start express
app.listen(PORT, 
    () => {//callback, execute after express has started
        console.info(`Application started on port ${PORT} at ${new Date()}`)
    }
)