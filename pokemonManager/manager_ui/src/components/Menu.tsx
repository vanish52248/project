// メニュー画面のコンポーネント
import * as React from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import Header from './Header';
import '../css/Menu.css';
import MenuButtons from './MenuButtons';
import ComponentTitle from './ComponentTitle';

export default function Menu() {

  return (
    <>
      <Header />
      <Grid container alignItems="center" justifyContent="center" className='grid_wrapper'>
        <Grid item  xs={4} className='menu_grid_item'>
          <Paper className='menu_paper'>
            <ComponentTitle title="メニュー画面" />
            <MenuButtons />
          </Paper >
      </Grid>
      </Grid>
    </>
  );
}

