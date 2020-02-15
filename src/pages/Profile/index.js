import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { updateProfleRequest } from '~/store/modules/user/actions';

import AvatarInput from './AvatarProfile';

import { Container } from './Styles';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfleRequest(data));
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} initialData={profile}>
        <AvatarInput name="avatar_id" />
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
      <button type="button">Sair do Gobarber</button>
    </Container>
  );
}
