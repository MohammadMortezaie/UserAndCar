import React from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

import { List, Skeleton ,Button, message } from 'antd';

export const GET_CARS = gql`
  query {
    getCars {
      id
      name
      year
      make
      model
      price
    }
  }
`;


const CarList = () => {
  // Fetch car data using Apollo Client
  const { loading, error, data } = useQuery(GET_CARS);

  if (loading) return <Skeleton active />;
  if (error) return <p>Error: {error.message}</p>;

  
  const handleAdd = () => {
    message.info("Add new");
  };
  
  const handleEdit = (carId) => {
    console.log("Editing car with ID:", carId);
    message.info("Editing car with ID:"+ carId);
  };

  
  const handleDelete = (carId) => {
    console.log("Deleting car with ID:", carId);
    message.info("Deleting car with ID:"+ carId);
  };

  return (
    <div>
      <h2>Car List</h2>
        <Button type="primary"  onClick={() => handleAdd()}>+ Add New Car</Button>
      <List
        itemLayout="horizontal"
        dataSource={data.getCars}
        renderItem={car => (
          <List.Item
            actions={[
              <Button type="primary" onClick={() => handleEdit(car.id)}>Edit</Button>,
              <Button type="primary" danger onClick={() => handleDelete(car.id)}>Delete</Button>,
            ]}
          >
            <List.Item.Meta
              title={<a href={`/car/${car.id}`}>{car.name}</a>}
              description={`${car.year} ${car.make} ${car.model} ($${car.price})`}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default CarList;
