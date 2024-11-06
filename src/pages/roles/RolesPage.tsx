import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { getAllRole, createRole, updateRole, deleteRole } from '../../services/RolesService';
import { Table, Form, Button, Modal } from 'react-bootstrap';
import { RoleResponse } from '../../interfaces/Role.interface';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RolesPage.css'; // Importa el archivo CSS para estilos personalizados

const RolesPage = () => {
  const [roles, setRoles] = useState<RoleResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentRole, setCurrentRole] = useState<RoleResponse | null>(null);
  const [roleToDelete, setRoleToDelete] = useState<string | null>(null);
  const [formValues, setFormValues] = useState({ name: '', description: '', status: 'ACTIVE' });
  const cookies = new Cookies();

  useEffect(() => {
    getRoles();
  }, []);

  const getRoles = async () => {
    const token = cookies.get('token');
    //servicio o endpoin de obtener todo los roles
    const roles = await getAllRole(token);
    setRoles(roles);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleShowModal = (role: RoleResponse | null = null) => {
    setCurrentRole(role);
    setFormValues(role ? { name: role.name, description: role.description, status: role.status } : { name: '', description: '', status: 'ACTIVE' });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentRole(null);
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async () => {
    const token = cookies.get('token');
    if (currentRole) {
      await updateRole(token, currentRole.id, formValues);
    } else {
      await createRole(token, formValues);
    }
    getRoles();
    handleCloseModal();
  };

  const handleShowConfirmModal = (roleId: string) => {
    setRoleToDelete(roleId);
    setShowConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setRoleToDelete(null);
  };

  const handleDelete = async () => {
    if (roleToDelete) {
      const token = cookies.get('token');
      await deleteRole(token, roleToDelete);
      getRoles();
      handleCloseConfirmModal();
    }
  };

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="roles-page pt-5">
      <h1>Roles</h1>
      <Button variant="primary" onClick={() => handleShowModal()}>Add Role</Button>
      <Form.Group controlId="search" className="mt-3">
        <Form.Label>Search</Form.Label>
        <Form.Control
          type="text"
          placeholder="Search by name or description"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Form.Group>
      <Table striped bordered hover variant="dark" className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Create Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRoles.map(role => (
            <tr key={role.id}>
              <td>{role.name}</td>
              <td>{role.description}</td>
              <td>{role.status}</td>
              <td>{new Date(role.createdate).toLocaleString()}</td>
              <td>
                <Button variant="warning" onClick={() => handleShowModal(role)}>Edit</Button>{' '}
                <Button variant="danger" onClick={() => handleShowConfirmModal(role.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal} className="dark-modal">
        <Modal.Header closeButton>
          <Modal.Title>{currentRole ? 'Edit Role' : 'Add Role'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formDescription" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={formValues.description}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formStatus" className="mt-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={formValues.status}
                onChange={handleFormChange}
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          <Button variant="primary" onClick={handleSubmit}>{currentRole ? 'Update Role' : 'Add Role'}</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showConfirmModal} onHide={handleCloseConfirmModal} className="dark-modal">
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this role?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmModal}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RolesPage;