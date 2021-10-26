import { createSlice } from '@reduxjs/toolkit';
import { ErrorReqHandler } from 'app/helpers/ErrorReqHandler';
import {
  createCreditCardFulfiled,
  createCreditCardRejected,
} from 'infrastructure/services/creditCard/CreditCardService';
import {
  kycFulfiled,
  kycRejected,
  loginFulfiled,
  logoutFulfiled,
  logoutRejected,
  signupFulfiled,
} from 'infrastructure/services/user/UserService';

const initialState: UserState = {
  user: {
    fullName: '',
    country: '',
    province: '',
    firstName: '',
    lastName: '',
    email: '',
    kyc1ed: false,
    kyc2ed: false,
    id: 0,
  },
  token: '',
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(signupFulfiled, (state, { payload: { token, user } }) => {
      state.isAuthenticated = true;
      state.token = token;
      state.user = { ...user };
    });
    builder.addMatcher(loginFulfiled, (state, { payload: { token, user } }) => {
      state.isAuthenticated = true;
      state.token = token;
      state.user = { ...user };
    });
    builder.addMatcher(logoutFulfiled, state => (state = initialState));
    builder.addMatcher(logoutRejected, (state, { payload: { status } }) => {
      ErrorReqHandler({ status });
    });
    builder.addMatcher(kycFulfiled, state => {
      state.user.kyc1ed = true;
    });
    builder.addMatcher(kycRejected, (state, { payload: { status } }) => {
      ErrorReqHandler({ status });
    });
    builder.addMatcher(createCreditCardFulfiled, state => {
      state.user.kyc2ed = true;
    });
    builder.addMatcher(createCreditCardRejected, (state, { payload: { status } }) => {
      ErrorReqHandler({ status });
    });
  },
});

interface User {
  fullName: string;
  country: string;
  province: string;
  firstName: string;
  lastName: string;
  email: string;
  kyc1ed: boolean;
  kyc2ed: boolean;
  id: number;
}

interface UserState {
  user: User;
  token: string;
  isAuthenticated: boolean;
}

export default userSlice.reducer;
