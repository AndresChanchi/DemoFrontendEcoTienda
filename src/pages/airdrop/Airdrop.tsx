import React, { useEffect, useState } from 'react';
import { recordTransaction, getGCTBalance, distributeReward } from '../../services/EcoStayService';
import { getAllUsers } from '../../services/UsersService';
import { Container, Form, Button, Table, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import { UsersResponse } from '../../interfaces/User.interface';
import LoadingComponent from '../../components/loading/LoadingComponent';

const Airdrop = () => {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState(0);
  const [nameToken, setNameToken] = useState('GCT');
  const [transactionHash, setTransactionHash] = useState('');
  const [users, setUsers] = useState<UsersResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState<'success' | 'danger'>('success');
  const cookies = new Cookies();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const token = cookies.get('token');
    const users = await getAllUsers(token);
    setUsers(users);
  };

  const handleRecordTransaction = async () => {
    try {
      const txHash = await recordTransaction(address, amount, nameToken);
      setTransactionHash(txHash);
      setAlertMessage('Transacción registrada con éxito: ' + txHash);
      setAlertVariant('success');
    } catch (error) {
      setAlertMessage('Error al registrar la transacción: ' + error.message);
      setAlertVariant('danger');
    }
  };

  const handleGetBalance = async () => {
    try {
      const balance = await getGCTBalance(address);
      const tokenGtc = parseInt(balance);
      setAlertMessage('Balance de GCT: ' + tokenGtc / 1000000000000000000);
      setAlertVariant('success');
    } catch (error) {
      setAlertMessage('Error al obtener el balance de GCT: ' + error.message);
      setAlertVariant('danger');
    }
  };

  const handleReward = async () => {
    try {
      setLoading(true);
      const txHash = await distributeReward(address, amount);
      setTransactionHash(txHash);
      setAlertMessage('Transacción registrada con éxito: ' + txHash);
      setAlertVariant('success');
      setLoading(false);
    } catch (error) {
      setAlertMessage('Error al obtener el balance de GCT: ' + error.message);
      setAlertVariant('danger');
      setLoading(false);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectUser = (user) => {
    setAddress(user.wallet.address);
  };

  return (
    <Container className="mt-5">
      {loading && <LoadingComponent />}
      {alertMessage && (
        <Alert variant={alertVariant} onClose={() => setAlertMessage('')} dismissible>
          {alertMessage}
        </Alert>
      )}
      <h2>Registrar Transacción</h2>
      <Form>
        <Form.Group controlId="formAddress">
          <Form.Label>Dirección</Form.Label>
          <Form.Control
            type="text"
            placeholder="Dirección"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formAmount" className="mt-3">
          <Form.Label>Cantidad</Form.Label>
          <Form.Control
            type="number"
            placeholder="Cantidad"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </Form.Group>
        <Form.Group controlId="formToken" className="mt-3">
          <Form.Label>Token</Form.Label>
          <Form.Control as="select" value={nameToken} onChange={(e) => setNameToken(e.target.value)}>
            <option value="EWC">EWC</option>
            <option value="GCT">GCT</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" className="mt-3" onClick={handleRecordTransaction}>Registrar Transacción</Button>
        <Button variant="secondary" className="mt-3 ms-2" onClick={handleGetBalance}>Get Balance</Button>
        <Button variant="success" className="mt-3 ms-2" onClick={handleReward}>Reward</Button>
      </Form>
      {transactionHash && <p className="mt-3">Transacción registrada: {transactionHash}</p>}

      <h2 className="mt-5">Buscar Usuario</h2>
      <Form.Group controlId="formSearch">
        <Form.Label>Buscar</Form.Label>
        <Form.Control
          type="text"
          placeholder="Buscar por username o email"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Form.Group>
      <Table striped bordered hover variant="dark" className="mt-3">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Wallet Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.wallet.address}</td>
              <td>
                <Button variant="info" onClick={() => handleSelectUser(user)}>Select</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Airdrop;