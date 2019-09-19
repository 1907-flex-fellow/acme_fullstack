import { DESTROY_USER, SET_USERS, SET_LOADING } from './constants';
import axios from 'axios';


const setUsers = (users)=> {
  return {
    users,
    type: SET_USERS
  };
};

const setLoading = (loading)=> {
  return {
    type: SET_LOADING,
    loading
  };
};

const _destroyUser = (user)=> {
  return {
    type: DESTROY_USER,
    user
  };
};


const fetchUsers = ()=> {
  return async(dispatch)=> {
    dispatch(setLoading(true));
    const users = (await axios.get('/api/users')).data;
    dispatch(setLoading(false));
    return dispatch(setUsers(users));
  };
};

const destroyUser = (user)=> {
  return async(dispatch)=> {
    dispatch(setLoading(true));
    await axios.delete(`/api/users/${user.id}`);
    dispatch(setLoading(false));
    return dispatch(_destroyUser(user));
  };
};

const toggleUser = (user)=> {
  return async(dispatch)=> {
    await axios.put(`/api/users/${user.id}`);
    const users = (await axios.get('/api/users')).data;
    return dispatch(setUsers(users))
  }
}

const createUser = (user)=> {
  return async(dispatch)=> {
    await axios.post(`/api/users`, user);
    const users = (await axios.get('/api/users')).data;
    return dispatch(setUsers(users))
  }
}

export { fetchUsers, destroyUser, toggleUser, createUser };
