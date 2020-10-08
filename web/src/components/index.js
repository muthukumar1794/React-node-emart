import React, { Component } from 'react'
// import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import Axios from 'axios'
import Modal from 'react-modal'
import VideoPlayer from './videoPlayer'
import Newsfeed from './newsfeed'
import {Link} from 'react-router-dom'
import { apiHost } from '../App'
import { Redirect } from 'react-router';

const bg = {
  margin: '12px',textAlign:'center'
};

class index extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             title:'',
             description:'',
             image:'',
             show : false,
             loggedUser:null,
             token:null,
             createdProduct:false,
             logout:false
             
           }
    }
    onchange=(e)=>{
      console.log("object",this.state)
      this.setState({
        [e.target.name]:e.target.value
      })
    }
    onchangefile=(e)=>{
      console.log("e.target.files[0]",e.target.files[0])
      this.setState({
        [e.target.name]:e.target.files[0]
      })
    }
    submitForm=(e)=>{
     
      e.preventDefault()
      const {title, description, image} = this.state
      const formData = new FormData()
      formData.append('title',title)
      formData.append('description',description)
      formData.append('image',image)

      // Axios({method:'post',url:'http://localhost:8080/feed-post/data',data:formData, headers:{'Content-Type': 'multipart/form-data' }})
      const headers = {Authorization:"bearer "+this.state.token}
      Axios.post(`http://localhost:${apiHost}/feed-post/data`,formData,{headers})
      .then(response=>{
        console.log("response",response.data)
        if(response.status==201){
          this.setState({
            title:'',
            description:'',
            image:'',
            createdProduct:true,
            createdProductpath:`/view/post/${response.data.response._id}`,
            show : false,
            
          })
          
        }
      }).catch(err=>{throw new Error('posttin feed failure')})
    }
    logOut = ()=>{
      localStorage.removeItem('userdata');
       localStorage.removeItem('token');
       
      this.setState({
        title:'',
        description:'',
        image:'',
        show:false,
        logout:true
     
       })
       
    }
    handleClose=()=>{
     this.setState({
      title:'',
      description:'',
      image:'',
      show:false,
     })
     }
     handleShow=()=>{
      this.setState({
        show : true
      })
     }
   componentDidMount(){
     this.setState({
      loggedUser:JSON.parse(localStorage.getItem('userdata')),
      token:localStorage.getItem('token')
     })
   }

    render() {
      if(this.state.logout){
        return <Redirect to='/'/>
      }
        if(this.state.createdProduct){
          return <Redirect to={this.state.createdProductpath}/>
        }
        const {title,description,image,loggedUser} = this.state

        return (<>
        {/* { this.renerRidirect()} */}
                <nav className="navbar navbar-default">
  <div className="container-fluid">
    <div className="navbar-header">
      <a className="navbar-brand">{(loggedUser)?loggedUser:"Explore"}</a>
    </div>
    <ul className="nav navbar-nav pull-right">
      <li className="active"><a onClick={this.handleShow}>Add New Product</a></li>
      {loggedUser?<li><Link to="/user/logout" onClick={this.logOut}>Logout</Link></li>:<><li><Link to="/user/login">Login</Link></li><li><Link to="/signup/form">Sign Up</Link></li></>}
    </ul>
  </div>
</nav>
<div className="container">

      <VideoPlayer/>
      {this.state.token?<Newsfeed/>:null}
      
      <Modal isOpen={this.state.show} ariaHideApp={false} style={{
         overlay: {
    backgroundColor: "grey"
  }
  ,content:{
    left: '25%',
    right: '25%'
  }
    }} >
      <button type="button" className="close" onClick={this.handleClose}>&times;</button>
      <form  method="post" noValidate className="form-horizontal" onSubmit={this.submitForm} encType="multipart/form-data">      
            <div className="form-group">
                <div className="form-group">
                <label htmlFor="uname" className="col-sm-4 control-label text-center"><b>Title</b></label>
                <input type="text" placeholder="Enter Username" name="title" value={title} required className="col-sm-4" onChange={this.onchange}/>
                </div>
                <div className="form-group">
                <label htmlFor="psw" className="col-sm-4 control-label text-center"><b>Description</b></label>
                <input type="text" placeholder="Enter Password" name="description" value={description} required className="col-sm-4" onChange={this.onchange}/>
                </div> 
                <div className="form-group">
                <label htmlFor="psw" className="col-sm-4 control-label text-center"><b>Image</b></label>
                <input type="file" placeholder="Enter Password" name="image" required className="col-sm-4" onChange={this.onchangefile}/>
                </div>  
                <div className={`form-group`} style={bg}>
                <button className="btn btn-success" type="submit">Add</button>
                
                <button className="btn btn-danger" onClick={this.handleClose} style={bg}>Close</button>
                </div>
    
                </div> 
        
            </form>
  </Modal>
  
</div>
          </> 
        )
    }
}

export default index
