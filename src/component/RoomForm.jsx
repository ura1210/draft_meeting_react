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

const RoomForm = (props) => {
  const socket = props.socket;
  const [name, setName] = useState("");
  const [roomID, setRoomID] = useState("");
  const [title, setTitle] = useState("ドラフト会議");
  const [draftLists, setDraftLists] = useState();
  const [endOrder, setEndOrder] = useState("");
  const [msg, setMsg] = useState("メッセージ");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connect");
    });

    socket.on("roomCreate", () => {
      props.setIsEnter(true);
      const info = {
        name,
        roomID,
        title,
        draftLists,
        endOrder,
      };
      props.setRoomInfo(info);
    });

    socket.on("DuplicateID", () => {
      setMsg("既に存在する部屋IDです。");
    });

    socket.on("roomEnter", (roomInfo) => {
      props.setIsEnter(true);
      const info = {
        name,
        roomID,
        title: roomInfo.title,
        draftLists: roomInfo.draftLists,
        endOrder: roomInfo.endOrder,
      };
      props.setRoomInfo(info);
    });

    socket.on("roomEnterError", (num) => {
      switch (num) {
        case 1:
          setMsg("既に進行中の部屋IDです。");
          break;
        case 2:
          setMsg("既に存在する部屋IDです。");
          break;
        default:
          setMsg("予期せぬエラーです。");
          break;
      }
    });
  }, []);

  const create = () => {
    const createInfo = {
      name,
      roomID,
      title,
      draftLists,
      endOrder,
    };
    socket.emit("create", createInfo);
  };

  const enter = () => {
    const enterInfo = {
      name,
      roomID,
    };
    socket.emit("enter", enterInfo);
  };

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
                  onChange={(v) => setName(v.target.value)}
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
                  onChange={(v) => setRoomID(v.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="title"
                  label="タイトル"
                  id="title"
                  autoComplete="off"
                  onChange={(v) => setTitle(v.target.value)}
                />
                <TextField
                  variant="outlined"
                  id="standard-multiline-static"
                  label="ドラフト候補一覧"
                  multiline
                  fullWidth
                  rows={4}
                  onChange={(v) => {
                    const list = v.target.value.split(/\n/);
                    setDraftLists(list);
                  }}
                />
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    終了巡目数
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={endOrder}
                    onChange={(v) => setEndOrder(v.target.value)}
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
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={enter}
                >
                  入室
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
        <Typography
          component="h1"
          variant="caption"
          align="center"
          color="error"
        >
          {msg}
        </Typography>
      </Container>
    </>
  );
};

export default RoomForm;
