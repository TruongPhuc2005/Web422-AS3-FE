import { Card } from 'react-bootstrap';

// updating "PageHeader" to accept a 'subtext' property
export default function PageHeader({ text, subtext }) {
  return (
    <>
      <Card className="bg-light">
        <Card.Body>
          <h1 className="display-6">{text}</h1>
          {/**only render the 'subtext' value / element i**/}
          {subtext && <p className="lead">{subtext}</p>}
        </Card.Body>
      </Card>
      <br />
    </>
  );
}
