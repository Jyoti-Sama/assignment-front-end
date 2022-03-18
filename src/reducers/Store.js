import {configureStore} from '@reduxjs/toolkit'

import userData from './apiReducers';
import subjectData from './subjectStore';

const store = configureStore({
    reducer: {      
      userData: userData,
      subjectData: subjectData
    }
  })

export default store;