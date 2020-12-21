import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TablePagination } from '@material-ui/core';
import TablePaginationActions from '@material-ui/core/TablePagination/TablePaginationActions';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    backgroundColor: '#222831',
  },
  tableCell: {
    color: '#eeeeee',
  },
  tableHeader: {
    backgroundColor: '#00adb5',
  },
  page: {
    color: '#00adb5',
  },
  container: {
    marginBottom: '40px',
  },
});

interface ITableProps {
  data: any;
}

export const ItemTable: React.FC<ITableProps> = ({ data }) => {
  const classes = useStyles();
  const rows = data;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead className={classes.tableHeader}>
          <TableRow>
            <TableCell className={classes.tableCell}>Image</TableCell>
            <TableCell className={classes.tableCell}>Name</TableCell>
            <TableCell className={classes.tableCell}>Price (USD)</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row: any) => (
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
          <TablePagination
            rowsPerPageOptions={[4, 8, 12, { label: 'All', value: -1 }]}
            colSpan={3}
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: { 'aria-label': 'rows per page' },
              native: true,
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
            className={classes.page}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
};
