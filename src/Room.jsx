import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ResultTable from "./component/ResultTable";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
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
  draftList: {
    border: "solid",
    width: "auto",
    margin: "5px",
  },
  value: {
    background: "red",
  },
}));

const Room = (props) => {
  const socket = props.socket;
  const name = props.roomInfo.name;
  const roomID = props.roomInfo.roomID;
  const title = props.roomInfo.title;
  const draftLists = props.roomInfo.draftLists;
  const endOrder = props.roomInfo.endOrder;
  const [isStart, setIsStart] = useState(false);
  const [isNomination, setIsNomination] = useState(false);

  const [selected, setSelected] = useState();
  const [users, setUsers] = useState([name]);

  useEffect(() => {
    socket.on("start", () => {});
  }, []);

  const classes = useStyles();

  const clickNominationTarget = (value) => () => {
    setSelected(value);
  };

  const clickNomination = () => {
    setIsNomination(true);
    socket.emit("nomination", selected, roomID);
  };

  return (
    <>
      <Container component="main" maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography
              variant="h5"
              align="left"
              color="textSecondary"
              component="p"
            >
              {title}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="flex-end"
            >
              <Typography
                variant="h5"
                align="left"
                color="textSecondary"
                component="p"
              >
                参加者
              </Typography>
              {users.map((value) => (
                <Grid key={value} item>
                  {value}
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="h6"
              align="left"
              color="textSecondary"
              component="p"
            >
              ニックネーム: {name}
            </Typography>
            <Typography
              variant="h6"
              align="left"
              color="textSecondary"
              component="p"
            >
              部屋ID: {roomID}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Button
              disabled={isStart}
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => {
                if (window.confirm("開始します。よろしいですか？")) {
                  socket.emit("start", roomID);
                }
              }}
            >
              スタート
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={() => {
                if (window.confirm("退出します。よろしいですか？")) {
                  socket.emit("exit", roomID);
                  props.setIsEnter(false);
                }
              }}
            >
              退出
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h2" align="center" component="p">
              指名
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h2" align="center" component="p">
              タイトル
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              align="left"
              color="textSecondary"
              component="p"
            >
              指名対象: {selected}
            </Typography>
            <List className={classes.root}>
              <Box
                display="flex"
                flexWrap="wrap"
                alignContent="flex-start"
                flexDirection="row"
                p={1}
                m={1}
              >
                {draftLists.map((value, i) => {
                  const labelId = `${value}_${i}`;
                  return (
                    <ListItem
                      key={i}
                      role={undefined}
                      button
                      onClick={clickNominationTarget(labelId)}
                      className={`${classes.draftList} ${
                        labelId === selected ? classes.value : ""
                      }`}
                    >
                      <ListItemText id={labelId} primary={value}></ListItemText>
                    </ListItem>
                  );
                })}
              </Box>
            </List>
            <Grid item xs={12}>
              <Button
                disabled={isStart && isNomination}
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={clickNomination()}
              >
                指名
              </Button>
              <Typography
                variant="h5"
                align="left"
                color="textSecondary"
                component="p"
              >
                めっせいじ
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <ResultTable users={users} endOrder={endOrder} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Room;
