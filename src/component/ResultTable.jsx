import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const users = ["minoru1", "minoru2", "minoru3"];
const data = ["abdf", "dfrr", "dfrefr"];

function createData(order, calories, fat, carbs, protein) {
  return { order, calories, fat, carbs, protein };
}

const rows = [
  {
    order: "1",
    calories: "abdf",
    fat: "ww",
    carbs: "wwwww",
    protein: "abawawadf",
  },
  createData("2", 237, 9.0, 37, 4.3),
  createData("3", 262, 16.0, 24, 6.0),
  createData("4", 305, 3.7, 67, 4.3),
  createData("5", 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

function ResultTable(props) {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h5" align="left" color="textSecondary" component="p">
        ドラフト結果
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>順位</StyledTableCell>
              {users.map((row) => (
                <StyledTableCell align="left">{row}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.order}>
                {rows.map((r) => (
                  <StyledTableCell align="left">{r.fat}</StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
export default ResultTable;
