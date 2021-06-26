import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { io } from "socket.io-client";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const RoomForm = () => {
  const socket = io();
  const [roomID, setRoomID] = useState("");
  const [endOrder, setEndOrder] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connect");
    });
  }, []);

  const handleChange = (event) => {
    setEndOrder(event.target.value);
  };

  const create = () => {
    console.log(roomID);
    socket.emit("create", roomID);
  };

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
            <Grid container spacing={3}>
              <Grid item xs={6}>
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
                  onChange={(v) => setRoomID(v)}
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
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    終了巡目数
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={endOrder}
                    onChange={handleChange}
                    label="終了巡目数"
                  >
                    {[...Array(10)]
                      .map((_, i) => i + 1)
                      .map((e) => {
                        return (
                          <MenuItem value={e} key={e}>
                            {e}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={create}
                >
                  作成
                </Button>
              </Grid>
              <Grid item xs={6}>
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  入室
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
};

export default RoomForm;
