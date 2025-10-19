import axios from 'axios'
import React, { useEffect, useState } from 'react'

// //[
//     {
//         "id": 1,
//         "name": "dog",
//         "species": "cat",
//         "birth_date": "2020-01-15",
//         "created_at": "2025-10-19 12:01:09",
//         "updated_at": "2025-10-19 12:01:09"
//     }
// ]

type Animal = {
    id: string,
    name: string,
    species: string,
    birth_date: string,
    created_at: string,
    updated_at: string
}

const serverUrl = "http://localhost:5001/api"

export default function Home() {

const [animalList, setAnimalList] = useState <Animal[]>([]) 

useEffect(() => {
    const fetchAnimals = async () => {

    try {
        const response = await axios.get(serverUrl + "/animals")
        
        
        setAnimalList(response.data)
    }catch (error: any){
        console.log("Fetch error: " + error)
    }
    

     }
     fetchAnimals()
}, [])


  return (<>
    <div>home</div>
    {animalList && animalList.map((animal, index) => (
        <div key={animal.id}>
            <div>id: {animal.id}</div>
            <div>Name: {animal.name}</div>
            <div>Species: {animal.species}</div>
            <div>Created_at: {animal.created_at}</div>
            <div>Updated_at: {animal.updated_at}</div>
        </div>
    ))}
    </>

  )
}
