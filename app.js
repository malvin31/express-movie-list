// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

// require handlebars in the project
const exphbs =  require('express-handlebars')

// 匯入JSON
const movieList = require('./movies.json')

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set ('view engine', 'handlebars')

app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
    // 把movie data貼到index 的 partial template
    res.render('index', {movies: movieList.results})
})

// search function
app.get('/search', (req, res) => {
    const movies = movieList.results.filter((movie) => {
        return movie.title.toLowerCase().includes(req.query.keyword.toLowerCase())
    })
    res.render('index', { movies: movies, keyword: req.query.keyword })
})



// 打造show(description)
app.get('/movies/:movie_id', (req, res) => {
    const movie = movieList.results.find(
        movie => movie.id.toString() === req.params.movie_id
    )

    res.render('show', { movie: movie })
})


// start and listen on the Express server
app.listen(port, () =>{
    console.log(`Express is listening on http://localhost:${port}`)
})