import React, { Component } from 'react';
import InputBox from './Components/InputBox';
import TodoList from './Components/TodoList';

class App extends Component {
  state = { 
    todos : [{id: 1 , todo :"Learn JSX" },{id: 2 , todo :"Learn React" },{id: 3 , todo :"Learn JS" },{id: 4 , todo :"Learn CSS" },{id: 5 , todo :"Learn HTML" }]
   }

   deleteTodo = (id) =>{
    let filteredTodo = this.state.todos.filter(function(todoObject){
      return todoObject.id != id;
    });
    this.setState({
      todos : filteredTodo 
    })
 
   }

   addTodo = (todo) => {
    this.setState({
      todos : [...this.state.todos , {id : this.state.todos.length + 1, todo : todo}]
    })
   }

  render() { 
    return ( 
      <div className="container">
        <InputBox handleAdd = {this.addTodo}/>
        <TodoList todosList = {this.state.todos} handleDelete ={this.deleteTodo} /> 
      </div>
    );
  }
}
 
export default App;
