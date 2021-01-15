import React, {Component} from 'react';
import axios from 'axios';
import Navbar from "../NavbarHR.js";


axios.defaults.baseURL=" https://ahabackend.herokuapp.com/"
export default class ViewAnnualStatus extends Component{
    constructor(){
        super();
        this.onAddID=this.onAddID.bind(this);
        this.onSubmit=this.onSubmit.bind(this)
        this.state={
            AnnualRequests:[],
            AnnualRequestsA:[],
            AnnualRequestsR:[],
            id:0
        }
    }


    onAddID(e){
        this.setState({
           id: e.target.value
        })
     }
    componentDidMount(){
        axios.get('/viewStatusOfAnnualPending',{headers:{'x-auth-token':localStorage.getItem('savedToken')}})
        .then(response=> {
             this.setState({AnnualRequests: response.data});
             console.log(response.data);

   
        })

    .catch((error)=> { 
    console.log(error);
})
    axios.get('/viewStatusOfAnnualAccepted',{headers:{'x-auth-token':localStorage.getItem('savedToken')}})
            .then((res)=>{
                this.setState({AnnualRequestsA: res.data});
                console.log(res.data)
                
            }
            
            )

        .catch((error)=> { 
        console.log(error);
    })

    axios.get('/viewStatusOfAnnualRejected',{headers:{'x-auth-token':localStorage.getItem('savedToken')}})
        .then((res)=>{
            this.setState({AnnualRequestsR: res.data});
            console.log(res.data)}
           
        )

    .catch((error)=> { 
    console.log(error);
})

}





onSubmit(e){
    e.preventDefault();
    const request ={
            reqID:this.state.id

    }
    axios.post('/cancelPendingAnnual',request,{headers:{'x-auth-token':localStorage.getItem('savedToken')}})
        .then((res)=>console.log(res.data))
    .catch((error)=> { 
    console.log(error);
})
window.location="/Success"



}


    render(){
        return(
            <div>
                <Navbar/>
            <div className='container'>
                <nav aria-label="breadcrumb">
            <ol className="breadcrumb alert alert-warning">
              <li className="breadcrumb-item text-warning"><a className="text-warning"href="HomeHR">Home</a></li>
              <li className="breadcrumb-item "><a className="text-warning"href="Attendance">Attendance</a></li>
              <li className="breadcrumb-item "><a className="text-warning"href="Leaves">Leaves</a></li>
              <li className="breadcrumb-item "><a className="text-warning"href="ViewLeaveRequests">View leave requests</a></li>
              <li className="breadcrumb-item active text-danger" aria-current="page">View Annual Status</li>
            </ol>
          </nav>
          <h5 class="text-warning">Pending Requests: </h5>
          <table className= "table table-bordered">
                    <thead className="table-warning">
                        <tr>
                            <th>Request ID</th>
                            <th>Date</th>
                            <th>Month </th>
                            <th>Day </th>
                            <th>TA to cover</th>
                            
                        </tr>

                    </thead>
                    <tbody>
                        
                    {this.state.AnnualRequests.map((item)=>
                        <tr>
                          <td> {item.req_id}</td>
                          <td> {item.date}</td>
                          <td> {item.month}</td>
                          <td> {item.day}</td>
                          <td> {item.TAtoCover}</td>
                          </tr>
                        )}
                    </tbody>
                </table>

                <h5 class="text-success">Accepted Requests:</h5>
          <table className= "table table-bordered">
                    <thead className="table-warning">
                        <tr>
                        <th>Request ID</th>
                            <th>Date</th>
                            <th>Month </th>
                            <th>Day </th>
                            <th>TA to cover</th>
                            
                        </tr>

                    </thead>
                    <tbody>
                        
                    {this.state.AnnualRequestsA.map((item)=>
                        <tr>
                           <td> {item.req_id}</td>
                          <td> {item.date}</td>
                          <td> {item.month}</td>
                          <td> {item.day}</td>
                          <td> {item.TAtoCover}</td>
                          </tr>
                        )}
                    </tbody>
                </table>
                <h5 class="text-danger">Rejected Requests: </h5>
          <table className= "table table-bordered">
                    <thead className="table-warning">
                        <tr>
                        <th>Request ID</th>
                            <th>Date</th>
                            <th>Month </th>
                            <th>Day </th>
                            <th>TA to cover</th>
                            
                        </tr>

                    </thead>
                    <tbody>
                        
                    {this.state.AnnualRequestsR.map((item)=>
                        <tr>
                        <td> {item.req_id}</td>
                          <td> {item.date}</td>
                          <td> {item.month}</td>
                          <td> {item.day}</td>
                          <td> {item.TAtoCover}</td>
                          </tr>
                        )}
                    </tbody>
                </table>
                <form onSubmit={this.onSubmit}>
                   <div className='form-group'>
                       <label class="text-warning">Cancel pending request</label>
                       <input type="text" required
                       className="form-control"
                       value={this.state.id}
                       onChange={this.onAddID}
                       placeholder="Please input the request ID of the request you want to cancel "/>    
                   </div>

                   <div className="form-group">
                   <input type="submit" value="Cancel request" className="btn btn-danger"/>
                   </div>
                   </form>
            </div>
            </div>
        )
    }
}
