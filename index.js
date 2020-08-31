const express = require('express');

const server = express();

server.use(express.json())


let users = [

    {
        id: 1,
        name: "Jesus",
        bio: "The son of God, pre-existent always with Father God"
    },

    {
        id: 2,
        name: "Greg",
        bio: "Musician and coder, humbly redeemed by God"
    }, 
    
    {
        id: 3,
        name: "Isela",
        bio: "Hardworking, loving wife of Greg"
    },   

]



server.post('/api/users', (req, res) => {
    const user = req.body;

    if ( !req.body.name || !req.body.bio ) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }


    users.push(user);

    try {
        res.status(201).json({ data: users })
      } catch (error) {
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
      }
    

})




server.get('/api/users', (req, res) => {

    try {
        res.status(200).json({ data: users })
      } catch (error) {
        res.status(500).json({ errorMessage: "The users information could not be retrieved." })
      }

})



server.get('/api/users/:id', (req, res) => {
    
    const specificUser = req.data

    try {
        res.status(200).json(specificUser)
    } catch (error) {
        res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    }

});



server.delete('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    let users = users.filter(user => user.id !== id)

    res.status(200).json(users);
})



server.put('/api/users/:id', (req, res) => {
    const changes = req.body
    const id = Number(req.params.id);

    let found = lessons.find(lesson => lesson.id === id)

    if(found) {
        Object.assign(found, changes);

        res.status(200).json(found);
    } else {
        res.status(404).json({message: 'not found'})
    }

    res.status(200).json(lessons);
})





const port = 8000;

server.listen(port, () => console.log('server up...'));