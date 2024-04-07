import './App.css';
import { useGetAllQuery } from './api/authorApi'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { Spinner, Table } from 'react-bootstrap';

function App() {
  const { data, error, isLoading } = useGetAllQuery();

  return (
    <div className="App">
      <Container>
        {isLoading ? (<Container>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>) : (<Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
          </tr>
        </thead>
        <tbody>
          {data!.map(author=> (<tr key={author.id}>
            <td>{author.name}</td>
            <td>{author.email}</td>
            <td>{new Date(author.dateOfBirth).toDateString()}</td>
          </tr>))}
        </tbody>
      </Table>)}
      </Container>
    </div>
  );
}

export default App;
