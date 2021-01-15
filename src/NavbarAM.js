

import React,{Component  } from 'react';
import {MenuItems} from "./MenuItems"
import {Button} from './CourseInstructor/Button';
import './Navbar.css'
import Homepage from './AM/Homepage';
import {Redirect} from 'react-router-dom'
import StaffAM from './CourseInstructor/StaffAM';
import NotificationsAM from './NotificationsAM';
import Logout from './logout';
import ViewProfileAM from './AM/ViewprofileAM';
import Modal from 'react-modal'


class Navbar extends Component{

    constructor(){
        super();
        this.state={
            RedirectToHomeAM:null,
            RedirectToProfile:null,
            RedirectToNotification:null,
            RedirectOnLogout:null

        }
        this.HomeAM=this.HomeAM.bind(this);
        this.Notifications=this.Notifications.bind(this);
        this.Logout=this.Logout.bind(this);
        this.ProfileAM=this.ProfileAM.bind(this)
    }

    HomeAM(event){
        this.setState({RedirectToHomeAM:"/HomepageAM"})
        event.preventDefault()
    }
   
    Notifications(event){
        this.setState({RedirectToNotification:"/NotificationsAM"})
        event.preventDefault()
    }
  

    ProfileAM(event){
        this.setState({RedirectToProfile:"/ViewProfileAM"})
        event.preventDefault()
    }

      


    Logout(event){
        console.log("Logged Out");
        this.setState({RedirectOnLogout:"/Logout"})
        event.preventDefault()
    }
    state={ clicked:false}
    handleClick =() =>{
        this.setState({clicked:!this.state.clicked})
    }

   


    render(){
        if(this.state.RedirectToHomeAM){
            return<Redirect to ={this.state.RedirectToHomeAM} Component={Homepage}/>
        }
        if(this.state.RedirectToProfile){
            return<Redirect to ={this.state.RedirectToProfile} Component={ViewProfileAM}/>
        }
        if(this.state.RedirectToNotification){
            return<Redirect to ={this.state.RedirectToNotification} Component={NotificationsAM}/>
        }
        if(this.state.RedirectOnLogout){
            return<Redirect to ={this.state.RedirectOnLogout} Component={Logout}/>
        }

        return(
            <nav className="NavbarItems">
    <h1 className="navbar-logo">GUC<i class="fas fa-university"></i></h1>
    <div className="menu-icon" onClick={this.handleClick}>
            <i className={this.state.clicked ? 'fas fa-times': 'fas fa-bars'}></i>
    </div>

        <Button onClick={this.HomeAM}> {MenuItems[0].title}<i class={MenuItems[0].icon}></i> </Button>
        <Button onClick={this.ProfileAM}>{MenuItems[1].title}<i class={MenuItems[1].icon}></i> </Button>
        <Button onClick={this.Notifications}>{MenuItems[2].title}<i class={MenuItems[2].icon}></i> </Button>
        <Button onClick={this.Logout}>{MenuItems[4].title}<i class={MenuItems[4].icon}></i> </Button>

        {/* <Button></Button> */}
             </nav>
             
        )
    }
       
}

export default Navbar