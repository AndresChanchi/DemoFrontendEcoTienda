import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import './ProfilePage.css'; // Importa el archivo CSS para estilos personalizados
import Cookies from 'universal-cookie';
import { User } from '../../interfaces/User.interface';
import { getUserId, updateUser } from '../../services/UsersService';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const ProfilePage = () => {
  const cookies = new Cookies();
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    name: '',
    lastname: '',
    phone: '',
    avatar: null
  });
  const [passwordValues, setPasswordValues] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState<'success' | 'danger'>('success');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser();
  }, []); // Asegúrate de que el array de dependencias esté vacío para que solo se ejecute una vez

  const getUser = async () => {
    const token = cookies.get('token');
    const userid = cookies.get('user');
    const users = await getUserId(token, userid.id);
    console.log("GET USER:::::", users);
    setUser(users);
    setFormValues({
      username: users.username,
      email: users.email,
      name: users.details.name,
      lastname: users.details.lastname,
      phone: users.details.phone,
      avatar: null
    });
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;
    if (name === 'avatar' && files) {
      setFormValues({ ...formValues, avatar: files[0] });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPasswordValues({ ...passwordValues, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos del formulario al servidor
    const token = cookies.get('token');
    const userid = cookies.get('user');
    const userData = {
      username: formValues.username,
      email: formValues.email,
      details: {
        name: formValues.name,
        lastname: formValues.lastname,
        phone: formValues.phone
      }
    };
    await updateUser(token, userid.id, userData);
    getUser();
    setAlertMessage('Profile updated successfully!');
    setAlertVariant('success');
  };

  const handleChangePassword = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (passwordValues.newPassword !== passwordValues.confirmPassword) {
      setAlertMessage('New passwords do not match!');
      setAlertVariant('danger');
      return;
    }
    // Aquí puedes agregar la lógica para cambiar la contraseña en el servidor
    setAlertMessage('Password changed successfully!');
    setAlertVariant('success');
  };

  return (
    <Container className="mt-5 profile-page">
      {alertMessage && (
        <Alert variant={alertVariant} onClose={() => setAlertMessage('')} dismissible>
          {alertMessage}
        </Alert>
      )}
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="profile" title="Profile">
          <Card className="bg-dark text-white mb-4">
            <Card.Body>
              <h2 className="mb-4">Profile Page</h2>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        name="username"
                        value={formValues.username}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formValues.email}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formValues.name}
                        onChange={handleFormChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label>Lastname</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastname"
                        value={formValues.lastname}
                        onChange={handleFormChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="text"
                        name="phone"
                        value={formValues.phone}
                        onChange={handleFormChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="primary" type="submit">
                  Update Profile
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="password" title="Change Password">
          <Card className="bg-dark text-white">
            <Card.Body>
              <h2 className="mb-4">Change Password</h2>
              <Form onSubmit={handleChangePassword}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label>Current Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="currentPassword"
                        value={passwordValues.currentPassword}
                        onChange={handlePasswordChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="newPassword"
                        value={passwordValues.newPassword}
                        onChange={handlePasswordChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label>Confirm New Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={passwordValues.confirmPassword}
                        onChange={handlePasswordChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="primary" type="submit">
                  Change Password
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default ProfilePage;