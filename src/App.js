//import React from 'react';
import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

var main;
var items = [];
class NoteApp extends Component {
	constructor(props) {
		super(props);
		this.handleChangeUser = this.handleChangeUser.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
		this.handleChangeText = this.handleChangeText.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChangeTitle = this.handleChangeTitle.bind(this);
		this.handleChangeBody = this.handleChangeBody.bind(this);
		this.state = {text: '', user: '', idItems:undefined};
		main = this;
	}

	render() {
		return (
			<div>
				<center><h1>Minhas Anotações</h1></center>
				<div className='dclass'>
					<form onSubmit={this.handleSubmit}>
						<center><b>Escolha o Usuario</b></center>
						<input onChange={this.handleChangeUser} value={this.state.user} />
					</form>
				</div>
				{this.state.user === '' ? '' :
					<div className='dclass'>
						<center><b>Titulo da anotação</b></center>
						<form onSubmit={this.handleSubmit}>
							<input onChange={this.handleChangeText} value={this.state.text} />
							<button>{'Adicionar nova anotação'}</button>
						</form>
						<p>Outras anotações</p>
						<NoteList />
					</div>
				}
				{this.state.idItems === undefined ? '': 
					<div className='dclass'> 
						<div>
							<input onChange={this.handleChangeTitle} id={items[this.state.idItems].idnote} value={items[this.state.idItems].title} />
							<br />
							<textarea style={{width:'700px', height:'300px'}} onChange={this.handleChangeBody} id={items[this.state.idItems].idnote} value={items[this.state.idItems].body} />
							<br />
							<input value="remover anotação" type="button" onClick={this.handleRemove} />
						</div>
					</div>
				}
			</div>
		);
	}

	handleChangeUser(e) {
		var val = e.target.value
		axios.get('http://localhost:3001/user=' + e.target.value)
			.then(function (response) {
				items = response.data;
				var newId = items.length > 0 ? 0 : undefined;
				main.setState({user: val, idItems:newId});
			});
	}
	
	handleRemove(e) {
		axios.get('http://localhost:3001/remove=' + items[this.state.idItems].idnote)
		items.splice(this.state.idItems, 1);
		var newId = items.length > 0 ? 0 : undefined;
		this.setState({idItems: newId});
	}
	
	handleChangeText(e) {
		this.setState({text: e.target.value});
	}

	handleChangeTitle(e) {
		items[this.state.idItems].title = e.target.value
		axios.post('http://localhost:3001/changetitle', {idnote:e.target.id, title: e.target.value})
		this.setState({})
	}

	handleChangeBody(e) {
		items[this.state.idItems].body = e.target.value
		axios.post('http://localhost:3001/changebody', {idnote:e.target.id, body: e.target.value})
		this.setState({})
	}

	handleSubmit(e) {
		e.preventDefault();
		var id = Date.now()
		items.push({title: this.state.text, body: '', idnote: id})
		axios.post('http://localhost:3001/add', {idnote:id, title: this.state.text, body: '', user: this.state.user})
		this.setState({text: '', idItems: items.length - 1});
	}
}

class NoteList extends Component {
	render() {
		return (
			<ul>
				{Object.keys(items).map(id => (
					<li key={"li"+id}>
						<input id={id} value={items[id].title} type="button" onClick={this.handleClick} />
					</li>
				))}
			</ul>
		);
	}

	handleClick(e) {
		main.setState({idItems: e.target.id})
	}
}

export default NoteApp;
