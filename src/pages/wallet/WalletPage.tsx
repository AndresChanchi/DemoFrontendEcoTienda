import React, { useEffect, useState } from 'react';
import './Wallet.css';
import { Card, Col, Container, Row, Button, Modal, Form } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import { distributeReward } from '../../services/RewardService';
import { getETHBalance, getGCTBalance, sendTransaction } from '../../services/EcoStayService';
import LoadingComponent from '../../components/loading/LoadingComponent';

const WalletPage = () => {
    const cookies = new Cookies();
    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState(0);
    const [balanceEth, setBalanceEth] = useState(0);
    const [loading, setLoading] = useState(false);
    const [showTransferModal, setShowTransferModal] = useState(false);
    const [transferForm, setTransferForm] = useState({ to: '', amount: '' });

    useEffect(() => {
        getUser();
        getTokenBalance();
        getBalanceEth();
    }, []); // Asegúrate de que el array de dependencias esté vacío para que solo se ejecute una vez

    const getUser = async () => {
        const user = cookies.get('user');
        console.log(user.wallet.address);
        setAddress(user.wallet.address);
    };

    const getTokenBalance = async () => {
        const user = cookies.get('user');
        console.log('BALANCE::::::::::')
        const gtc = await getGCTBalance(user.wallet.address);
        const tokenGtc = parseInt(gtc);
        setBalance(tokenGtc / 1000000000000000000);
    };

    const getBalanceEth = async () => {
        const user = cookies.get('user');
        const balance = await getETHBalance(user.wallet.address);
        setBalanceEth(balance);
    };

    const handleReward = async () => {
        try {
            setLoading(true);
            console.log('paso la transaccion', address);
            const txHash = await distributeReward(address, 10);
            await getTokenBalance(); // Asegúrate de esperar a que se complete la actualización del balance
            alert(`Recompensa distribuida con exito. Hash de la transaccion: ${txHash}`);
            setLoading(false);
        } catch (error) {
            alert(`Error al distribuir la recompensa: ${error.message}`);
            setLoading(false);
        }
    };

    const handleShowTransferModal = () => {
        setShowTransferModal(true);
    };

    const handleCloseTransferModal = () => {
        setShowTransferModal(false);
        setTransferForm({ to: '', amount: '' });
    };

    const handleTransferFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setTransferForm({ ...transferForm, [name]: value });
    };

    const handleTransfer = async () => {
        try {
            setLoading(true);
            const fromPrivateKey = cookies.get('user'); // Asegúrate de tener la clave privada en las cookies
            const txHash = await sendTransaction(fromPrivateKey.wallet.prvate_key, transferForm.to, transferForm.amount);
            await getBalanceEth(); // Asegúrate de esperar a que se complete la actualización del balance
            alert(`Transferencia realizada con exito. Hash de la transaccion: ${txHash}`);
            setLoading(false);
            handleCloseTransferModal();
        } catch (error) {
            alert(`Error al realizar la transferencia: ${error.message}`);
            setLoading(false);
        }
    };

    return (
        <Container className='pt-5'>
            {loading && <LoadingComponent />}
            <div className='wallet-title text-center mb-4'>
                <h1>Wallet</h1>
            </div>

            <Row className='justify-content-center'>
                <Col md={6}>
                    <Card className='text-center shadow-sm bg-dark text-white'>
                        <Card.Body>
                            <Card.Title className='mb-4'>Account Information</Card.Title>
                            <Card.Text>
                                <strong>Account:</strong> {address}
                            </Card.Text>
                            <Card.Text>
                                <strong>Token :</strong> {balance ? parseFloat(balance).toFixed(2) : '0.00'} GTC
                            </Card.Text>
                            <Card.Text>
                                <strong>ETH :</strong> {balanceEth ? parseFloat(balanceEth).toFixed(2) : '0.00'} 
                            </Card.Text>
                            <Button variant='primary' className='mt-3' onClick={handleShowTransferModal}>Transfer ETH</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Modal show={showTransferModal} onHide={handleCloseTransferModal} className="dark-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Transfer ETH</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formToAddress">
                            <Form.Label>To Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="to"
                                value={transferForm.to}
                                onChange={handleTransferFormChange}
                                placeholder="Enter recipient address"
                            />
                        </Form.Group>
                        <Form.Group controlId="formAmount" className="mt-3">
                            <Form.Label>Amount (ETH)</Form.Label>
                            <Form.Control
                                type="text"
                                name="amount"
                                value={transferForm.amount}
                                onChange={handleTransferFormChange}
                                placeholder="Enter amount to transfer"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseTransferModal}>Close</Button>
                    <Button variant="primary" onClick={handleTransfer}>Transfer</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default WalletPage;