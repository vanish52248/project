import * as React from 'react';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';

const CompleteSnackBar = (props) => {

  // 他の箇所を押下した際の処理
  const handleSnackBarClose = () => {
    props.setOpen(false);
  };

  return (
    <Box className='snack_bar' sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={props.setOpen}
        onClose={handleSnackBarClose}
        message={props.setMessage}
        key="complete_snackbar"
        ContentProps={{
          sx: {
            backgroundColor: `${props.setSeverity}`,
          }
        }}
      />
    </Box>
  );
}
export default CompleteSnackBar
