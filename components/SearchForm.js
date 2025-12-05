import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';

export default function SearchForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  const onSubmit = data => {
    const cleaned = Object.fromEntries(Object.entries(data).filter(([k,v]) => v !== ''));
    router.push({
      pathname: '/books',
      query: cleaned
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3">
        <Form.Label>Author (required)</Form.Label>
        <Form.Control
          {...register('author', { required: true })}
          className={errors.author ? 'is-invalid' : ''}
        />
        {errors.author && <div className="invalid-feedback">Author is required</div>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control {...register('title')} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Subject</Form.Label>
        <Form.Control {...register('subject')} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Language (3-letter code, e.g. eng)</Form.Label>
        <Form.Control {...register('language')} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>First publish year</Form.Label>
        <Form.Control {...register('first_publish_year')} />
      </Form.Group>

      <Button type="submit">Search</Button>
    </Form>
  );
}
