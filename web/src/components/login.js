import React, { Component } from 'react'
import Axios from 'axios'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom'
import { apiHost } from '../App';
import Index from './index'

export class login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             email:'',
             password:'',
             redirect:null,
            //  userData:{},
            //  token:''
        }
    }
    onchange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    submitForm = (e)=>{
        e.preventDefault()
        return Axios.post(`http://localhost:${apiHost}/login/post`,this.state).then(response=>{
        console.log("success",response)
        if(response.data.message==='success'){
            // this.props.history.push('/signup/form');
            console.log("ressssssssssss",response)

            localStorage.setItem('userdata',JSON.stringify(response.data.userData.email));
            localStorage.setItem('token',response.data.token);
            this.setState({
                redirect:true,
            })
            
        }
    })
        .catch(err=>{console.log("errr",err);return err})
    }
  renderRedirect=()=>{
    if(this.state.redirect){
        return <Redirect to="/"/>
    }
  }

    render() {
       
        const {name,password,userData} = this.state
        return (
            <>
            <div className="centering-form">
   
            <h2 className="text-center">Login Form</h2>
        
            <form  method="post" noValidate className="form-horizontal" onSubmit={this.submitForm}>
            <div className="imgcontainer form-group">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSN6PSb90rGnT4WTxYC7HBxNWs2Ig-mSP2b0g&usqp=CAU" alt="Avatar" className="avatar"/>
            </div>
        
            <div className="form-group">
                <div className="form-group">
                <label htmlFor="uname" className="col-sm-4 control-label text-center"><b>Email</b></label>
                <input type="text" placeholder="Enter Username" name="email" value={name} required className="col-sm-4" onChange={this.onchange}/>
                </div>
                <div className="form-group">
                <label htmlFor="psw" className="col-sm-4 control-label text-center"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="password" value={password} required className="col-sm-4" onChange={this.onchange}/>
                </div> 

                <div className="form-group">
                <button className="btn btn-success" type="submit">Login</button>
                </div>
    
                </div> 
        
            </form>
            <div  className="text-center col-md-12 form-group">
            <p >New user?</p><span>
            <Link to="/signup/form" className="" >Sign Up</Link></span>
          </div>
            </div>
            {this.renderRedirect()}
            </>
        )
          
    }
}

export default login
