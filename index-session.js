const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended: true}))

app.use(session({
    secret: 'teste123',
    cookie: {
        maxAge: 12000
    }
}))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {

    let contas = []

    if ('contas' in req.session) {
        contas = req.session.contas
    }

    res.render('index', {contas})
})

app.post('/calc', (req, res) => {
    let {num1, num2, op} = req.body
    num1 = parseInt(num1)
    num2 = parseInt(num2)

    let total = 0

    switch (op) {
        case '+':
            total = num1 + num2
            break;
        case '-':
            total = num1 - num2
            break;
        case '*':
            total = num1 * num2
            break;
        case '/':
            if (num2 > 0) {
                total = num1 / num2
            }
            break;
        default:
            break;
    }

    let contas = []

    if ('contas' in req.session) {
        contas = req.session.contas
    }

    contas.push({
        num1, num2, op, total
    })

    req.session.contas = contas
    res.redirect('/')

})

app.listen(port, err => {
    if (err) {
        console.log('error on server', err) 
    } else {
        console.log('listening on port', port)
    }
})