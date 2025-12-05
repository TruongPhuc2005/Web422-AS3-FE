import PageHeader from '@/components/PageHeader';
import BookDetails from '@/components/BookDetails';

export default function About({ book }) {
  return (
    <>
      <PageHeader text="About the Developer - Justin Nguyen"  />
      <p>This is my second assignment in WEB422</p>
      <BookDetails book={book} workId="OL453657W" showFavouriteBtn={false} />
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch('https://openlibrary.org/works/OL453657W.json');
  const data = await res.json();
  return { props: { book: data } };
}
