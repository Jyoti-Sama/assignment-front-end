import React from 'react'
import MainPart from '../components/MainPart'
import SideBar from '../components/SideBar'

import style from '../style.module.css'
function Home() {
  return (
    <div className={style.flex_direction}>
          <SideBar />
          <MainPart />
        </div>
  )
}

export default Home