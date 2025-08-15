import React, { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col, Alert, Toast, ToastContainer } from 'react-bootstrap';
import NavigationBar from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import SearchFilterBar from './components/SearchFilterBar';
import MovieCard from './components/MovieCard';
import MovieModal from './components/MovieModal';
import MovieRequestForm from './components/MovieRequestForm';
import { movies, allGenres } from './data/movies';

function App() {
  // State management
  const [activePage, setActivePage] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('none');
  const [favourites, setFavourites] = useState([]); // Stores movie IDs
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Load favourites from localStorage on component mount
  useEffect(() => {
    const savedFavourites = localStorage.getItem('movieFavourites');
    if (savedFavourites) {
      setFavourites(JSON.parse(savedFavourites));
    }
  }, []);

  // Save favourites to localStorage whenever favourites change
  useEffect(() => {
    localStorage.setItem('movieFavourites', JSON.stringify(favourites));
  }, [favourites]);

  // Filter and sort movies using useMemo for performance
  const filteredAndSortedMovies = useMemo(() => {
    let filtered = movies;

    // Filter by search term (case-insensitive)
    if (searchTerm.trim()) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by genre
    if (selectedGenre !== 'All') {
      filtered = filtered.filter(movie => movie.genre === selectedGenre);
    }

    // Sort movies
    if (sortBy !== 'none') {
      filtered = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case 'duration-asc':
            return a.duration - b.duration;
          case 'duration-desc':
            return b.duration - a.duration;
          case 'title-asc':
            return a.title.localeCompare(b.title);
          case 'title-desc':
            return b.title.localeCompare(a.title);
          case 'year-desc':
            return b.year - a.year;
          case 'year-asc':
            return a.year - b.year;
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [movies, searchTerm, selectedGenre, sortBy]);

  // Get movies for current page
  const getCurrentPageMovies = () => {
    if (activePage === 'favourites') {
      return movies.filter(movie => favourites.includes(movie.id));
    }
    return filteredAndSortedMovies;
  };

  const currentPageMovies = getCurrentPageMovies();

  // Event handlers
  const handleAddToFavourites = (movie) => {
    const isFavourite = favourites.includes(movie.id);
    
    if (isFavourite) {
      setFavourites(prev => prev.filter(id => id !== movie.id));
      setToastMessage('Removed from favourites!');
    } else {
      setFavourites(prev => [...prev, movie.id]);
      setToastMessage('Added to favourites!');
    }
    
    setShowToast(true);
  };

  const handleShowDetails = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const handleRequestSubmit = (formData) => {
    console.log('Movie request submitted:', formData);
    // In a real app, this would send data to an API
  };

  const handlePageChange = (page) => {
    setActivePage(page);
    // Reset filters when changing pages
    if (page === 'home') {
      setSearchTerm('');
      setSelectedGenre('All');
      setSortBy('none');
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      <NavigationBar activePage={activePage} onPageChange={handlePageChange} />
      
      {/* Content area with adjusted margin for fixed navbar */}
      <div className="pt-5">
        {activePage === 'home' && (
          <>
            <HeroCarousel movies={movies} />
            <Container>
              <SearchFilterBar
                searchTerm={searchTerm}
                selectedGenre={selectedGenre}
                sortBy={sortBy}
                onSearchChange={setSearchTerm}
                onGenreChange={setSelectedGenre}
                onSortChange={setSortBy}
                allGenres={allGenres}
                resultCount={currentPageMovies.length}
              />
            </Container>
          </>
        )}

        <Container className="py-4">
          {activePage === 'request' ? (
            <MovieRequestForm 
              allGenres={allGenres} 
              onSubmit={handleRequestSubmit} 
            />
          ) : (
            <>
              {activePage === 'favourites' && (
                <div className="mb-4">
                  <h2 className="text-dark">My Favourite Movies</h2>
                  {favourites.length === 0 && (
                    <Alert variant="info">
                      No favourites yet.
                    </Alert>
                  )}
                </div>
              )}

              {currentPageMovies.length === 0 ? (
                <Alert variant="warning">
                  {activePage === 'favourites' 
                    ? 'No favourite movies found.' 
                    : 'No movies found matching your criteria.'
                  }
                </Alert>
              ) : (
                <Row>
                  {currentPageMovies.map(movie => (
                    <Col key={movie.id} lg={4} md={6} className="mb-4">
                      <MovieCard
                        movie={movie}
                        isFavourite={favourites.includes(movie.id)}
                        onAddToFavourites={handleAddToFavourites}
                        onShowDetails={handleShowDetails}
                      />
                    </Col>
                  ))}
                </Row>
              )}
            </>
          )}
        </Container>
      </div>

      {/* Movie Details Modal */}
      <MovieModal
        movie={selectedMovie}
        show={showModal}
        onHide={() => setShowModal(false)}
      />

      {/* Toast Notifications */}
      <ToastContainer position="top-end" className="p-3">
        <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          bg="success"
        >
          <Toast.Header>
            <strong className="me-auto">Movie Explorer</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            {toastMessage}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default App;
