import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import './Dashboard.css'; // Asegúrate de importar el archivo CSS

const Dashboard = () => {
  const cookies = new Cookies();
  const [userId, setUserId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [referenceLink, setReferenceLink] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const users = cookies.get('user');
    setUserId(users.id);
  };

  const handleGenerateLink = () => {
    // Genera la URL base del proyecto dependiendo del sitio
    const urlBase = window.location.origin;
    const link = `${urlBase}/register/reference/${userId}`;
    setReferenceLink(link);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCopySuccess('');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referenceLink).then(() => {
      setCopySuccess('¡Enlace copiado al portapapeles!');
    }, (err) => {
      setCopySuccess('Error al copiar el enlace');
    });
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
              <Card.Title>Bono de Referencia</Card.Title>
              <Card.Text>
                Gana recompensas refiriendo amigos a nuestra plataforma.
              </Card.Text>
              <Button variant="primary" onClick={handleGenerateLink}>Generar Link</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal} className="dark-modal">
        <Modal.Header closeButton>
          <Modal.Title>Generar Enlace de Referencia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Enlace de Referencia:</p>
          <Form.Control
            type="text"
            value={referenceLink}
            readOnly
            className="form-control"
          />
          <Button variant="primary" onClick={handleCopyLink} className="mt-3">
            Copiar Enlace
          </Button>
          {copySuccess && <p className="mt-2">{copySuccess}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Dashboard;