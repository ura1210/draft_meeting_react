import React, { useState } from 'react';
import Footer from './Footer';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const App = ()=> {
    const msg = useState("msg");
    const classes = useStyles();
  return (
    <>
<Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
        ドラフトごっこ(β)
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="ニックネーム"
            name="name"
            autoComplete="off"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="id"
            label="部屋ID"
            id="id"
            autoComplete="off"
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="title"
            label="タイトル"
            id="title"
            autoComplete="off"
          />
        <TextField
          variant="outlined"
          id="standard-multiline-static"
          label="ドラフト候補一覧"
          multiline
          fullWidth
          rows={4}
        />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            作成
          </Button>
        </form>
      </div>

      <Typography variant="h5" align="left" color="textSecondary" component="p">
      <ol>
        <li>設定を入力して部屋を作成。
          ドラフト候補は一つを一行づつ入力してください。
          または既に存在する部屋にニックネームと部屋IDを入力して入室</li>
        <li>メンバーが揃って準備ができたらホストはSTARTをクリック</li>
        <li>獲得したいドラフト候補を選択して指名ボタンをクリック</li>
      </ol>
      <h3>ルール</h3>
      <ul>
        <li>同一順目で競合した場合、指名者内から抽選し、抽選負けの場合は再指名</li>
        <li>全員が1人獲得確定したら1順終了</li>
        <li>設定した終了巡目数まで指名、または参加人数よりドラフト候補が少なくなったら終了</li>
      </ul>
        </Typography>
    </Container>
    </>
  );
}

export default App;