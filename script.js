function searchMovie() {
    $('#movie-list').html();
    $.ajax({
        url: 'https://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': 'dca61bcc',
            's': $('#search-input').val()
        },
        success: function (result) {
            // console.log(result);
            if (result.Response == "TRUE") {
                let movies = result.Search;
                // console.log(movies);
                $.each(movies, function (i, data) {
                    $('#movie-list').append(`
                    <div class="col-md-4">
                        <div class="card">
                            <img class="card-img-top" src="`+ data.Poster + `">
                            <div class="card mb-3">
                                <h5 class="card-title">`+ data.Title + `</h5>
                                <h6 class="card-subtitle mb-2 text-muted">`+ data.Tahun + `</h6>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="`+ data.imdbID +`">See Detail</a>
                            </div>
                        </div>
                    </div>`);
                });
                $('#search-input').val('');
            } else {
            $('#movie-list').html(`<div class="col">
            <h1 class="text-center">` +
                result.Error + `</h1>
            </div>`)
            }
        }
    });
}

$('#search-button').on('click', function () {
    searchMovie();
});

$('#search-input').on('keyup', function (e) {
    if (e.keyCode === 13) {
        searchMovie();
    }
});

$('#movie-list').on('click', '.see-detail', function () {
    // console.log($(this).data('id'));
    $.ajax({
        url: 'https://omdbapi.com',
        dataType: 'json',
        type: 'get',
        data: {
            'apikey': 'dca61bcc',
            'i': $(this).data('id')
        },
        success: function (movie) {
            if(movie.Response === "TRUE") {
                $('#modal-body').html(`
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="`+ movie.Poster + `" class="img-fluid">
                        </div>
                        <div class="col-md-8">
                            <ul class="list-group">
                                <li class="list-group-item"><h3>`+ movie.Title + `</h3></li>
                                <li class="list-group-item"><strong>Genre: </strong>`+ movie.Genre + `</li>
                                <li class="list-group-item"><strong>Released: </strong>`+ movie.Released + `</li>
                                <li class="list-group-item"><strong>Director: </strong>`+ movie.Director + `</li>
                                <li class="list-group-item"><strong>Actors: </strong>`+ movie.Actors + `</li>
                                <li class="list-group-item"><strong>Plot: </strong>`+ movie.Plot + `</li>
                            </ul>
                        </div>
                    </div>
                </div>
                `);
            }
        }
    })
});
