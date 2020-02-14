import React from 'react';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';

import { useSelector } from 'react-redux';
import { Container } from './Styles';

const schema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string().email('Insira um email valido'),
  password: Yup.string(),
  oldPassword: Yup.string(),
  cofirmPassword: Yup.string(),
});

export default function Profile() {
  const profile = useSelector(state => state.user.profile);
  return (
    <Container>
      <Form initialData={profile} schema={schema}>
        <Input name="name" placeholder="Nome completo" />
        <Input
          name="email"
          placeholder="Seu endereço de e-mail"
          type="email"
        />
        <hr />
        <Input
          name="password"
          placeholder="Sua senha antiga"
          type="password"
        />
        <Input
          name="oldPassword"
          placeholder="Sua nova senha"
          type="password"
        />
        <Input
          name="CofirmPassword"
          placeholder="Confime sua nova senha"
          type="password"
        />

        <button type="submit">Atualizar perfil</button>
      </Form>
      <button type="submit">Sair do Gobarber</button>
    </Container>
  );
}
