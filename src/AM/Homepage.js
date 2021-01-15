import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Signin from './Signin'
import ViewProfileAM from './ViewprofileAM';
import AttendanceAMM from './AttendanceAMM';
import Requests from './Requests';
import Replacement from './Replacement';
import ViewReplacement from './ViewReplacement';
import ViewSchedule from './ViewSchedule';
import Navbar from '../NavbarAM'
import {Dropdown} from 'react-bootstrap'

import HomeCC from '../CourseCoordinator/CoordinatorHomeCont';
import HomeCI from '../CourseInstructor/HomeInstuctor';
import HomeHOD from '../hod/HODhomepage';

 import Modal from 'react-modal';
export default class Homepage extends Component {
    constructor(props){
        super(props)
   this.state={
            redirectToViewprofile:null,
            redirectToSignin:null,
            redirectToAttendance:null,
            redirectToRequests:null,
            redirectToViewprofile:null,
            redirectToViewreplacement:null,
            redirectToViewSchedule:null,
            RedirectToHomeAM:null,
            RedirectToHomeCC:null,
            RedirectToHomeCI:null,
            RedirectToHomeHOD:null,
            stateCC:"",
            stateCI:"",
            stateHOD:"",
            DisabledCC:false,
            DisabledCI:false,
            DisabledHOD:false,
            statemodal:false

        };
        this.viewprofile=this.viewprofile.bind(this);
        this.signin=this.signin.bind(this);
        this.attendance=this.attendance.bind(this);
        this.requests=this.requests.bind(this);
        this.viewreplacement=this.viewreplacement.bind(this);
        this.viewschedule=this.viewschedule.bind(this);
     
        this.HomeCC=this.HomeCC.bind(this);
        this.HomeCI=this.HomeCI.bind(this);
        this.HomeHOD=this.HomeHOD.bind(this);


        this.handlClose=this.handlClose.bind(this);
}
viewprofile=()=>{
axios.get('/viewprofile',{headers:{
    'x-auth-token':localStorage.getItem('savedToken')
}})
  .then (response =>{
    this.setState({
        name:response.data.name,
        office:response.data.office,
        email:response.data.email,
       dayoff:response.data.dayoff,
       salary:response.data.Salary

    })
    console.log("hiiiii")
   console.log(response.data)
  })
  this.setState({
    statemodal:true
})

  
}

componentDidMount=()=>{
    axios.get('/getRole', {
        headers:{
'x-auth-token':localStorage.getItem('savedToken')
        }
       
      })
      .then(response => {
        this.setState({
            
            stateCC:response.data.CC,
            stateCI:response.data.CI,
            stateHOD:response.data.HOD

        })

        if(this.state.stateCC=="0"){
            this.setState({
                DisabledCC:true
            })
        }

        if(this.state.stateCI=="0"){
            this.setState({
                DisabledCI:true
            })
        }

        if(this.state.stateHOD=="0"){
            this.setState({
                DisabledHOD:true
            })
        }
      //console.log(this.state.Roles);

    })
      .catch(function (error) {
        console.log(error);
      });

    
}




    viewprofile(event){
        this.setState({redirectToViewprofile:"/ViewprofileAM"});
        event.preventDefault();
    }
    signin(event){
        this.setState({redirectToSignin:"/Homepage/Signin"});
        event.preventDefault();
    }
    attendance(event){
        this.setState({redirectToAttendance:"/Homepage/AttendanceAMM"});
        event.preventDefault();
    }

    requests(event){
        this.setState({redirectToRequests:"/Homepage/Requests"});
        event.preventDefault();
    }
    
    viewreplacement(event){
        this.setState({redirectToViewreplacement:"/Homepage/ViewReplacement"});
        event.preventDefault();
    }

    viewschedule(event){
        this.setState({redirectToViewSchedule:"/Homepage/ViewSchedule"});
        event.preventDefault();
    }
    
    
    HomeCC(event){
        this.setState({RedirectToHomeCC:"/HomeC"});
        event.preventDefault();
    }
    HomeCI(event){
        this.setState({RedirectToHomeCI:"/HomeInstructor"});
        event.preventDefault();
    }
    HomeHOD(event){
        this.setState({RedirectToHomeHOD:"/HODhomepage"});
        event.preventDefault();
    }
    handlClose(){
        this.setState({statemodal:false});
       
    }
render(){
    if(this.state.redirectToViewprofile){
        return<Redirect to={this.state.redirectToViewprofile} Component={ViewProfileAM}/>
    }
    if(this.state.redirectToSignin){
        return<Redirect to={this.state.redirectToSignin} Component={Signin}/>
    }
    if(this.state.redirectToAttendance){
        return<Redirect to={this.state.redirectToAttendance} Component={AttendanceAMM}/>
    }
    if(this.state.redirectToRequests){
        return<Redirect to={this.state.redirectToRequests} Component={Requests}/>
    }

    if(this.state.redirectToViewreplacement){
        return<Redirect to={this.state.redirectToViewreplacement} Component={ViewReplacement}/>
    }

    if(this.state.redirectToViewSchedule){
        return<Redirect to={this.state.redirectToViewSchedule} Component={ViewSchedule}/>
    }
    if(this.state.RedirectToHomeHOD){
        return<Redirect to ={this.state.RedirectToHomeHOD} Component={HomeHOD}/>
    }
    if(this.state.RedirectToHomeCC){
        return<Redirect to ={this.state.RedirectToHomeCC} Component={HomeCC}/>
    }
    if(this.state.RedirectToHomeCI){
        return<Redirect to ={this.state.RedirectToHomeCI} Component={HomeCI}/>
    }
      
        return(

            
           
          <div class="text-left" >
<Navbar/>
            <h3>Welcome to your home page!</h3>


            <Modal isOpen={this.state.statemodal} >
      

    

      <h3>name is {this.state.name}</h3>
      <h3>office is {this.state.office}</h3>
      <h3>email is {this.state.email}</h3>
      <h3>day-off is {this.state.dayoff}</h3>
      <h3>salary is {this.state.salary}</h3>

      <button onClick={this.handlClose.bind(this)}> Close </button>
      </Modal>

      <Dropdown>
                <Dropdown.Toggle  id="dropdown1"style={{alignSelf:"center",marginLeft:550, marginTop:70 }}>
                <i class="fas fa-eye"></i>  Navigate 
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item as="button"  disabled="true">Academic Member</Dropdown.Item>
                    <Dropdown.Item as="button"  onClick={this.HomeCC} disabled={this.state.DisabledCC}>Course Coordinator</Dropdown.Item> 
                    <Dropdown.Item as="button"  onClick={this.HomeCI}disabled={this.state.DisabledCI}>Course Instructor</Dropdown.Item> 
                    <Dropdown.Item as="button"  onClick={this.HomeHOD}disabled={this.state.DisabledHOD}>Head Of Department</Dropdown.Item> 
                </Dropdown.Menu>
            </Dropdown>
            <button onClick={this.signin} class="homebutton" type="button"id="loginSubmit">Sign In Page</button>
            <button  type="button" class="homebutton" id="loginSubmit">View Schedule</button>
            <button onClick={this.requests} class="homebutton" type="button" id="loginSubmit">Requests</button>
            <button onClick={this.attendance} class="homebutton" type="button" id="loginSubmit">View Attendance</button>
            <button onClick={this.viewreplacement} class="homebutton" type="button" id="loginSubmit">View replacement</button>
            <button onClick={this.viewschedule} class="homebutton" type="button" id="loginSubmit">View Your schedule</button>

          </div>
        
        )
    }

}




