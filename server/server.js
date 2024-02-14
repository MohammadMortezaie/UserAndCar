const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express'); 
const fs = require('fs');
const path = require('path');

let users = [
    {
      id: '1',
      firstname: 'John',
      lastname: 'Doe',
      cars: [
        {
          id: '1',
          name: 'Car 1',
          year: 2020,
          make: 'Toyota',
          model: 'Camry',
          price: 25000
        },
        {
          id: '2',
          name: 'Car 2',
          year: 2018,
          make: 'Honda',
          model: 'Civic',
          price: 20000
        }
      ]
    },
    {
      id: '2',
      firstname: 'Alice',
      lastname: 'Smith',
      cars: [
        {
          id: '3',
          name: 'Car 3',
          year: 2019,
          make: 'Ford',
          model: 'Focus',
          price: 18000
        }
      ]
    }
  ];
  
  let cars = [
    {
      id: '1',
      name: 'Car 1',
      year: 2020,
      make: 'Toyota',
      model: 'Camry',
      price: 25000,
      userId: '1'
    },
    {
      id: '2',
      name: 'Car 2',
      year: 2018,
      make: 'Honda',
      model: 'Civic',
      price: 20000,
      userId: '1'
    },
    {
      id: '3',
      name: 'Car 3',
      year: 2019,
      make: 'Ford',
      model: 'Focus',
      price: 18000,
      userId: '2'
    }
  ];
  


const schemaPath = path.join(__dirname, 'graphql', 'schema.graphql');
const typeDefs = gql(fs.readFileSync(schemaPath, 'utf8'));

const resolvers = {
    Query: {
      getUser: (parent, { id }, context, info) => {
        return users.find(user => user.id === id);
      },
      getCar: (parent, { id }, context, info) => {
        return cars.find(car => car.id === id);
      },  
      getUsers: () => {
        return users;
      },
      getCars: () => {
        return cars;
      }
    },
    Mutation: {
      createUser: (parent, { firstname, lastname }, context, info) => {
        const newUser = {
          id: String(users.length + 1),
          firstname,
          lastname,
          cars: []
        };
        users.push(newUser);
        return newUser;
      },
      createCar: (parent, { name, year, make, model, price, userId }, context, info) => {
        const newCar = {
          id: String(cars.length + 1),
          name,
          year,
          make,
          model,
          price,
          user: userId ? users.find(user => user.id === userId) : null
        };
        cars.push(newCar);
        if (userId) {
          const userIndex = users.findIndex(user => user.id === userId);
          if (userIndex !== -1) {
            users[userIndex].cars.push(newCar);
          }
        }
        return newCar;
      },
      updateCar: (parent, { id, name, year, make, model, price }, context, info) => {
        const carIndex = cars.findIndex(car => car.id === id);
        if (carIndex === -1) {
          throw new Error('Car not found');
        }
        cars[carIndex] = {
          ...cars[carIndex],
          name,
          year,
          make,
          model,
          price
        };
        return cars[carIndex];
      },
      deleteUser: (parent, { id }, context, info) => {
        const userIndex = users.findIndex(user => user.id === id);
        if (userIndex === -1) {
          throw new Error('User not found');
        }
        users = users.filter(user => user.id !== id);
        return 1; // Success
      },
      deleteCar: (parent, { id }, context, info) => {
        const carIndex = cars.findIndex(car => car.id === id);
        if (carIndex === -1) {
          throw new Error('Car not found');
        }
        cars = cars.filter(car => car.id !== id);
        return 1; // Success
      },
    },
  };
  


const app = express();

async function startApolloServer() {
    // Create an ApolloServer instance
    const server = new ApolloServer({ typeDefs, resolvers });
  
    // Start the server
    await server.start();
  
    // Apply middleware to integrate Apollo Server with Express
    server.applyMiddleware({ app });
  
    // Define a port for your server
    const PORT = process.env.PORT || 4000;
  
    // Start the server
    app.listen({ port: PORT }, () =>
      console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
    );
  }
  
  

  startApolloServer().catch(error => console.log(error));
