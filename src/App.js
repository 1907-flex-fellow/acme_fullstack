import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { actions } from './store';
import { connect } from 'react-redux'; 
import Nav from './Components/Nav';
import Users from './Components/Users';
import ActiveUsers from './Components/ActiveUser';
import Create from './Components/Create';

class App extends Component{
  componentDidMount(){
    this.props.fetchUsers();
  }
  render(){
    const { loading } = this.props;
    return (
      <HashRouter>
        <Route component={ Nav } />
        {
          loading && <div>...loading</div>
        }
        <Route exact path='/users' component={ Users } />
        <Route exact path='/users/filter/active' component={ ActiveUsers }/>
        <Route exact path='/users/create' component={ Create }/>
      </HashRouter>
    );
  }
} 

const mapDispatchToProps = (dispatch)=> {
  return {
    fetchUsers: ()=> dispatch(actions.fetchUsers())
  };
};

const mapStateToProps = ({loading})=> {
  return {
    loading
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
