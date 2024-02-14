import React from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

import { List, Skeleton ,Button, message } from 'antd';

export const GET_USERS = gql`
  query {
    getUsers {
      id
      firstname
      lastname
    }
  }
`;


const UserList = () => {
  // Fetch user data using Apollo Client
  const { loading, error, data } = useQuery(GET_USERS);
  if (loading) return <Skeleton active />;
  if (error) return <p>Error: {error.message}</p>;


  const handleAdd = () => {
    message.info("Add new");
  };
  
  const handleEdit = (userId) => {
    console.log("Editing User with ID:", userId);
    message.info("Editing User with ID:"+ userId);
  };

  
  const handleDelete = (userId) => {
    console.log("Deleting User with ID:", userId);
    message.info("Deleting User with ID:"+ userId);
  };

  return (
    <div>
      <h2>User List</h2>
      <Button type="primary"  onClick={() => handleAdd()}>+ Add New User</Button>
      <List
        itemLayout="horizontal"
        dataSource={data.getUsers}
        renderItem={user => (
          <List.Item
            actions={[
                
              <Button type="primary" onClick={() => handleEdit(user.id)}>Learn More</Button>,
              <Button type="primary" onClick={() => handleEdit(user.id)}>Edit</Button>,
              <Button type="primary" danger onClick={() => handleDelete(user.id)}>Delete</Button>,
            ]}
          >
        
            <List.Item.Meta
              title={
                <div>
                  <a href={`/user/${user.id}`}>{user.firstname} {user.lastname}</a>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default UserList;
