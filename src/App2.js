//import React from 'react';
import React, { Component } from 'react';
import './App.css';

var main;
class NoteApp extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {items: {}, text: '', idAtual:undefined};
		this.handleChangeTitle = this.handleChangeTitle.bind(this);
		this.handleChangeBody = this.handleChangeBody.bind(this);
		main = this;
	}

	render() {
		return (
			<div>
				<h1>My Note</h1>
				{main.state.idAtual === undefined ? '': <div>
						<h2>{main.state.items[main.state.idAtual].title}</h2>
						<h4>{main.state.idAtual}</h4>
						<p>{main.state.items[main.state.idAtual].body}</p>
						<input onChange={this.handleChangeTitle} id={main.state.idAtual} value={main.state.items[main.state.idAtual].title} />
						<input onChange={this.handleChangeBody} id={main.state.idAtual} value={main.state.items[main.state.idAtual].body} />
					</div>
				}
				{/*	main.state.idAtual === undefined || main.state.idAtual%2 == 1  ? '':
					<BoxItem id={main.state.idAtual} title={main.state.items[main.state.idAtual].title} 
							text={main.state.items[main.state.idAtual].body} />
				*/}
				<NoteList />
				<form onSubmit={this.handleSubmit}>
					<input onChange={this.handleChange} value={this.state.text} />
					<button>{'A2dd #' + (Object.keys(main.state.items).length + 1)}</button>
				</form>
			</div>
		);
	}

	handleChange(e) {
		this.setState({text: e.target.value});
	}

	handleChangeTitle(e) {
		main.state.items[e.target.id].title = e.target.value
		this.setState({})
	}

	handleChangeBody(e) {
		main.state.items[e.target.id].body = e.target.value
		this.setState({})
	}

	handleSubmit(e) {
		e.preventDefault();
		var id = Date.now()
		main.state.items[id] = {title: this.state.text, body: ''}
		this.setState({text: ''});
	}
}

class BoxItem extends Component {
	constructor(props) {
		super(props);
		this.handleChangeTitle = this.handleChangeTitle.bind(this);
		this.handleChangeBody = this.handleChangeBody.bind(this);
		//this.state = {title: props.title, body: props.text};
	}
	render() {
		return (
			<div>
			{/*console.log(this.state.body)*/}
			<input onChange={this.handleChangeTitle} type="button" onClick={this.handleClick} 
					id={this.props.id} value={main.state.items[this.props.id].title} />
			<input onChange={this.handleChangeBody} id={this.props.id} value={main.state.items[this.props.id].body} />
			</div>
		);
	}

	handleClick(e) {
		main.setState({idAtual: e.target.id})
	}

	handleChangeTitle(e) {
		main.state.items[e.target.id].title = e.target.value
		main.setState({})
	}

	handleChangeBody(e) {
		main.state.items[e.target.id].body = e.target.value
		main.setState({})
	}
}

class NoteList extends Component {
	render() {
		if(Object.keys(main.state.items).length % 2 === 1) 
		return (
			<ul>
				{
					Object.keys(main.state.items).map(id => (
					<li key={"li"+id}>
						<BoxItem id={id} title={main.state.items[id].title} text={main.state.items[id].body} />
					</li>
				))
			}
			</ul>
		);
		else return (
			<ul>
				{
					Object.keys(main.state.items).reverse().map(id => (
					<li key={"li"+id}>
						<BoxItem id={id} title={main.state.items[id].title} text={main.state.items[id].body} />
					</li>
				))
			}
			</ul>
		);
	}
}

export default NoteApp;
