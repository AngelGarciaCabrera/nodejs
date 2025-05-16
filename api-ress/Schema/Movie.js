import z from "zod";

const MovieSchema = z.object({
  title: z.string({
    invalid_type_error: "El titulo debe ser un string",
    required_error: "El titulo de la pelicula es requerido",
  }),
  year: z.number().int().min(1900).max(2026),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(5),
  poster: z.string().url({
    message: "Poster debe ser una url",
  }),
  genre: z.array(
    z.enum([
      "Action",
      "Adventure",
      "Comedy",
      "Drama",
      "Fantasy",
      "Horror",
      "Thriller",
      "Sci-Fi",
    ]),
    {
      message: "El genero es requerido",
    }
  ),
});

export const validateMovie=(movie)=>{
    return MovieSchema.safeParse(movie)
}

export const validateParctialMovie = (movie)=>{
 //  el partical hace uqe todas las propiedades sea opcionale
    return MovieSchema.partial().safeParse(movie)
}