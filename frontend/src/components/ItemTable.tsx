import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    backgroundColor: '#222831',
  },
  tableCell: {
    color: '#eeeeee'
  },
  tableHeader: {
    backgroundColor: '#00adb5'
  }
});

interface ITableProps {
  data: any;
}

export const ItemTable: React.FC<ITableProps> = ({ data }) => {
  const classes = useStyles();

  const rows = data;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead className={classes.tableHeader}>
          <TableRow >
            <TableCell className={classes.tableCell}>Image</TableCell>
            <TableCell className={classes.tableCell}>Name</TableCell>
            <TableCell className={classes.tableCell}>Price (USD)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                <img
                  alt={row.name}
                  height="150"
                  width="187.5"
                  src={row.image}
                />
              </TableCell>
              <TableCell className={classes.tableCell}>{row.name}</TableCell>
              <TableCell className={classes.tableCell}>{row.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
