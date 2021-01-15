import React,{Component} from "react";
import {Link} from "react-router-dom";
import axios from 'axios'
import Navbar from "../NavbarHod"
axios.defaults.baseURL=" https://ahabackend.herokuapp.com/"
export default class AcceptCompensationLeaveHOD extends Component{
    constructor(props){
        super(props)
        this.onChangeid=this.onChangeid.bind(this)
        this.onChangereqid=this.onChangereqid.bind(this)
        this.onSubmit=this.onSubmit.bind(this)
        this.state={
            id:"",
           reqID:"",
           
            requests:[]
        }
    }
    onChangeid(e){
        this.setState({
           id:e.target.value //this takes input from user and puts it here
           
        })
    }
   
    onChangereqid(e){
        this.setState({
           reqID:e.target.value //this takes input from user and puts it here
           
        })
    }
   
       
       
    onSubmit(e)
    {
        e.preventDefault();
        //console.log(this.state.dayoff)
        const request={
            
            id:this.state.id,
            reqID:this.state.reqID,
           
        }

       // console.log(dayoffc)
        axios.post('/AcceptCompensationLeaveHOD',request,{headers:{'x-auth-token':localStorage.getItem('savedToken')}})
        .then(res=>console.log(res.data)).catch((error)=>{
            console.log(error)
        });
       window.location='/Submitted' //will make him go to this page after submitting
    }
    render(){
        return(
            <div>
                   <Navbar/>
  
  <nav aria-label="breadcrumb">
          <ol className="breadcrumb alert alert-warning">
            <li className="breadcrumb-item text-warning"><a className="text-warning"href="/HODhomepage">Home page</a></li>
           
          </ol>
        </nav>
                <p>
<h1>Accept compensation leave</h1>
                </p>
                <form onSubmit={this.onSubmit}>
              
                <div className="form-group">
            
                <input
                type="text"
                className="form-control"
                value={this.state.reqID}
                onChange={this.onChangereqid}
                placeholder="Enter request id "/>
                </div>

             
                <div className="form-group">
               
                <input
                type="text"
                className="form-control"
                value={this.state.id}
                onChange={this.onChangeid}
                placeholder="Enter requester id "/>
                </div>

             

                <div className="form-group">
                    <input id="add" type="submit" value= "Accept compensation leave request" className="btn btn-primary"/>

                </div>
                </form>
            </div>
        )
    }
}