import React, { Component } from 'react';
import './UserForm.css';
import UserCard from '../UserCard/UserCard';

class UserForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            newuser : {
                firstname: "",
                lastname: "",
                age: "",
                username: "",
                password: "",
                gender: "Male"
            },
            selectedUser: "",
            isreload: false,
            FetchUrl: 'http://localhost:8005/api/users/',
        };
        this.HandleSubmit.bind(this);
        this.HandleInputChange.bind(this);
        this.clearForm.bind(this);
    }
    clearForm=()=>{
        this.setState({
            newuser: {
                firstname: "",
                lastname: "",
                age: "",
                username: "",
                password: "",
                gender: "Male"
            },
            selectedUser: "",
            isreload: false,
            FetchUrl: 'http://localhost:8005/api/users/',
        });
        document.getElementsByClassName('firstname')[0].focus();
    }
    RegisterUser=()=> {
        const User = this.state.newuser;
        fetch(this.state.FetchUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(User)
        }).then(()=>{
            this.setState({isreload: true});
        }).then(()=> this.clearForm())
        .catch(() => alert("Something went wrong please try after some time"));
    }
    UpdateUserData = () =>{
        const User = this.state.newuser;
        fetch(this.state.FetchUrl+this.state.selectedUser, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(User)
        }).then(() => {
            this.setState({ isreload: true });
        }).then(() => this.clearForm())
        .catch(() => alert("Something went wrong please try after some time"));
    }
    HandleSubmit = (event)=>{
        event.preventDefault();
        if(this.state.selectedUser === ""){
            this.RegisterUser();
        }
        else{
            this.UpdateUserData();
        }
    }
    HandleInputChange= (event)=>{
        event.preventDefault();

        this.setState({
            newuser: { ...this.state.newuser, [event.target.name]: event.target.value}
        });
    }
    HandleEditUser = (selectedUser)=>{
        if (window.innerWidth <= 430)
            this.ShowUserForm(true);
        this.setState({ newuser: selectedUser , selectedUser: selectedUser._id });
    }
    ShowUserForm = (isShowForm)=>{
        var formConatiner = document.getElementById('user-form');
        if (isShowForm){
            //show form
            formConatiner.classList.add('show-form');
        }
        else{
            //hide the form
            formConatiner.classList.remove('show-form');
        }
    }
    render(){
        return(
            <div className="main">
                <div className="userform-container" id="user-form">
                    <div className="form-box">
                        <div className="btn-close fas fa-times" onClick={this.ShowUserForm.bind(this,false)}></div>
                        <h1 className="form-caption">Register</h1>
                        <form className="userform" onSubmit={this.HandleSubmit}>
                            <input type="text" value={this.state.newuser.firstname} onChange={this.HandleInputChange} placeholder=" First Name" name="firstname" className="firstname" autoFocus required/>
                            <input type="text" value={this.state.newuser.lastname} onChange={this.HandleInputChange} placeholder=" Last Name" name="lastname" className="lastname"  required/>
                            <input type="text" value={this.state.newuser.age} onChange={this.HandleInputChange} placeholder=" Age" name="age" className="age" pattern="[0-9]{2}" title="Enter your age"  required/>
                            <div className="gender">
                                <input type="radio" id="rd-male" onChange={this.HandleInputChange} name="gender" value="Male" checked={this.state.newuser.gender === "Male"} /><label htmlFor="rd-male">Male</label>
                                &nbsp;<input type="radio" id="rd-female" onChange={this.HandleInputChange} name="gender" value="Female" checked={this.state.newuser.gender === "Female"} /><label htmlFor="rd-female">Female</label>
                            </div>
                            <input type="text" value={this.state.newuser.username} onChange={this.HandleInputChange} placeholder=" Username" name="username" className="username"  required/>
                            <input type="password" value={this.state.newuser.password} onChange={this.HandleInputChange} placeholder=" Password" name="password" className="password"  required/>
                            <input type="submit" value="Register"/>
                            <input type="button" value="Clear" onClick={this.clearForm}/>
                        </form>
                    </div>
                </div>
                <UserCard 
                isreload={this.state.isreload}
                onUserSelect={this.HandleEditUser}
                onClickPlusButton={this.ShowUserForm} />
            </div>
        );
    }
}

export default UserForm;