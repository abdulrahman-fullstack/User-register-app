import React , {Component} from 'react';
import './UserCard.css';

function LoadingTemplate(props) {
	return (
	<div className="Loading-screen">
	<div className="loading-container"></div>
	</div>
	);
}

class UserCard extends Component {
	constructor(props){
		super(props);
		this.state = {
		users: [],
		isloaded: false,
		isreload: this.props.isreload,
		url: 'http://localhost:8005/api/users/',
		};
		this.HandleUserActions.bind(this);
		this.LoadUsers.bind(this);
		this.DeleteUser.bind(this);
	}
	HandleSelectedUser = (user_index)=> {
		this.props.onUserSelect(this.state.users[user_index]);
	}
	DeleteUser = (user_id)=>{
		if(window.confirm("Are you sure to want to delete this user ")){
			fetch(this.state.url+user_id, {
				method: 'DELETE',
			}).then(() =>{
				this.LoadUsers();
			}).catch(() => 
			alert("Unable to delete the user.. please try after some time"));
		}
	}
	HandleUserActions = (event)=>{
		var btn = event.target;
		if(btn.dataset.action === "delete")
			this.DeleteUser(btn.dataset.userid);
		else if (btn.dataset.action === "edit")
			this.HandleSelectedUser(btn.dataset.uindex);
	}
	LoadUsers(){
		fetch(this.state.url)
		.then(res => res.json())
		.then(json => {
			this.setState({ users: json, isloaded: true });
		}).catch(() => alert("Unable to connect to the server"));
	}
	ShowRegisterForm = ()=>{
		this.props.onClickPlusButton(true);
	}
	componentDidMount(){
		this.LoadUsers();
	}
	componentWillReceiveProps(newprops){
		if (newprops.isreload)
			this.LoadUsers();
	}
	render(){
		var { isloaded, users } = this.state;
		if (!isloaded)
			return (<div className="users-container-loading"> <LoadingTemplate /> </div>);

		return (      
			<div className="users-container grid-view">
				{users.map((user , index) =>
					<div key={user._id} className="user" data-userid={user._id}>
						<div className="actions">
							<div className="btn-edit fas fa-pen" data-action="edit" data-userid={user._id} data-uindex={index} onClick={this.HandleUserActions} title="Edit"></div>
							<div className="btn-delete fas fa-trash" data-action="delete" data-userid={user._id} data-uindex={index} onClick={this.HandleUserActions} title="Delete"></div>
						</div>
						<div className="name">{user.firstname+" "+user.lastname}</div>
						{user.age != null && <div className="age">{user.age} years old</div>}
						<div className="gender">{user.gender == null ? 'Male' : user.gender}</div>
						<div className="userpage">Profile : <a href={"localhost:8005/api/users/"+user._id}>{user.username}</a></div>
					</div>
				)}
				<div className="btn-show-form fas fa-plus" title="Register user" onClick={this.ShowRegisterForm}></div>
			</div>
		);
	}
}

export default UserCard;