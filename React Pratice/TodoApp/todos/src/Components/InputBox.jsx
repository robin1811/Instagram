import React, { Component } from 'react';
class InputBox extends Component {
    state = { 
        todo :""
     }

     onchageHandler =(e) =>{
        this.setState({
            todo : e.target.value
        })
     }

     onAddHandler = ()=>{
         let addTodo = this.props.handleAdd;
         addTodo(this.state.todo);
         this.setState({
             todo : ""
         })
     }
    render() { 
        return (   

            <div className="input-group mb-5 mt-5">
            <input type="text" className="form-control" placeholder="Add Todo's" value = {this.state.todo} onChange={ (e)=>{ this.onchageHandler(e) } }/>
             <button className="btn btn-primary" onClick = {this.onAddHandler}>Add Todo</button>
            </div>
         
         );
    }
}
 
export default InputBox;