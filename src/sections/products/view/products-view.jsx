import { useEffect, useState } from 'react';

import { Container, Typography } from '@mui/material';
import { DashboardApi } from 'src/api/dashboard.ts';
import TableComponent from '../table';

export default function ProductsView() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      new DashboardApi().getAllBooking().then((value) => {
        const transformedData = value.map((item) => ({
          name: item.name,
          ticketNumber: item.ticket,
          status: item.paymentStatus,
          departureDate: new Date(item.departure).toISOString().split('T')[0],
          arrivalDate: new Date(item.arrival).toISOString().split('T')[0],
          ticketStatus: item.ticketStatus,
        }));

        console.log(transformedData);

        setData(transformedData);
      });
    };

    fetchDashboardData();
  }, []);

  return (
    <Container maxWidth="xl">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Reports
        </Typography>
      </Container>
      <br />
      <TableComponent data={data} />
    </Container>
  );
}
