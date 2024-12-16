const chalk = require('chalk')
const express = require('express')
const path = require('path')
const { addNote, getNotes, noteRemove, updateNote } = require('./notes.controller.js')

// const basePath = path.join(__dirname, 'pages')

const port = 3000;

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'pages')

app.use(express.json())
app.use(express.static(path.resolve(__dirname,'public')))
app.use(express.urlencoded({
    extended:true
}))

app.get('/',async (req,res)=>{
    // res.sendFile(path.join(basePath, 'index.html'))
    res.render('index', {
        title: 'Express App',
        notes: await getNotes(),
        created: false
    })
})

app.post('/', async (req,res) =>{
    await addNote(req.body.title)
    //    res.sendFile(path.join(basePath, 'index.html'))  
    res.render('index', {
        title: 'Express App',
        notes: await getNotes(),
        created: true
    })
})

app.delete('/:id', async (req,res) =>{
    
   await noteRemove(parseInt(req.params.id))
    res.render('index', {
        title: 'Express App',
        notes: await getNotes(),
        created: false
    })

})


app.put('/:id', async (req,res) =>{

    await updateNote(parseInt(req.params.id), req.body.title )
     res.render('index', {
         title: 'Express App',
         notes: await getNotes(),
         created: false
     })
 
 })


app.listen(port, () => {
    console.log(chalk.green(`Server has been started on port ${port}...`))
})