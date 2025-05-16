
import express, { json } from "express"
import findFreePortAvilable from  "../Free-port.js"
import movies from "./data/movies.json" with { type: "json" }; // al devolver un json hay que espesificar el tipo usando with
import crypto from "node:crypto"
import { error } from "node:console";
import { validateMovie, validateParctialMovie } from "./Schema/Movie.js";
import cors from "cors"


// path-to-regexp es una libreria 
const app = express();
app.use(express.json()) //middleware 

// el cors en si mismo en la cabesera lo que coloca es el * permitiendo todos los origenes

const ACCEPTED_ORIGINS = [
    "http://127.0.0.1:3000/",
    "http://localhost:3000/",
]

// una solucion a esto seria esto: 
app.use(cors({ 
    origin: (origin, callback)=>{
        
        if(ACCEPTED_ORIGINS.includes(origin)){
            return callback(null,true)
        }
        if(!origin){
            return callback(null,true)
        }

    }

}))

app.disable("x-powered-by");


// endpoint de get movies 
app.get("/movies",(req,res)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.json(movies)
}) 

// get by id
app.get("/movies/:id",(req,res)=>{
    const {id}= req.params
    const movie = movies.find((prev)=>prev.id == id)
    if(movie) return res.json(movie)
    
    res.status(404).json({message: "Movie not found"})
})

// get by genre
app.get("/movies", (req, res) => {
    const { genre } = req.query;
    
    if (genre) {
      const filteredMovies = movies.filter(
        movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      );
     if(filteredMovies.length === 0){
        return res.status(404).json({message: "No hay películas del género solicitado."})
     };
        return res.json(filteredMovies)
    }
    res.status(400).json({ message: "Debes enviar un género como parámetro." });
       
});

app.post("/movies",(req,res)=>{
   
    const result = validateMovie(req.body)
    if(result.error) return res.status(400).json({error: JSON.parse(result.error.message) })

    try {
        const newMovie ={
            id: crypto.randomUUID(),
            ...result.data
        }
        movies.push(newMovie)
        return res.status(201).json(newMovie)  
    } catch (error) {
        console.log("Ha ocurrido un erro al crearlo")
    }
 
})

app.patch("/movies/:id",(req,res)=>{
  
    const result = validateParctialMovie(req.body)

    if(!result.success){
        return res.status(400).json({error: JSON.parse(result.error.message)})
    }

    const {id} = req.params
    const movieIndex = movies.findIndex(m => m.id === id);

    if(movieIndex === -1) return res.status(404).json({message: "No se ha encontrado la pelicula"})
    const updateMovie ={
    ...movies[movieIndex],
    ...result.data
    }
    // la sobre escribo

    movies[movieIndex]= updateMovie;
    return res.json(updateMovie)
})
  

const port = await findFreePortAvilable(3000)

app.listen(port,"127.0.0.1",()=>{
    console.log(`servidor corriendo en el puerto http://127.0.0.1:${port}`)
})