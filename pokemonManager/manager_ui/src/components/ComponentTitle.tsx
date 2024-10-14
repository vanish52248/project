// 各コンポーネントの見出し（タイトル）を変更（共通化）するコンポーネント
import React from 'react'

import Typography from '@mui/material/Typography';

import '../css/ComponentTitle.css'

const ConponentTitle = (props: any) => {
  return (
    <div className='title_container'>
     {/* タイトルを各コンポーネントから受け取ったpropsの値に動的に変更 */}
     <Typography variant="h1" fontSize={"25px"} className='title'>{props.title}</Typography>
   </div>
  )
}

export default ConponentTitle