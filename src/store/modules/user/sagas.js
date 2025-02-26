import { all, takeLatest, call, put } from 'redux-saga/effects';

import { toast } from 'react-toastify';
import api from '~/services/api';
import { updateProfleSuccess, updateProfleFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, avatar_id, ...rest } = payload.data;
    const profile = {
      name,
      email,
      avatar_id,

      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, 'users', profile);

    toast.success('Perfil atualizado com sucesso');
    yield put(updateProfleSuccess(response.data));
  } catch (error) {
    toast.error('Erro ao atualizar perfil, confira seus dados');
    yield put(updateProfleFailure());
  }
}
export default all([
  takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile),
]);
