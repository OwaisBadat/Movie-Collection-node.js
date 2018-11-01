const express = require('express')
const app = express()
const PORT = 3000
var bodyParser = require('body-parser')
const mustacheExpress = require('mustache-express')

let movieCollection = []

app.use(express.static('css'))

app.use(bodyParser.urlencoded({ extended : false}))

app.engine('mustache', mustacheExpress())

app.set('views', './views')

app.set('view engine', 'mustache')

app.get('/',function(req,res){
    res.render('index')

})


app.post('/delete-movie',function(req,res){

    let movieTitle = req.body.movieTitle
    // console.log(cityName)

    movieCollection = movieCollection.filter(function(movie){
      return movie.movieTitle != movieTitle
    })

    res.redirect('/my-movie-collection')
})

app.get('/add-movie',function(req,res){
  res.render('./add-movie')
})


app.post('/add-movie',function(req,res){

  let movieTitle = req.body.movieTitle
  let movieGenre = req.body.movieGenre
  let movieDescription = req.body.movieDescription
  let moviePoster = req.body.moviePosterURL

  movieCollection.push({ movieTitle : movieTitle, movieGenre : movieGenre, movieDescription : movieDescription, moviePosterURL : moviePoster })

  res.redirect('/my-movie-collection')

})

app.get('/my-movie-collection',(req,res) => {

  res.render('my-movie-collection',{ collectionList : movieCollection })
})

app.get('/my-movie-collection/:movieGenre', function(req, res){
   let movieGenre = req.params.movieGenre
   console.log(movieGenre)

   res.render("my-movie-collection", {collectionList: movieCollection.filter(function(movie){
       return movie.movieGenre == movieGenre
   }), filters: movieGenre})
})




app.listen(PORT, function(){
  console.log("Server is running...")
})
