import React, { Component } from 'react'
import Axios from 'axios'
import { apiHost } from '../App';
import Orderdetails from './orderdetails'

export class vieworder extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             orderData:[]
        }
    }
    

    componentDidMount(){
        const headers = {
            Authorization:"Bearer "+localStorage.getItem('token')
          }
          const url = `http://localhost:${apiHost}/product/get-order`
        Axios.get(url,{headers}).then(response=>{
            console.log("yyyyyyyyy",response)
        this.setState({
           
            orderData:response.data.response
        })
        
        })

    }

    render() {
        const orderItems = this.state.orderData
 
     
        return orderItems.map(orders=>{
            return <h3 key={orders._id}>{orders._id} {orders.order.map(o=>{
            return <p>{o.quantity} <Orderdetails OD={o.products}/></p>
            })}</h3>
        
        })
           
        
    }
}

export default vieworder
