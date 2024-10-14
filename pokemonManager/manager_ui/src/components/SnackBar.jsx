import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SnackBar(props) {
  const classes = useStyles();

  // スナックバーが閉じた際に走る処理(時間経過で自動で閉じても処理される)
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    props.setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={props.setOpen} autoHideDuration={2000} onClose={handleClose}>
        {/* メッセージと色はpropsで受け取った値で動的に設定 */}
        <Alert severity={props.severity}>
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
