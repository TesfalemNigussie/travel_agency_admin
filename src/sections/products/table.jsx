import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import { saveAs } from 'file-saver';

const columns = [
  { id: 'name', label: 'Name' },
  { id: 'ticketNumber', label: 'Ticket Number' },
  { id: 'status', label: 'Status' },
  { id: 'departureDate', label: 'Departure Date' },
  { id: 'arrivalDate', label: 'Arrival Date' },
  { id: 'ticketStatus', label: 'Ticket Status' },
];

const TableComponent = (prop) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState('');
  const [sortedColumn, setSortedColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  const { data } = prop;

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleSort = (columnId) => {
    if (sortedColumn === columnId) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortedColumn(columnId);
      setSortDirection('asc');
    }
  };

  const handleDownloadCSV = () => {
    const csvData = data;

    const csvContent = [
      columns.map((column) => column.label).join(','),
      ...csvData.map((row) => columns.map((column) => row[column.id]).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'table_data.csv');
  };

  const sortedData = data
    .filter((row) =>
      columns.some((column) => row[column.id]?.toLowerCase().includes(searchText?.toLowerCase()))
    )
    .sort((a, b) => {
      const columnA = a[sortedColumn]?.toLowerCase();
      const columnB = b[sortedColumn]?.toLowerCase();

      if (columnA < columnB) return sortDirection === 'asc' ? -1 : 1;
      if (columnA > columnB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6}>
          <TextField
            label="Search"
            variant="outlined"
            value={searchText}
            onChange={handleSearch}
            style={{ marginBottom: 20 }}
          />
        </Grid>
        <Grid item xs={6} container justifyContent="flex-end">
          <Button
            onClick={handleDownloadCSV}
            variant="contained"
            color="primary"
            style={{ marginBottom: 20, marginLeft: 10 }}
          >
            Download CSV
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  onClick={() => handleSort(column.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.ticketNumber}>
                {columns.map((column) => (
                  <TableCell key={column.id}>{row[column.id]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={sortedData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default TableComponent;
