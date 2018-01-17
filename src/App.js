import React, { Component } from 'react';
import User from './components/User';
import UniqueID from 'react-html-id';

class App extends Component {

  constructor(){
    super();
    UniqueID.enableUniqueIds(this);
    this.state = {
        users:[
          {id:this.nextUniqueId(), name:'John', age:20},
          {id:this.nextUniqueId(), name:'Jill', age:30},
          {id:this.nextUniqueId(), name:'Peter', age:40},
        ]
      };

      console.log(this.state)
  }
  //id is a quique key that can track changes and update only the changesd parts
  //so it doesnt have to render the enitrer list


  deleteUser = (index, e) => {
    console.log(this.nextUniqueId())
    //const users = [...this.state.users];
    const users = Object.assign([], this.state.users);
    users.splice(index, 1);
    this.setState({users:users});
  }

  changeUserName = (id, event) => {
    if (event.target.value.length === 0) {
      return;
    }
    const index = this.state.users.findIndex((user)=> {
        return (user.id === id);
    })

    const user = Object.assign({}, this.state.users[index]);
    user.name = event.target.value;

    const users = Object.assign([], this.state.users);
    users[index] = user;

    this.setState({users:users});
  }

  render(){

    return (
      <div>
        <ul>
          {
            this.state.users.map((user, index) => {
              return (<div><User
                delEvent={this.deleteUser.bind(this,index)}
                age={user.age}
                changeEvent={this.changeUserName.bind(this, user.id)}
                key={user.id } >{user.name}</User></div>)
                {/*key is to avoid the warning*/}
            })
          }
        </ul>
      </div>
    )
  }
}
export default App;
