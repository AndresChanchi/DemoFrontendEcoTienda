import React, { useEffect, useState } from 'react'
import { Container, Alert } from 'react-bootstrap'
import Cookies from 'universal-cookie';

import { getExchangeByUser } from '../../services/EcoStayService';

const ShoppingListPage = () => {
    const cookies = new Cookies();
    const [address, setAddress] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState<'success' | 'danger'>('success');

    useEffect(() => {
        getShopping();
    }, []);
    const getShopping = async () => {
        try {
            const user = cookies.get('user');

            setAddress(user.wallet.address);
            console.log('AAAAADDDDREEEESSSS:', user.wallet.address);
            const list = await getExchangeByUser(user.wallet.address);
            console.log(list);
        } catch (error) {
            setAlertMessage('Error al obtener el balance de GCT: ' + error.message);
            setAlertVariant('danger');
        }
    }

    return (
        <Container className="shop-page mt-5">
            {alertMessage && (
                <Alert variant={alertVariant} onClose={() => setAlertMessage('')} dismissible>
                    {alertMessage}
                </Alert>
            )}
            <div>ShoppingListPage</div>
        </Container>

    )
}

export default ShoppingListPage