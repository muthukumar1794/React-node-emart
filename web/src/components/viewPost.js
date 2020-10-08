import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Axios from 'axios'
import Modal from 'react-modal'
import { apiHost } from '../App';
import { Redirect } from 'react-router';

const bg = {
    margin: '12px',textAlign:'center'
  };
class viewPost extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            singlePost:{},
            show:false,
            ErrorMessage:'',
            id:'',
            modalTitle:'',
            modalDescription:'',
            modalImageURL:'',
            RedundantmodalTitle:'',
            RedundantmodalDescription:'',
            RedundantmodalImageURL:'',
            ErrorShow:false,
            Redirect:false,
            Deleteredirect:false,
            token:localStorage.getItem('token')
        }
    }
    
    componentDidMount(){
      const id = this.props.match.params.postID
        const headers = {
          Authorization:"Bearer "+localStorage.getItem('token')
        }
        const url = `http://localhost:${apiHost}/single-post/view/`+id
        Axios.get(url,{headers})
        .then(res=>{
          this.setState({
              id:res.data.response._id,
             singlePost:res.data.response,
             modalTitle:res.data.response.title,
             modalDescription:res.data.response.description,
             RedundantmodalTitle:res.data.response.title,
            RedundantmodalDescription:res.data.response.description,
          })
        
        }).catch(err=>{
          this.setState({
            ErrorMessage:err.response.data.message,
            ErrorShow:true
          })
        })

    }
    editPost = ()=>{
        this.setState({
            show:true,
            
        })
    }
    handleCloseEdit=()=>{
        this.setState({
            show:false,
            modalTitle:this.state.RedundantmodalTitle,
            modalDescription:this.state.RedundantmodalDescription
        })
    }
    onchange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    onchangefile=(e)=>{
        this.setState({
          [e.target.name]:e.target.files[0]
        })
       
      }
      submitForm = (e)=>{
          e.preventDefault()
          console.log("thids.state",this.state)    
          const formData = new FormData()
          formData.append('title',this.state.modalTitle)
          formData.append('description',this.state.modalDescription)
          formData.append('image',this.state.modalImageURL)
          const headers = {Authorization:"bearer "+this.state.token}
          Axios.put(`http://localhost:${apiHost}/single-post/edit/`+this.state.id,formData,{headers}).then(response=>{
            console.log("reeeeeeeeeeeeee",response)
            this.setState({show:false,
              singlePost:response.data.response})

          }).catch(err=>{throw err})
          
      }
      deletePost=()=>{
        console.log("response")
        const headers = {Authorization:"bearer "+this.state.token}
        Axios.delete(`http://localhost:${apiHost}/single-post/delete/`+this.state.id,{headers}).then(response=>{
          console.log("response",response)
            this.setState({Deleteredirect:true})

          }).catch(err=>{throw err})
      }
      handleClose=()=>{
        this.setState({
         ErrorShow:false,
         Redirect:true
        })
        }

 
    render() {
      if(this.state.Deleteredirect){
      return <Redirect to='/'/>
    }
      if(this.state.Redirect){
        return <Redirect to='/user/login'/>
     }

      if(this.state.ErrorMessage){
        return <Modal isOpen={this.state.ErrorShow} ariaHideApp={false} style={{
          overlay: {
     backgroundColor: "grey"
   }
   ,content:{
    width: '380px',
    height: '150px',
    margin:'0 auto'
   }
     }}>
    <button type="button" className="close" onClick={this.handleClose}>&times;</button>
    <h1 style={{textAlign:'center'}}>{this.state.ErrorMessage}</h1>
        </Modal>
      }
        const {modalTitle,modalDescription,modalImageURL} = this.state
        const id = this.state.singlePost._id
        const title = this.state.singlePost.title
        const description = this.state.singlePost.description
        const imageURL = this.state.singlePost.imageURL
        return imageURL?<div>
                <div ><h1>{title}</h1>
         <img width="550px;"src={`http://localhost:${apiHost}/`+imageURL}/>

            <p>{description}</p>
            
            <a className="btn btn-primary" onClick={this.editPost}>Edit</a>
            <a className="btn btn-danger" onClick={this.deletePost}>Delete</a>
            </div>
            <Modal isOpen={this.state.show} ariaHideApp={false} style={{
                overlay: {
           backgroundColor: "grey"
         }
         ,content:{
           left: '25%',
           right: '25%'
         }
           }} >
             <button type="button" className="close" onClick={this.handleCloseEdit}>&times;</button>
             <form  method="post" noValidate className="form-horizontal" onSubmit={this.submitForm} encType="multipart/form-data">      
                   <div className="form-group">
                       <div className="form-group">
                       <label htmlFor="uname" className="col-sm-4 control-label text-center"><b>Title</b></label>
                       <input type="text" placeholder="Enter Username" name="modalTitle" value={modalTitle} required className="col-sm-4" onChange={this.onchange}/>
                       </div>
                       <div className="form-group">
                       <label htmlFor="psw" className="col-sm-4 control-label text-center"><b>Description</b></label>
                       <input type="text" placeholder="Enter description" name="modalDescription" value={modalDescription} required className="col-sm-4" onChange={this.onchange}/>
                       </div> 
                       <div className="form-group">
                       <label htmlFor="psw" className="col-sm-4 control-label text-center"><b>Image</b></label>
                       <input type="file" placeholder="Enter Password" name="modalImageURL" required className="col-sm-4" onChange={this.onchangefile}/>
                       </div>  
                       <div className={`form-group`} style={bg}>
                       <button className="btn btn-success" type="submit">Add</button>
                       
                       <button className="btn btn-danger" onClick={this.handleCloseEdit} style={bg}>Close</button>
                       </div>
           
                       </div> 
               
                   </form>
         </Modal>
      
            </div>:null
        
    }
}

export default viewPost
