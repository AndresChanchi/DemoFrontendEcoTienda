import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Cookies from 'universal-cookie';

const Dashboard = () => {
  const cookies = new Cookies();
  const [userId, setUserId] = useState('');

  useEffect(() => {
    getUsers();
}, []);

const getUsers = async () => {
    const users = cookies.get('user');
    setUserId(users.id);
};


  const handleGenerateLink = () => {
    alert(`http://localhost:5173/register/reference/${userId}`)
  };
  
  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">Dashboard</h1>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Airdrop</Card.Title>
              <Card.Text>
              Recibe tokens gratis como parte de nuestro programa de airdrop.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Bono de Referencia</Card.Title>
              <Card.Text>
              Gana recompensas refiriendo amigos a nuestra plataforma.
              </Card.Text>
              <Button variant="primary" onClick={handleGenerateLink}>Generar Link</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Siembra</Card.Title>
              <Card.Text>
              Airdrop por que el usuario participe en actividad de siembra de árboles?
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;