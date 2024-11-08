import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col, Alert} from 'react-bootstrap';
import './ShopPage.css';
import Cookies from 'universal-cookie';
import { exchangeGCT } from '../../services/EcoStayService';
import LoadingComponent from '../../components/loading/LoadingComponent';

const products = [
  {
    id: 1,
    name: 'Caminata en la montaña',
    description: 'Caminata a la montaña más alta de la región',
    price: '$15.00',
    priceGCT: 15,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 2,
    name: 'Descuento en el restaurante',
    description: 'Descuento en el restaurante de comida rápida',
    price: '$28.00',
    priceGCT: 28,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 3,
    name: 'Entrada al cine',
    description: 'descuento de 50% en el cine',
    price: '$30.00',
    priceGCT: 30,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 4,
    name: 'Palomitas de maíz',
    description: 'Descuento en palomitas de maíz 40%',
    price: '$24.00',
    priceGCT: 24,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 5,
    name: 'Canoping',
    description: 'Canoping en la selva',
    price: '$50.00',
    priceGCT: 50,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 6,
    name: 'Canotage',
    description: 'Canotage en el río',
    price: '$30.00',
    priceGCT: 30,
    image: 'https://via.placeholder.com/150'
  }
];

const ShopPage = () => {
  const cookies = new Cookies();
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState<'success' | 'danger'>('success');
  const [transactionHash, setTransactionHash] = useState('');

  useEffect(() => {
    getAddress();
  }, []);

  const getAddress = async () => {
    const user = cookies.get('user');
    setAddress(user.wallet.address);
  }

  const handleBuy = async (description: string, price: number) => {
    try {
      setLoading(true);
      console.log('Comprando producto...', description);
      console.log('ADDRESS:::::::',address)
      // Aquí iría la lógica para comprar el producto
      const hash = await exchangeGCT(address, price, description);
      setTransactionHash(hash);
      setAlertMessage('Transacción registrada con éxito: ' + hash);
      setAlertVariant('success');
      setLoading(false);
    } catch (error) {
      setAlertMessage('Error al obtener el balance de GCT: ' + error.message);
      setAlertVariant('danger');
      setLoading(false);
    }
  }

  return (
    <Container className="shop-page mt-5">
      {loading && <LoadingComponent />}
      <h1 className="text-center mb-4">Tienda</h1>
      {alertMessage && (
        <Alert variant={alertVariant} onClose={() => setAlertMessage('')} dismissible>
          {alertMessage}
        </Alert>
      )}
      <Row>
        {products.map(product => (
          <Col key={product.id} md={4} className="mb-4">
            <Card className="bg-dark text-white">
              <Card.Img variant="top" src={product.image} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text><strong>{product.price}</strong></Card.Text>
                <Card.Text><strong>{product.priceGCT} GTC</strong></Card.Text>
                <Button variant="primary" onClick={() => handleBuy(product.description, product.priceGCT)}>Comprar</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ShopPage;