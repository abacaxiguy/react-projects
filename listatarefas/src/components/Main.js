import React, { Component } from 'react';

import Form from './Form';
import Tarefas from './Tarefas';

import './Main.css';

export default class Main extends Component {
    state = {
      novaTarefa: '',
      tarefas: [],
      index: -1,
    };

    componentDidMount() {
      const tarefas = JSON.parse(localStorage.getItem('tarefas'));

      if (!tarefas) return 0;

      return this.setState({
        tarefas,
      });
    }

    componentDidUpdate(prevProps, prevState) {
      const { tarefas } = this.state;

      if (tarefas === prevState.tarefas) return 0;

      return localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const { tarefas, index } = this.state;
      let { novaTarefa } = this.state;
      novaTarefa = novaTarefa.trim();

      if (!novaTarefa) return 0;

      if (tarefas.indexOf(novaTarefa) !== -1) return 0;

      const novasTarefas = [...tarefas];

      if (index === -1) {
        return this.setState({
          tarefas: [...novasTarefas, novaTarefa],
          novaTarefa: '',
        });
      }
      novasTarefas[index] = novaTarefa;

      return this.setState({
        tarefas: [...novasTarefas],
        index: -1,
        novaTarefa: '',
      });
    }

    handleChange = (e) => {
      this.setState({
        novaTarefa: e.target.value,
      });
    }

    handleDelete = (e, i) => {
      const { tarefas } = this.state;
      const novasTarefas = [...tarefas];

      novasTarefas.splice(i, 1);

      this.setState({
        tarefas: [...novasTarefas],
      });
    }

  handleEdit = (e, i) => {
    const { tarefas } = this.state;
    this.setState({
      index: i,
      novaTarefa: tarefas[i],
    });
  }

  render() {
    const { novaTarefa, tarefas } = this.state;
    return (
      <div className="main">
        <h1>Lista de tarefas</h1>

        <Form
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          novaTarefa={novaTarefa}
        />
        <Tarefas
          handleDelete={this.handleDelete}
          handleEdit={this.handleEdit}
          tarefas={tarefas}
        />
      </div>
    );
  }
}
