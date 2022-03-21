import {configureStore} from '@reduxjs/toolkit'

import userData from './apiReducers';
import subjectData from './subjectStore';
import editSubjectData from './editSubjectStore'

const store = configureStore({
    reducer: {      
      userData: userData,
      subjectData: subjectData,
      editSubjectData: editSubjectData
    }
  })

export default store;