import React,{Component  } from 'react';
import {Button} from "./Button"
import './Button.css'
import { Input } from 'semantic-ui-react'
import Navbar from '../NavbarInstructor'
import axios from "axios";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
toast.configure(); 

axios.defaults.baseURL=" https://ahabackend.herokuapp.com/"
class DeleteAssignMembertoSlot extends Component{
    constructor(){
        super();
        this.state={
            facultyname:"",
            departmentid:"",
            courseid:"",
            day:"",
            slot:"",
            memberid:""
        }
    }

    handleChange(event){
        this.setState({
           facultyname:event.target.value

        })
    }
    handleChange1(event){
        this.setState({
           departmentid:event.target.value

        })
    }
    handleChange2(event){
        this.setState({
            courseid:event.target.value

        })
    }
    handleChange3(event){
        this.setState({
           day:event.target.value

        })
    }
    handleChange4(event){
        this.setState({
            slot:event.target.value

        })
    }
   
    handleChange6(event){
        this.setState({
            memberid:event.target.value

        })
    }
    
    DeleteAssign(){
        toast('Deleted Assignment of a member ',{position:toast.POSITION.BOTTOM_CENTER});
const inputdata={
    facultyname:this.state.facultyname,
    departmentid:this.state.departmentid,
    courseid:this.state.courseid,
    day:this.state.day,
    slot:this.state.slot,
    AMid:this.state.memberid


}
    axios.post("/deleteassigningunassignedslots",inputdata,{headers:{'x-auth-token':localStorage.getItem('savedToken')
    }}).then(response => {
        
      console.log("course added to T");

    })
    this.state.flag=true;
    }
    render(){
        return(
            <div className="DeleteAssignMembertoSlot" >
                <Navbar/>
                <nav aria-label="breadcrumb">
            <ol className="breadcrumb alert alert-warning">
              <li className="breadcrumb-item text-warning"><a className="text-warning"href="/HomeInstructor">Home</a></li>
              <li className="breadcrumb-item "><a className="text-warning"href="/Course">Course</a></li>

              <li className="breadcrumb-item active text-danger" aria-current="page">Delete Slot Assignment</li>
            </ol>
          </nav>
           
                <Input style={{alignSelf:"center",marginLeft:550, marginTop:50 }} placeholder=' Faculty Name...' onChange={this.handleChange.bind(this)}/ >
<Input style={{alignSelf:"center",marginLeft:550, marginTop:50 }} placeholder=' Department Id...' onChange={this.handleChange1.bind(this)}/ >
<Input style={{alignSelf:"center",marginLeft:550, marginTop:50 }} placeholder=' Course Id...' onChange={this.handleChange2.bind(this)} / >
<Input style={{alignSelf:"center",marginLeft:550, marginTop:50 }} placeholder=' Day Example: Saturday' onChange={this.handleChange3.bind(this)}/ >    
<Input style={{alignSelf:"center",marginLeft:550, marginTop:50 }} placeholder=' Slot Example: fifth' onChange={this.handleChange4.bind(this)}/ > 
<Input style={{alignSelf:"center",marginLeft:550, marginTop:50 }} placeholder=' Academic Member Id...' onChange={this.handleChange6.bind(this) }/ >
<button style={{alignSelf:"center",marginLeft:550, marginTop:50 ,marginBottom:200 }} class="btn btn-primary btn-round" onClick={this.DeleteAssign.bind(this)}>
             Delete Assignment
            </button>
           
            </div>
        )}

}
export default  DeleteAssignMembertoSlot