import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useSelector, useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/actions';

export default function Register() {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.auth.user.id);
  const nomeStored = useSelector((state) => state.auth.user.nome);
  const emailStored = useSelector((state) => state.auth.user.email);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rpassword, setRpassword] = useState('');

  React.useEffect(() => {
    if (!id) return;
    setNome(nomeStored);
    setEmail(emailStored);
  }, [emailStored, id, nomeStored]);

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

    if (!id && (password.length < 6 || password.length > 50)) {
      formErrors = true;
      toast.error('Senha deve conter entre 6 e 50 caracteres!');
    }

    if (formErrors) return;

    dispatch(
      actions.registerRequest({
        nome,
        email,
        password,
        id,
      }),
    );
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>{id ? 'Editar dados:' : 'Crie sua conta:'}</h1>

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

        <button type="submit">
          {id ? 'Atualizar dados' : 'Criar minha conta'}
        </button>
      </Form>
    </Container>
  );
}
