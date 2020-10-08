import Axios from 'axios'
import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { apiHost } from '../App'
import Login from './login'


class Signup extends Component{
    constructor(props) {
        super()
    
        this.state = {
             email:'',
             password:'',
             confirmPassword:'',
             redirect:null
        }
    }
    onchange =(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
   
    onsubmitForm=(e)=>{
        e.preventDefault()
        return Axios.post(`http://localhost:${apiHost}/signup/post`,this.state).then(response=>{
        console.log("success",response.data.message)
        if(response.data.message==='success'){
            // this.props.history.push('/signup/form');
            this.setState({
                redirect:"/user/login"
            })
        }
    })
        .catch(err=>{console.log("errr",err);return err})
    }

render(){
    if(this.state.redirect){
        return <Login/>
    }
    return(
            <div className="centering-form">
    <h2 className="text-center">Signup Form</h2>

    <form onSubmit={this.onsubmitForm} method="post" noValidate className="form-horizontal">
    <div className="imgcontainer form-group">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSN6PSb90rGnT4WTxYC7HBxNWs2Ig-mSP2b0g&usqp=CAU" alt="Avatar" className="avatar"/>
    </div>

    <div className="form-group">
        <div className="form-group">
        <label htmlFor="uname" className="col-sm-4 control-label text-center"><b>Email</b></label>
        <input type="text" placeholder="Enter Username" name="email" required className="col-sm-4" onChange={this.onchange}/>
        </div>
        <div className="form-group">
        <label htmlFor="password" className="col-sm-4 control-label text-center"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="password" required className="col-sm-4" onChange={this.onchange}/>
        </div> 
        <div className="form-group">
        <label htmlFor="psw" className="col-sm-4 control-label text-center"><b>Confirm Password</b></label>
        <input type="password" placeholder="Confirm Password" name="confirmPassword" required className="col-sm-4" onChange={this.onchange}/>
        </div>
        <div className="form-group">
        <button className="btn btn-success" type="submit">Signup</button>
        </div>
        <div className="form-group">
        
        </div>

  
    </div> 

    </form>
    <div  className="text-center col-md-12 form-group">
    <p >Already a user?</p><span>
    <Link to="/user/login">Login</Link></span>
  </div>
    </div>

    )
}

}
export default Signup