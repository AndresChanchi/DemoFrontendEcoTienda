import React, { useEffect, useState } from 'react';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Alert, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Register } from '../../fetch/Auth';
import { distributeReward } from '../../services/RewardService';
import LoadingComponent from '../../components/loading/LoadingComponent';
import './RegisterReferencePage.css';
import { getUserIdReference } from '../../services/UsersService';

interface RegisterFormValues {
    username: string;
    email: string;
    password: string;
    name: string;
    lastname: string;
    phone: string;
}

const RegisterReferencePage = () => {
    const { userId } = useParams<{ userId: string }>();

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState<'success' | 'danger'>('success');
    const [addressU, setAddressU] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [referenceLink, setReferenceLink] = useState('');

    useEffect(() => {
        getUsers();
    }, []);
    
    const getUsers = async () => {
        const users = await getUserIdReference(userId);
        console.log("GET USER:::::", users.wallet.address);
        setAddressU(users.wallet.address);
    };

    const onSubmit = async (values: RegisterFormValues, { setSubmitting, setErrors }: FormikHelpers<RegisterFormValues>) => {
        setLoading(true);
        try {
            const data = {
                username: values.username,
                email: values.email,
                password: values.password,
                name: values.name,
                lastname: values.lastname,
                phone: values.phone
            };

            const register = await Register(data); // fetch para llamar función de autenticación
            console.log(register.data.wallet.address);
            await handleReward(register.data.wallet.address);
        
            navigate('/login');
        } catch (error) {
            console.error('Error login', error);
            setErrors({ email: 'Error en el servidor. Inténtalo de nuevo más tarde.' });
            setAlertMessage('Error en el servidor. Inténtalo de nuevo más tarde.');
            setAlertVariant('danger');
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    };

    const handleReward = async (address: string) => {
        try {
            console.log('paso la transaccion', address);
            const txHash = await distributeReward(address, 35);
            const txHashReference = await distributeReward(addressU, 50);
            setAlertMessage(`Recompensa distribuida con éxito. Hash de la transacción: ${txHash}`);
            setAlertVariant('success');
        } catch (error) {
            setAlertMessage(`Error al distribuir la recompensa: ${error.message}`);
            setAlertVariant('danger');
        }
    };

    const validationSchema = Yup.object().shape({
        phone: Yup.string().required('Teléfono requerido'),
        name: Yup.string().required('Nombre requerido'),
        lastname: Yup.string().required('Apellido requerido'),
        username: Yup.string().required('Username requerido'),
        email: Yup.string().email('Email inválido').required('Email requerido'),
        password: Yup.string().trim().min(6, 'Mínimo 6 caracteres').required('Password requerido')
    });

    const handleGenerateLink = () => {
        const link = `${window.location.origin}/register/reference/${userId}`;
        setReferenceLink(link);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className='card-container'>
            {loading && <LoadingComponent />}
            <Container>
                <section className="vh-50">
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100 container-register">
                            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                <Card className="bg-dark text-white">
                                    <Card.Body className="p-5 text-center">
                                        {alertMessage && (
                                            <Alert variant={alertVariant} onClose={() => setAlertMessage('')} dismissible>
                                                {alertMessage}
                                            </Alert>
                                        )}
                                        <Formik
                                            initialValues={{ username: '', name: '', lastname: '', email: '', password: '', phone: '' }}
                                            onSubmit={onSubmit}
                                            validationSchema={validationSchema}
                                        >
                                            {({ values, handleSubmit, handleChange, errors, touched, handleBlur, isSubmitting }) => (
                                                <Form onSubmit={handleSubmit}>
                                                    <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
                                                    <p className="text-white-50 mb-5">Please enter your data!</p>
                                                    <Row>
                                                        <Col md={6}>
                                                            <Form.Group className="mb-4">
                                                                <Form.Label>Username</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    id="username"
                                                                    name="username"
                                                                    value={values.username}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    disabled={isSubmitting}
                                                                    isInvalid={touched.username && !!errors.username}
                                                                />
                                                                <Form.Control.Feedback type="invalid">
                                                                    {errors.username}
                                                                </Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Group className="mb-4">
                                                                <Form.Label>Name</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    id="name"
                                                                    name="name"
                                                                    value={values.name}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    disabled={isSubmitting}
                                                                    isInvalid={touched.name && !!errors.name}
                                                                />
                                                                <Form.Control.Feedback type="invalid">
                                                                    {errors.name}
                                                                </Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md={6}>
                                                            <Form.Group className="mb-4">
                                                                <Form.Label>Lastname</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    id="lastname"
                                                                    name="lastname"
                                                                    value={values.lastname}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    disabled={isSubmitting}
                                                                    isInvalid={touched.lastname && !!errors.lastname}
                                                                />
                                                                <Form.Control.Feedback type="invalid">
                                                                    {errors.lastname}
                                                                </Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Group className="mb-4">
                                                                <Form.Label>Phone</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    id="phone"
                                                                    name="phone"
                                                                    value={values.phone}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    disabled={isSubmitting}
                                                                    isInvalid={touched.phone && !!errors.phone}
                                                                />
                                                                <Form.Control.Feedback type="invalid">
                                                                    {errors.phone}
                                                                </Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md={6}>
                                                            <Form.Group className="mb-4">
                                                                <Form.Label>Email</Form.Label>
                                                                <Form.Control
                                                                    type="email"
                                                                    id="email"
                                                                    name="email"
                                                                    value={values.email}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    disabled={isSubmitting}
                                                                    isInvalid={touched.email && !!errors.email}
                                                                />
                                                                <Form.Control.Feedback type="invalid">
                                                                    {errors.email}
                                                                </Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Group className="mb-4">
                                                                <Form.Label>Password</Form.Label>
                                                                <Form.Control
                                                                    type="password"
                                                                    id="password"
                                                                    name="password"
                                                                    value={values.password}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    disabled={isSubmitting}
                                                                    isInvalid={touched.password && !!errors.password}
                                                                />
                                                                <Form.Control.Feedback type="invalid">
                                                                    {errors.password}
                                                                </Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Button
                                                        type="submit"
                                                        variant="outline-light"
                                                        size="lg"
                                                        className="px-5"
                                                        disabled={isSubmitting}
                                                    >
                                                        Register
                                                    </Button>
                                                    <Button
                                                        variant="outline-light"
                                                        size="lg"
                                                        className="px-5 ms-3"
                                                        onClick={handleGenerateLink}
                                                    >
                                                        Generate Link
                                                    </Button>
                                                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                                                        <a href="#!" className="text-white"><i className="fab fa-facebook-f fa-lg"></i></a>
                                                        <a href="#!" className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                                                        <a href="#!" className="text-white"><i className="fab fa-google fa-lg"></i></a>
                                                    </div>
                                                </Form>
                                            )}
                                        </Formik>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>
            </Container>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Generar Enlace de Referencia</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Enlace de Referencia:</p>
                    <Form.Control
                        type="text"
                        value={referenceLink}
                        readOnly
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default RegisterReferencePage;