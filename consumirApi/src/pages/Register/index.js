import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { get } from 'lodash';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';
import Loading from '../../components/Loading';

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rpassword, setRpassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    let formErrors = false;

    if (rpassword !== password) {
      formErrors = true;
      toast.error('Senhas devem ser iguais!');
    }

    if (nome.length < 3 || nome.length > 20) {
      formErrors = true;
      toast.error('Nome deve conter entre 3 e 20 caracteres!');
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('Email inválido!');
    }

    if (password.length < 6 || password.length > 50) {
      formErrors = true;
      toast.error('Senha deve conter entre 6 e 50 caracteres!');
    }

    if (formErrors) return;

    setIsLoading(true);

    try {
      await axios.post('/users/', { nome, email, password });

      toast.success('Cadastro realizado com sucesso.');
      history.push('/login');
      setIsLoading(false);
      //
    } catch (e) {
      const errors = get(e, 'response.data.errors', []);

      errors.map((error) => toast.error(error));
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>Crie sua conta:</h1>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite seu nome"
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

        <label htmlFor="password">
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
          />
        </label>

        <label htmlFor="password">
          Confirmar senha:
          <input
            type="password"
            value={rpassword}
            onChange={(e) => setRpassword(e.target.value)}
            placeholder="Repita sua senha"
          />
        </label>

        <button type="submit">Criar minha conta</button>
      </Form>
    </Container>
  );
}
