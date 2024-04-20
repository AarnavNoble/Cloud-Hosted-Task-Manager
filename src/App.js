import React, { useState } from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { createTodo, updateTodo, deleteTodo } from './graphql/mutations';
import { generateClient } from 'aws-amplify/api';
import { listTodos, getTodo } from './graphql/queries';

import awsExports from './aws-exports';
import './App.css';

Amplify.configure(awsExports);

const client = generateClient();

const App = () => {
  const [confirmation, setConfirmation] = useState('');

  async function storeTodo() {
    try {
      const result = await client.graphql({
        query: createTodo,
        variables: {
          input: {
            name: "Name of Task"
          }
        }
      });
      setConfirmation('Success, please check your AWS account to view your created task!');
      console.log(result)
    } 
    catch (error) {
      console.error('Error storing todo: ', error);
    }
  }

  async function changeTodo() {
    try {
      const result = await client.graphql({
        query: updateTodo,
        variables: {
          input: {
            id: "a417e429-0dce-42bc-b2d3-b7bcb8d70eb8",
            name: "updated"
          }
        }
      });
      setConfirmation('Success, please check your AWS account to view your updated task!');
      console.log(result)
    } 
    catch (error) {
      console.error('Error changing todo: ', error);
    }
  }

  async function removeTodo() {
    try {
      const result = await client.graphql({
        query: deleteTodo,
        variables: {
          input: {
            id: "a417e429-0dce-42bc-b2d3-b7bcb8d70eb8"
          }
        }
      });
      setConfirmation('Success, please check your AWS account to view your removed task!');
      console.log(result)
    } 
    catch (error) {
      console.error('Error removing todo: ', error);
    }
  }

  async function fetchTodos(){
    try {  
      const result = await client.graphql({
        query: listTodos
      });
      setConfirmation('Success, please check your AWS account to view your list of tasks!');
      console.log(result)
    }
    catch (error) {
      console.error('Error removing todo: ', error);
    }
  }
  
  async function fetchTodo(){
    try {
      const result = await client.graphql({
        query: getTodo,
        variables: {id: "a417e429-0dce-42bc-b2d3-b7bcb8d70eb8"}
      }); 
      setConfirmation('Success, please check your AWS account to view your selected task!')
      console.log(result);
    }
    catch (error) {
      console.error('Error removing todo: ', error);
    }
  }
  
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main className="app-container">
          <h1>Hello {user.username}</h1>
          <button onClick= { storeTodo }> New Todo </button>
          <button onClick= { changeTodo }> Change Todo </button>
          <button onClick= { removeTodo }> Remove Todo </button>
          <button onClick  = { fetchTodo }> Fetch Todo </button>
          <button onClick = { fetchTodos }> Fetch Todos </button>
          <button onClick= { signOut }> Sign Out </button>
          {confirmation && <p>{confirmation}</p>}
        </main>
      )}
    </Authenticator>
  );
};

export default App;