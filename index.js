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

    if (!req.body.name || !req.body.bio) {
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

    try {
        const id = Number(req.params.id);

        const user = users.find(user => user.id === id)


        if (user === undefined) {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    }

});



server.delete('/api/users/:id', (req, res) => {



    try {
        const id = Number(req.params.id);

        const user = users.find(user => user.id === id)

        if (user === undefined) {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
        users = users.filter(user => user.id !== id)
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ errorMessage: "The user could not be removed." })
    }
})



server.put('/api/users/:id', (req, res) => {
    const changes = req.body
    const id = Number(req.params.id);

    if (!req.body.name || !req.body.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }

    let found = users.find(user => user.id === id)

    try {
        if (found) {
            Object.assign(found, changes);

            res.status(200).json(found);
        } else {
            res.status(404).json({ message: 'The user with the specified ID does not exist.' })
        }
    } catch (error) {
        res.status(500).json({ errorMessage: "The user information could not be modified." })
    }

    res.status(200).json(users);
})





const port = 8000;

server.listen(port, () => console.log('server up...'));