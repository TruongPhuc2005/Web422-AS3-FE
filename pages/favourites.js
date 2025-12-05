import PageHeader from '@/components/PageHeader';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/../store';
import { Row, Col } from 'react-bootstrap';
import BookCard from '@/components/BookCard';

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

  if (!favouritesList || favouritesList.length === 0) {
    return (
      <>
        <PageHeader text="Nothing Here" subtext="You have no favourites. Add a book!" />
      </>
    );
  }

  return (
    <>
      <PageHeader text="Favourites" subtext="Your Favourite Books" />
      <Row className="gy-4">
        {favouritesList.map(workId => (
          <Col lg={3} md={6} key={workId}>
            <BookCard workId={workId} />
          </Col>
        ))}
      </Row>
    </>
  );
}