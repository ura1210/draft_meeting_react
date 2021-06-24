import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ResultTable from './component/ResultTable';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    value: {
        background: "red",
    },
}));

const Room = () => {
    const [selected, setSelected] = useState();
    let [users, setUsers] = useState();
    users = ["minoru", "minoru2", "minoru3"];

    const classes = useStyles();

    const clickDominationTarget = (value) => () => {
        setSelected(value);
    }

    return (
        <>
            <Container component="main" maxWidth="md">

                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Typography variant="h5" align="left" color="textSecondary" component="p">
                            タイトル
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container
                            direction="column"
                            justify="flex-start"
                            alignItems="flex-end" >
                            <Typography variant="h5" align="left" color="textSecondary" component="p">
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
                        <Typography variant="h5" align="left" color="textSecondary" component="p">
                            ニックネーム: aa 部屋ID: aaa
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            スタート
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                        >
                            退出
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        指名
                    </Grid>
                    <Grid item xs={12}>
                        メッセージ
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                        >
                            指名
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        指名対象{selected}
                        <List className={classes.root}>
                            <Box display="flex" flexDirection="row" p={1} m={1}>
                                {[0, 1, 2, 3].map((value) => {
                                    const labelId = value;

                                    return (
                                        <ListItem key={value} role={undefined} dense button onClick={clickDominationTarget(value)}>
                                            <ListItemText id={labelId} className={labelId === selected ? classes.value : ''} primary={`Line item ${value + 1}`} ></ListItemText>
                                        </ListItem>
                                    );
                                })}
                            </Box>
                        </List>
                    </Grid>
                    <Grid item xs={12}>
                        ドラフト結果
                        <ResultTable />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default Room;