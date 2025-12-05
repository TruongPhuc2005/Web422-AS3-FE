/*********************************************************************************
* WEB422 – Assignment 3
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Duong Truong Phuc Nguyen Student ID: 176712230 Date: December 5th, 2025
*
* Vercel App (Deployed) Link: https://web-ass3-lemon.vercel.app/
*
********************************************************************************/

import PageHeader from '@/components/PageHeader';
import SearchForm from '@/components/SearchForm';
import { Container } from 'react-bootstrap';

export default function Home() {
  return (
    <Container>
      <PageHeader text="Search" subtext="Search OpenLibrary by author, title, subject, language, year" />
      <SearchForm />
    </Container>
  );
}
