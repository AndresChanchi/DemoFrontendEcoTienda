import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col, Alert} from 'react-bootstrap';
import './ShopPage.css';
import Cookies from 'universal-cookie';
import { exchangeGCT } from '../../services/EcoStayService';
import LoadingComponent from '../../components/loading/LoadingComponent';

const products = [
  {
    id: 1,
    name: 'Producto 1',
    description: 'Descripción del producto 1',
    price: '$10.00',
    priceGCT: 10,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 2,
    name: 'Producto 2',
    description: 'Descripción del producto 2',
    price: '$20.00',
    priceGCT: 20,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 3,
    name: 'Producto 3',
    description: 'Descripción del producto 3',
    price: '$30.00',
    priceGCT: 30,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 4,
    name: 'Producto 4',
    description: 'Descripción del producto 4',
    price: '$20.00',
    priceGCT: 20,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 5,
    name: 'Producto 5',
    description: 'Descripción del producto 5',
    price: '$50.00',
    priceGCT: 50,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 6,
    name: 'Producto 6',
    description: 'Descripción del producto 6',
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