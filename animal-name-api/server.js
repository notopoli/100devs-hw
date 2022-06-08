const express = require('express')
const app = express()
const PORT = 8000

const animal = {
    'dog': {
        'sciName': 'Canis lupus familiaris',
        'aniEat': 'carnivore, omnivore',
        'aniClass': 'mammal',
    },
    'cat': {
        'sciName': 'Felis silvestris catus',
        'aniEat': 'obligated carnivore',
        'aniClass': 'mammal'
    },
    'mallard duck':{
        'sciName': 'Anas platyrhynchos',
        'aniEat': 'omnivore',
        'aniClass': 'bird',
    },
    'wild duck':{
        'sciName': 'Anas platyrhynchos',
        'aniEat': 'omnivore',
        'aniClass': 'bird',
    },
    'horse':{
        'sciName': 'Equus ferus caballus',
        'aniEat': 'herbivore',
        'aniClass': 'mammal',
    },
    'gecko':{
        'sciName': 'Gekkonidae',
        'aniEat': 'carnivore',
        'aniClass': 'reptiles',
    },
    'dragonfly':{
        'sciName': 'Anissoptera',
        'aniEat': 'carnivore',
        'aniClass': 'insect',
    },
    'unknown':{
        'sciName': 'not found',
        'aniEat': 'not found',
        'aniClass': 'not found',
    }
}

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html')
})

app.get('/api/:name', (req, res)=>{
    const animalName = req.params.name.toLowerCase()
    if (animal[animalName]){
        res.json(animal[animalName])
    }else{
        res.json(animal['unknown'])
    }
})

app.listen(PORT, ()=>{
    console.log(`The server is now running on port ${PORT}`)
})