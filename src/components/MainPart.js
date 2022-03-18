import React from 'react'
import Subject_hub from '../main_components/Subject_hub';

import style from '../style.module.css';

import { useSelector } from 'react-redux';


function MainPart() {
  
  const { value } = useSelector((state)=> state.subjectData);
  return (
    <div>
      <Subject_hub SUBJECT={value}/>
    </div>
  )
}

export default MainPart