import React from 'react';
import CarList from './components/CarList'; 
import UserList from './components/UserList'; 
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

import {  Layout } from 'antd';
const { Header, Content, Footer } = Layout;

loadDevMessages();
loadErrorMessages();


function App() {
  return (
    <div className="App">
      <Content style={{ padding: '0 48px' }}>
        <UserList />
        <hr></hr>
        <CarList />
      </Content>
    </div>
  );
}

export default App;
