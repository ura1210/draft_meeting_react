import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const HowToUse = () => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="md">
      <Typography
        variant="h5"
        align="left"
        color="textSecondary"
        component="ol"
      >
        あそびかた
      </Typography>
      <List component="nav" className={classes.root} aria-label="contacts">
        <ListItem>
          <ListItemText primary="1.設定を入力して部屋を作成。" />
        </ListItem>
        <ListItem>
          <ListItemText
            primary=" ドラフト候補は一つを一行づつ入力してください。
        または既に存在する部屋にニックネームと部屋IDを入力して入室"
          />
        </ListItem>
        <ListItem>
          <ListItemText primary="2.メンバーが揃って準備ができたらホストはSTARTをクリック" />
        </ListItem>
        <ListItem>
          <ListItemText primary="3.獲得したいドラフト候補を選択して指名ボタンをクリック" />
        </ListItem>
      </List>

      <Typography
        variant="h5"
        align="left"
        color="textSecondary"
        component="ol"
      >
        ルール
      </Typography>
      <List component="nav" className={classes.root} aria-label="contacts">
        <ListItem>
          <ListItemText primary="同一順目で競合した場合、指名者内から抽選し、抽選負けの場合は再指名" />
        </ListItem>
        <ListItem>
          <ListItemText primary="全員が1人獲得確定したら1順終了" />
        </ListItem>
        <ListItem>
          <ListItemText primary="設定した終了巡目数まで指名、または参加人数よりドラフト候補が少なくなったら終了" />
        </ListItem>
      </List>
    </Container>
  );
};

export default HowToUse;
