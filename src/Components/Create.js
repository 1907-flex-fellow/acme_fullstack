import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../store';

class Create extends React.Component{
    constructor(){
        super()
        this.state = {
            name: '',
            active: false,
            errors: [],
        }
        this.onChange = this.onChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    onChange(ev){
        const target = ev.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        console.log('value: ', value)
        const name = target.name
        this.setState({[name]: value})
    }

    handleSubmit(e){
        e.preventDefault()
        // console.log('this.state: ', this.state)
        this.props.createUser(this.state)
            .then(() => this.props.history.push('/users'))
            .catch(ex=>{
                console.log('errors: ', ex)
                this.setState({errors: ex.response.data.errors})
            })
    }
    render(){
        const { name, active, errors } = this.state
        const { onChange, handleSubmit } = this
        console.log('errors: ', errors)
        return (
            <div>
                {
                    !!errors.length && (<ul className='alert alert-danger'>
                        {
                            errors.map((error, idx)=><li key={idx}>{error}</li>)
                        }
                    </ul>)
                }
                <form onSubmit={handleSubmit}>
                    <label>Name</label>
                    <input type='text' name={'name'} value={name} onChange= {onChange}/>
                    <input name='active' type='checkbox' checked={active} onChange={onChange}/>
                    <button type='submit'>Create User</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createUser: (user)=> dispatch(actions.createUser(user))
    }
}

export default connect(null, mapDispatchToProps)(Create);