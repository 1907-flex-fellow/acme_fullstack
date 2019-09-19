import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../store';

const ActiveUsers = ({ activeUsers, destroyUser})=> {
    return (
      <ul>
        {
          activeUsers.map( user => <li key={ user.id }>
            { user.name }
            <button onClick={()=> destroyUser(user)}>x</button>
          </li>)
        }
      </ul>
    );
  };

const mapStateToProps = ({ users }) => {
    console.log('users: ', users)
    const activeUsers = users.filter(user => user.active !== false)
    console.log('activeUsers: ', activeUsers)
    return {
        activeUsers
    }
}
const mapDispatchToProps = (dispatch) => {
    return {destroyUser: (user)=> dispatch(actions.destroyUser(user))}
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveUsers);