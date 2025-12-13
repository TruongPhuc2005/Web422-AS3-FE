import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Table, Pagination } from 'react-bootstrap';
import { useRouter } from 'next/router';
import PageHeader from '@/components/PageHeader';

export default function Books() {
  const router = useRouter();
  const [page, setPage] = useState(1);

  // --- START OF PROFESSOR'S CHANGES ---
  let qParts = [];
  
  // Convert router query object into an array of "key:value" strings
  if (router.query) {
    Object.entries(router.query).forEach(([key, value]) => {
      qParts.push(`${key}:${value}`);
    });
  }

  // Join them with " AND " to create the specific search string format
  const queryString = qParts.join(' AND ');
  
  // Construct the new URL using 'q='
  const fetchUrl = `https://openlibrary.org/search.json?q=${queryString}&page=${page}&limit=10`;
  // --- END OF PROFESSOR'S CHANGES ---

  const { data, error } = useSWR(
    qParts.length > 0 ? fetchUrl : null
  );

  const subtext = Object.keys(router.query).length > 0
    ? Object.entries(router.query).map(([k,v]) => `${k}: ${v}`).join(' | ')
    : 'No query yet';

  return (
    <>
      <PageHeader text="Search Results" subtext={subtext} />
      {!data && !error && <p>Enter search criteria and submit the form.</p>}
      {error && <p>Error loading results.</p>}
      {data && (
        <>
          <Table striped hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>First Published</th>
              </tr>
            </thead>
            <tbody>
              {(data.docs || []).map(item => (
                <tr key={item.key} onClick={() => router.push(item.key)}>
                  <td>{item.title}</td>
                  <td>{item.first_publish_year || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Pagination>
            <Pagination.Prev onClick={() => setPage(p => Math.max(1, p - 1))} />
            <Pagination.Item>{page}</Pagination.Item>
            <Pagination.Next onClick={() => setPage(p => p + 1)} />
          </Pagination>
        </>
      )}
    </>
  );
}