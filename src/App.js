//import React from 'react';
import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

var main;
var items = [];
var server = 'http://localhost:3001/';

class LoginScreen extends Component {
	render() {
		return (
			<div id='boxLogin'>
				<form onSubmit={this.handleSubmit}>
					<h2>Escolha o Usuario</h2>
					<input id='loginInput' onChange={this.handleChangeUser} value={main.state.user} />
					<button id='btLogin' onClick={this.handleLogin} >Login</button>
				</form>
			</div>
		);
	}

	handleSubmit(e) {
		e.preventDefault();
		if(main.state.text.length==0)return;
		var id = Date.now()
		items.push({title: main.state.text, body: '', idnote: id})
		axios.post(server + 'add', {idnote:id, title: main.state.text, body: '', user: main.state.user})
		main.setState({text: '', idItems: items.length - 1});
		main.closeLightBox();
	}

	handleChangeUser(e) {
		main.setState({user: e.target.value});
	}

	handleLogin(e) {
		axios.get(server + 'user=' + main.state.user)
			.then(function (response) {
				items = response.data;
				var newId = items.length > 0 ? 0 : undefined;
				main.setState({idItems:newId, searchText: ''});
				main.showLoggedScreen();
			});
	}
}

class NoteApp extends Component {
	constructor(props) {
		super(props);
		this.state = {text: '', user: '', idItems:undefined, searchText: ''};
		main = this;
		main.showScreenLogin();
	}

	render() {
		return (
			<div>
				{/*<div id='boxLogin'>
					<form onSubmit={main.handleSubmit}>
						<h2>Escolha o Usuario</h2>
						<input id='loginInput' onChange={main.handleChangeUser} value={main.state.user} />
						<button id='btLogin' onClick={main.handleLogin} >Login</button>
					</form>
				</div>*/}
				<LoginScreen />
				<div id="loggedScreen">
					<div id="barTop">
						<h3>{main.state.user}</h3>
						<input id='btLogout' type='button' onClick={main.handleLogout} value={'Logout'} />
					</div>

					<div id='noteArea'>
						<button id="btAdd" onClick={main.showAddNote} >Adicionar Anotação</button>

						<div id="searchArea">
							<input onChange={main.handleChangeSearchBox} value={main.state.searchText} />
							<div><button onClick={main.handleSearch} ></button></div>
						</div>

						{items.length === 0 ? '' :
							<div>
								<NoteList />
							</div>
						} 
					</div>

					{main.state.idItems === undefined ? '': 
						<div id='contentArea'> 
							<div id="titleNote">
								<input onChange={main.handleChangeTitle} id={items[main.state.idItems].idnote} value={items[main.state.idItems].title} />
								<button onClick={main.handleRemove} >Excluir</button>
							</div>
							<div id="areaText">
								<textarea onChange={main.handleChangeBody} id={items[main.state.idItems].idnote} value={items[main.state.idItems].body} />
							</div>
						</div>
					}
				</div>

				<div id="novaNota" className="lightBoxBg">
					<div className="bg"  onClick={main.closeLightBox}></div>
					<div className="lightBox">
						<h4>Nova Anotação</h4>
						<form onSubmit={main.handleSubmit}>
							<input onChange={main.handleChangeText} value={main.state.text} />
							<button>Adicionar</button>
						</form>
					</div>
				</div>
			</div>
		);
	}

	showScreenLogin(){
		document.getElementById("root").className = "unlogged";
	}

	showLoggedScreen(){
		document.getElementById("root").className = "logged";
	}

	showAddNote(){
		document.getElementById("novaNota").style.display = "block";
	}

	closeLightBox(){
		document.getElementById("novaNota").style.display = "none";
	}

	handleLogout(e) {
		main.showScreenLogin();
	}
	
	handleRemove(e) {
		axios.get(server + 'remove=' + items[main.state.idItems].idnote)
		items.splice(main.state.idItems, 1);
		var newId = items.length > 0 ? 0 : undefined;
		main.setState({idItems: newId});
	}
	
	handleChangeText(e) {
		main.setState({text: e.target.value});
	}

	handleChangeTitle(e) {
		items[main.state.idItems].title = e.target.value
		axios.post(server + 'changetitle', {idnote:e.target.id, title: e.target.value})
		main.setState({})
	}

	handleChangeBody(e) {
		items[main.state.idItems].body = e.target.value
		axios.post(server + 'changebody', {idnote:e.target.id, body: e.target.value})
		main.setState({})
	}

	handleChangeSearchBox(e) {
		main.setState({searchText: e.target.value});
		main.handleSearch(e);
	}

	handleSearch(e) {
		axios.post(server + 'search', {user: main.state.user, text: e.target.value})
			.then(function (response) {
				items = response.data;
				var newId = items.length > 0 ? 0 : undefined;
				main.setState({idItems:newId});
			});
	}
}

class NoteList extends Component {
	render() {
		return (
			<div id="listNotes">
				{Object.keys(items).map(id => (
					<button id={id} onClick={this.handleClick} >{items[id].title}</button>
				))}
			</div>
		);
	}

	handleClick(e) {
		main.setState({idItems: e.target.id})
	}
}

export default NoteApp;
