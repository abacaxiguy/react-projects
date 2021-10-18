import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { isEmail, isInt, isFloat } from 'validator';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import Loading from '../../components/Loading';
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';

export default function Aluno({ match }) {
  const dispatch = useDispatch();

  const id = get(match, 'params.id', 0);
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        const Foto = get(data, 'Fotos[0].url', '');

        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setEmail(data.email);
        setIdade(data.idade);
        setPeso(data.peso);
        setAltura(data.altura);
        setIsLoading(false);
        console.log(Foto);
      } catch (err) {
        setIsLoading(false);
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', 0);

        if (status === 400) errors.map((error) => toast.error(error));
        history.push('/');
      }
    }
    getData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = false;

    if (nome.length < 3 || nome.length > 50) {
      toast.error('Nome precisa ter entre 3 e 50 caracteres');
      formErrors = true;
    }

    if (sobrenome.length < 3 || sobrenome.length > 50) {
      toast.error('Sobrenome precisa ter entre 3 e 50 caracteres');
      formErrors = true;
    }

    if (!isEmail(email)) {
      toast.error('E-mail inválido');
      formErrors = true;
    }

    if (!isInt(String(idade))) {
      toast.error('Idade precisa ser um número inteiro');
      formErrors = true;
    }
    if (!isFloat(String(peso))) {
      toast.error('Peso precisa ser um número válido');
      formErrors = true;
    }
    if (!isFloat(String(altura))) {
      toast.error('Altura precisa ser um número válido');
      formErrors = true;
    }

    if (formErrors) return;

    try {
      setIsLoading(true);
      if (id) {
        await axios.put(`/alunos/${id}`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success('Aluno(a) editado(a) com sucesso!');
      } else {
        const { data } = await axios.post(`/alunos/`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success('Aluno(a) criado(a) com sucesso!');
        history.push(`/aluno/${data.id}/edit`);
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      const status = get(err, 'response.status', 0);
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro desconhecido');
      }

      if (status === 401) dispatch(actions.loginFailure());
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{id ? 'Editar Aluno' : 'Novo Aluno'}</h1>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome:
          <input
            type="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite seu nome"
          />
        </label>
        <label htmlFor="sobrenome">
          Sobrenome:
          <input
            type="sobrenome"
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
            placeholder="Digite seu sobrenome"
          />
        </label>
        <label htmlFor="email">
          E-mail:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
          />
        </label>
        <label htmlFor="idade">
          Idade:
          <input
            type="idade"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            placeholder="Digite seu idade"
          />
        </label>
        <label htmlFor="peso">
          Peso:
          <input
            type="peso"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            placeholder="Digite seu peso"
          />
        </label>
        <label htmlFor="altura">
          Altura:
          <input
            type="altura"
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
            placeholder="Digite seu altura"
          />
        </label>

        <button type="submit">{id ? 'Alterar dados' : 'Criar Aluno'}</button>
      </Form>
    </Container>
  );
}

Aluno.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
