import express from 'express' 
// Here, we're using import express instead of const express = require('express') because we've used "module" instead of commonjs in the type in package.json

const app = express()
app.use(express.json()); //
const port = 3000


let teaData = [

]

let newId = 1

app.get('/teas',(req,res)=>{
    if(teaData.length === 0){
        return res.status(404).send("No tea as of now!")
    }
    res.status(200).send(teaData)
})

app.get('/tea/:id', (req,res)=>{
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    console.log(tea);
    
    if(!tea)
    {
       return res.status(404).send('Not Found!')
    }
    res.status(200).send(tea)
})

app.post('/add-tea', (req,res)=>{
    const {name, price} = req.body

    if(!name ||  !price)
    {
        return res.status(400).send("Both name and price are required!")
    }

    const isTeaAvl = teaData.find(t => t.name.toLowerCase() === name.toLowerCase())
    
    if(isTeaAvl)
    {
        return res.status(409).send('Tea already Exist')
    }
    
    const newData = {id:newId++, name:name, price:price}

    teaData.push(newData)

    res.status(201).send({
        meaasge:"New Tea Added Successfully!",
       data:newData
    })
})



app.put('/edit-tea/:id', (req,res)=>{
    
    const teaToEdit = teaData.find(t => t.id === parseInt(req.params.id))

    if(!teaToEdit)
    {
        return res.status(404).send("Tea not found to be update")
    }

    const {name, price } = req.body

    const isNametaken = teaData.find(t => t.name === String(name))


    if(isNametaken)
    {
        return res.status(409).send("This tea is already in the menu!")
    }


    teaToEdit.name = name
    teaToEdit.price =price
    return res.status(200).send({
    "message":"Updated Successfully",
    "data":teaData[teaToEdit]})
    
})


app.delete('/delete-tea/:id', (req,res)=>{
    const isTea = teaData.find(t => t.id === parseInt(req.params.id))


    if(!isTea)
    {
        return res.status(404).send("Tea not found to be deleted")        
    }
    
    const teaName = isTea.name
    teaData = teaData.filter(t => t.id !== parseInt(req.params.id))
    res.status(200).send(`${teaName} Deleted Successfully!`)
})

app.listen(port, ()=>{
    console.log(`Server is running at port: ${port}...`);
    
})