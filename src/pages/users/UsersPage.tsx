import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { getAllUsers, createUser, updateUser, deleteUser, setRoleUser } from '../../services/UsersService';
import { Table, Form, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { User } from '../../interfaces/User.interface';
import './UsersPage.css'; // Importa el archivo CSS para estilos personalizados
import { RoleResponse } from '../../interfaces/Role.interface';
import { getAllRole } from '../../services/RolesService';

const UsersPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userToDelete, setUserToDelete] = useState<string | null>(null);
    const [formValues, setFormValues] = useState({ username: '', email: '', name: '', lastname: '', phone: '', password: '' });
    const [userRoles, setUserRoles] = useState<RoleResponse[]>([]);
    const [selectedRole, setSelectedRole] = useState<string>('');
    const cookies = new Cookies();

    useEffect(() => {
        getUsers();
        getRolesList();
    }, []);

    const getUsers = async () => {
        const token = cookies.get('token');
        const users = await getAllUsers(token);
        setUsers(users);
    };

    const getRolesList = async () => {
        const token = cookies.get('token');
        const roles = await getAllRole(token);
        setUserRoles(Array.isArray(roles) ? roles : []);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleShowModal = (user: User | null = null) => {
        setCurrentUser(user);
        setFormValues(user ? { username: user.username, email: user.email, name: user.details.name, lastname: user.details.lastname, phone: user.details.phone, password: '' } : { username: '', email: '', name: '', lastname: '', phone: '', password: 'loquesea' });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentUser(null);
    };

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async () => {
        const token = cookies.get('token');
        const userData = {
            username: formValues.username,
            email: formValues.email,
            details: {
                name: formValues.name,
                lastname: formValues.lastname,
                phone: formValues.phone
            }
        };

        if (currentUser) {
            await updateUser(token, currentUser.id, userData);
        } else {
            await createUser(token, formValues);
        }
        getUsers();
        handleCloseModal();
    };

    const handleShowConfirmModal = (userId: string) => {
        setUserToDelete(userId);
        setShowConfirmModal(true);
    };

    const handleCloseConfirmModal = () => {
        setShowConfirmModal(false);
        setUserToDelete(null);
    };

    const handleDelete = async () => {
        if (userToDelete) {
            const token = cookies.get('token');
            await deleteUser(token, userToDelete);
            getUsers();
            handleCloseConfirmModal();
        }
    };

    const handleShowRoleModal = (user: User) => {
        setCurrentUser(user);
        setShowRoleModal(true);
    };

    const handleCloseRoleModal = () => {
        setShowRoleModal(false);
        setCurrentUser(null);
        setSelectedRole('');
    };

    const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRole(event.target.value);
    };

    const handleAssignRole = async () => {
        if (currentUser && selectedRole) {
            const token = cookies.get('token');
            await setRoleUser(token, currentUser.id, selectedRole);
            getUsers();
            handleCloseRoleModal();
        }
    };

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.details.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.details.lastname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="users-page">
            <h1>Users</h1>
            <Button variant="primary" onClick={() => handleShowModal()}>Add User</Button>
            <Form.Group controlId="search" className="mt-3">
                <Form.Label>Search</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Search by username, email, name, or lastname"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </Form.Group>
            <Table striped bordered hover variant="dark" className="mt-3">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Lastname</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map(user => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.details.name}</td>
                            <td>{user.details.lastname}</td>
                            <td>{user.details.phone}</td>
                            <td>{user.roles.map(role => role.name).join(', ')}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleShowModal(user)}>Edit</Button>{' '}
                                {Array.isArray(userRoles) && userRoles.some(role => role.name === 'SUPER_ADMIN') && (<Button variant="danger" onClick={() => handleShowConfirmModal(user.id)}>Delete</Button>)}
                                {Array.isArray(userRoles) && userRoles.some(role => role.name === 'SUPER_ADMIN') && (<Button variant="primary" onClick={() => handleShowRoleModal(user)}>Assign Role</Button>)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleCloseModal} className="dark-modal">
                <Modal.Header closeButton>
                    <Modal.Title>{currentUser ? 'Edit User' : 'Add User'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={formValues.username}
                                onChange={handleFormChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail" className="mt-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formValues.email}
                                onChange={handleFormChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formName" className="mt-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formValues.name}
                                onChange={handleFormChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formLastname" className="mt-3">
                            <Form.Label>Lastname</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastname"
                                value={formValues.lastname}
                                onChange={handleFormChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPhone" className="mt-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                value={formValues.phone}
                                onChange={handleFormChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                    <Button variant="primary" onClick={handleSubmit}>{currentUser ? 'Update User' : 'Add User'}</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showConfirmModal} onHide={handleCloseConfirmModal} className="dark-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this user?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseConfirmModal}>Cancel</Button>
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showRoleModal} onHide={handleCloseRoleModal} className="dark-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Assign Role</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formRole">
                            <Form.Label>Select Role</Form.Label>
                            <Form.Control as="select" value={selectedRole} onChange={handleRoleChange}>
                                <option value="">Select a role</option>
                                {Array.isArray(userRoles) && userRoles.map(role => (
                                    <option key={role.id} value={role.id}>{role.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseRoleModal}>Close</Button>
                    <Button variant="primary" onClick={handleAssignRole}>Assign Role</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UsersPage;