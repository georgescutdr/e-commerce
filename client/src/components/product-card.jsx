import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const ProductCard = (item) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>item.title</Card.Title>
        <Card.Text>
          item.description
        </Card.Text>
        <Button variant="primary">View</Button>
        <Button variant="primary">Add to Cart</Button>
      </Card.Body>
    </Card>
  );
}