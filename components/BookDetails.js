import { Container, Row, Col, Button } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/../store'; 
import { useState, useEffect } from 'react';
import { addToFavourites, removeFromFavourites } from '@/lib/userData'; 

export default function BookDetails({ book, workId, showFavouriteBtn = true}) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false); 

  const coverId = book.covers?.[0];

  useEffect(() => {
    setShowAdded(favouritesList?.includes(workId));
  }, [favouritesList, workId]);

  async function favouritesClicked() {
    if (showAdded) {
      setFavouritesList(await removeFromFavourites(workId));
      setShowAdded(false); 
    } else {
      setFavouritesList(await addToFavourites(workId));
      setShowAdded(true); 
    }
  }

return (
    <Container>
      <Row>
        <Col lg="4">
          <img
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x600?text=Cover+Not+Available"; }}
            className="img-fluid w-100"
            src={coverId ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg` : "https://placehold.co/400x600?text=Cover+Not+Available"}
            alt="Cover Image"
          />
          <br /><br />
        </Col>

        <Col lg="8">
          <h3>{book.title}</h3>

          {book.description && (
            <p>{typeof book.description === 'string' ? book.description : book.description.value}</p>
          )}

          {book.subject_people && (<><h5>Characters</h5><p>{book.subject_people.join(', ')}</p></>)}
          {book.subject_places && (<><h5>Settings</h5><p>{book.subject_places.join(', ')}</p></>)}
          {book.links && (
            <>
              <h5>More Information</h5>
              {book.links.map((l, i) => (
                <div key={i}><a href={l.url} target="_blank" rel="noopener noreferrer">{l.title || l.url}</a></div>
              ))}
            </>
          )}

          {showFavouriteBtn && (
            <>
              <br />
              <Button
                variant={showAdded ? 'primary' : 'outline-primary'}
                onClick={favouritesClicked}
              >
                {showAdded ? '+ Favourite (added)' : '+ Favourite'}
              </Button>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}