const express = require('express')
require('./db/mongoose')
// load routers (controllers)
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT // || 3000

// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled')
//     } else {
//         next()
//     }
// })

// maintenance mode middleware
// app.use((req, res, next)=>{
//     res.status(503).send('Site under maintenance. Please come back later.')
// })

// file uploads example
const multer = require('multer')
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000   // in bytes
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error('Please upload a doc or docx file'))
        }

        cb(undefined, true)

        // cb(new Error('File must be a PDF'))
        // cb(undefined, true)   // nothing went wrong
        // cb(undefined, false)

    }
})

app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message})
})

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

// 
// without middleware: new request -> run route handler 
// 
// with middleware: new request -> do something -> run route handler
// 

// example with bcrypt
// const bcrypt = require('bcryptjs')

// const myFunction = async()=>{
//     const password = 'Red12345!'
//     const hashedPassword = await bcrypt.hash(password, 8)

//     console.log(password)
//     console.log(hashedPassword)

//     const isMatch = await bcrypt.compare('red12345!', hashedPassword)
//     console.log('Matches?: ', isMatch)
// }

// myFunction()

// // jsonwebtoken example
// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//     const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', {
//         expiresIn: '7 days'
//     })
//     console.log(token)

//     const data = jwt.verify(token, 'thisismynewcourse')
//     console.log(data)
// }

// myFunction()

// const pet = {
//     name: 'Hal'
// }

// pet.toJSON = function() {
//     // console.log(this)
//     return {}
// }

// console.log(JSON.stringify(pet))

// const User = require('./models/user')
// const Task = require('./models/task')

// const main = async () => {

//     // const task = await Task.findById('611d2cb724d8c637fc7981f0')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)

//     const user = await User.findById('611d2c8624d8c637fc7981e7')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }

// main()