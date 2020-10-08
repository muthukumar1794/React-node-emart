import Axios from 'axios'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router-dom'
import Viewpost from './viewPost'
import { Redirect } from 'react-router';
import Modal from 'react-modal'
import {apiHost} from '../App'
import Pagination from "react-js-pagination";

const textAlign = {
    textAlign:'center'
}
const active={
    color:'blue'
}
class newsfeed extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             title:'',
             description:'',
             imageURL:'',
             feedData:[],
             redirect:null,
             totalContent:0,
             activePage:1,
             addToCart:false,
             addToCartPath:null,
             token:localStorage.getItem('token')
            
        }
    }
    
    componentDidMount(){
         const headers = {Authorization:"bearer "+this.state.token}
        console.log("ccccccccccchhhellclkkl")
        Axios.get(`http://localhost:${apiHost}/feed-post/list`,{params:{
            page:1
          },headers},)
        .then(response=>{
            console.log("respose",response)
            this.setState({
                feedData:response.data.data,
                totalContent:response.data.totalContent

        })
        console.log("this.state.",this.state.totalContent)


    })
        .catch(err=>{
            throw err
        })
    }

handlePageChange(pageNumber) {
    const headers = {Authorization:"bearer "+this.state.token}
        console.log(`active page is ${pageNumber}`);
        Axios.get(`http://localhost:${apiHost}/feed-post/list`,{params:{
            page:pageNumber
          },headers})
        .then(response=>{
            console.log("respose",response)
            this.setState({
                feedData:response.data.data,
                totalContent:response.data.totalContent

        })
        this.setState({activePage: pageNumber});
      })
    }

    addToCart=(productID)=>{
    const headers = {Authorization:"bearer "+this.state.token}
    Axios.get(`http://localhost:${apiHost}/product/add-to-cart/${productID}`,{headers}).then(response=>{
        console.log("eeeeeeeeeeeeeee",response)
        if(response){
            this.setState({
                addToCart:true,
                addToCartPath:'/product/viewcart'
            })
        }
    })
    }

    render() {
        if(this.state.addToCart){
            return <Redirect to={this.state.addToCartPath}/>
        }
        let content      
        const {title,description,imageURL,feedData} = this.state
         content = feedData.map(feed=><div key={feed._id}><h1 style={textAlign} >{feed.title}</h1>
         <img width="550px;"src={`http://localhost:${apiHost}/`+feed.imageURL}/>

            <p style={textAlign}>{feed.description}</p>
            <Link className="btn btn-primary" style={{width:'50%'}} to={"/view/post/"+feed._id}>View</Link>
            <button className="btn btn-secondary" style={{width:'50%'}}  onClick={()=>this.addToCart(feed._id)}>Add to cart</button>
           
            </div>
            

        )
        return (ReactDOM.createPortal(<div>

            {content}

            <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={2}
          totalItemsCount={this.state.totalContent}
          pageRangeDisplayed={2}
          prevPageText="Prev"
          nextPageText="Next"
          lastPageText="Last Page"
          activeClass="active"
          onChange={this.handlePageChange.bind(this)}
        />


        </div>,document.getElementById('newsfeed'))
            
        )
    }
}

export default newsfeed
