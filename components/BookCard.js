import useSWR from 'swr';
import { Card, Button } from 'react-bootstrap';
import Error from 'next/error';
import Link from 'next/link';

export default function BookCard({ workId }) {
  const { data, error } = useSWR(workId ? `https://openlibrary.org/works/${workId}.json`:null);

  if (error) {
    return <Error statusCode={404} />;
  }

  if(data){

    const coverId = data?.covers?.[0];

    return (
      <Card>
        <Card.Img
          variant="top"
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/200x300?text=No+Cover"; }}
          className="img-fluid"
          src={coverId ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` : "https://placehold.co/200x300?text=No+Cover"}
          alt="Cover"
        />
        <Card.Body>
          <Card.Title>{data.title || ''}</Card.Title>
          <Card.Text>{data.first_publish_date || data.first_publish_year || 'N/A'}</Card.Text>
          <Link href={`/works/${workId}`}>
            <Button variant="primary">View</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }else{
    return null;
  }
}
