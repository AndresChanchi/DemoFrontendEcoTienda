import React, { useEffect, useState } from 'react';
import './Wallet.css';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import { distributeReward } from '../../services/RewardService';
import { getGCTBalance } from '../../services/EcoStayService'
import LoadingComponent from '../../components/loading/LoadingComponent';


const WalletPage = () => {
    const cookies = new Cookies();
    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState(0);
    const [balanceEth, setBalanceEth] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getUser();
        getTokenBalance();
    }, [balance])

    const getUser = async () => {
        const user = cookies.get('user')
        console.log(user.wallet.address);
        setAddress(user.wallet.address);
    }

    const getTokenBalance = async () =>{
        const user = cookies.get('user')
        const gtc = await getGCTBalance(user.wallet.address);
        const tokenGtc = parseInt(gtc)
        setBalance(tokenGtc / 1000000000000000000);
    }

    const handleReward = async () => {
        try {
            setLoading(true);
            console.log('paso la transaccion', address);
            const txHash = await distributeReward(address, 10);
            getTokenBalance();
            alert(`Recompensa distribuida con exito. Hash de la transaccion: ${txHash}`);
            getTokenBalance();
            setLoading(false);
        } catch (error) {
            alert(`Error al distribuir la recompensa: ${error.message}`);
        }
    }

    return (
        <Container className='mt-5'>
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
                                <strong>Token :</strong> {balance ? parseFloat(balance).toFixed() : '0.00'} GTC
                            </Card.Text>
                            <Card.Text>
                                <strong>ETH :</strong> {balanceEth ? parseFloat(balanceEth).toFixed() : '0.00'} 
                            </Card.Text>
                            <Button variant='primary' className='mt-3'>View Transactions</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            

        </Container>
    );
}

export default WalletPage;