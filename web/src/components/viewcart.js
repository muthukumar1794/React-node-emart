import React, { Component } from 'react'
import Axios from 'axios'
import {apiHost} from '../App'
import {Redirect} from 'react-router'

const contentP={
    margin:'20px',
    float:'right'
}
const contentPA={
    margin:'20px',
    float:'left'
}
const checkout = {
    margin:'0 auto',
    display:'block'
}
const overallDiv={display: 'inline-block',
border: '1px solid #296dc1',
width: '500px',
margin: '0 auto',
textAlign: 'center',
marginTop:'15px'}

export class viewcart extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            cartItems:[],
            orderRedirect:false
        }
    }
    
    componentDidMount(){
        const id = this.props.match.params.postID
        const headers = {
            Authorization:"Bearer "+localStorage.getItem('token')
          }
          const url = `http://localhost:${apiHost}/product/viewcart`
          Axios.get(url,{headers})
          .then(res=>{
              console.log("object",res)
              this.setState({
                  cartItems:res.data.response.cart.items
              })
          })

    }
    checkout =()=>{
        const headers = {
            Authorization:"Bearer "+localStorage.getItem('token')
          }
          const url = `http://localhost:${apiHost}/product/view-order`
        Axios.get(url,{headers}).then(response=>{
            if(response){
                this.setState({
                    orderRedirect:true
                })
            }
        }).catch(err=>{
            throw err
        })
    }
    render() {
        if(this.state.orderRedirect){
            return <Redirect to='/view/orders'/>
        }
        const cartItems = this.state.cartItems.map(cart=>{
        return <><div key={cart.productID._id} style={overallDiv}><p style={contentPA}><strong>Product Name: </strong>{cart.productID.title}</p>
            <p style={contentP}><strong>Quantity: </strong>{cart.quantity}</p> </div><br></br></>
        })
        return (
            <div>
              {cartItems}
              <button className="btn btn-primary" style={checkout} onClick={this.checkout}>Checkout</button>
            </div>
        )
    }
}

export default viewcart
