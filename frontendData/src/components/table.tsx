import React from 'react';
import { Box, Button, Card, CardActions, CardContent, Grid, ToggleButton, ToggleButtonGroup, Typography} from '@mui/material';
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from 'react-redux';
import { getClients, TableState } from '../redux/modules/table';
import { RootState } from '../redux/store';
import { useEffect } from 'react';

export default function TableData() {
  const dispatch = useDispatch<any>();
  const tableData: TableState = useSelector((state: RootState) => state.dashboard);
  const [displayTable, toggleDisplay] = React.useState(false);

  useEffect(() => {
    dispatch(getClients())
  }, []);

  const tableDataItems = tableData.clients.map((client: any) => {
    return {
      "Timestamp": client.Timestamp,
      "Y-B(KV)": client["Y-B(KV)"],
      "R-Y(KV)": client["R-Y(KV)"],
      "B-R (KV)": client["B-R (KV)"],
      "APPARENT POWER (MVA)": client["APPARENT POWER (MVA)"],
      "REACTIVE POWER (MVAR)": client["REACTIVE POWER (MVAR)"],
      "ACTIVE ENERGY (MWH)": client["ACTIVE ENERGY (MWH)"],
      "POWER FACTOR": client["POWER FACTOR"],
      "Y (A)": client["Y (A)"],
      "ACTIVE POWER (MW)": client["ACTIVE POWER (MW)"],
      "R(A)": client["R(A)"],
      "B(A)": client["B(A)"],
      "FREQUENCY(HZ)": client["FREQUENCY(HZ)"]
    }
  });

  const columns = [
    {
      name: 'Timestamp',
      selector: row => row.Timestamp,
      sortable: true,
      minWidth: '70px',
      width: '70px'
    },
    {
      name: 'Y-B(KV)',
      selector: row => row["Y-B(KV)"],
      sortable: true,
      minWidth: '120px'
    },
    {
      name: 'R-Y(KV)',
      selector: row => row["R-Y(KV)"],
      minWidth: '220px',
      allowOverflow: true
    },
    {
      name: 'B-R (KV)',
      selector: row => row["B-R (KV)"],
      minWidth: '140px'
    },
    {
      name: 'APPARENT POWER (MVA)',
      selector: row => row["APPARENT POWER (MVA)"],
      minWidth: '110px'
    },
    {
      name: 'REACTIVE POWER (MVAR)',
      selector: row => row["REACTIVE POWER (MVAR)"],
      minWidth: '60px'
    },
    {
      name: 'ACTIVE ENERGY (MWH)',
      selector: row => row["ACTIVE ENERGY (MWH)"],
      minWidth: '110px'
    },
    {
      name: 'POWER FACTOR',
      selector: row => row["POWER FACTOR"],
      minWidth: '100px'
    },
    {
      name: 'Y (A)',
      selector: row => row["Y (A)"],
      minWidth: '100px'
    },
    {
      name: 'ACTIVE POWER (MW)',
      selector: row => row["ACTIVE POWER (MW)"],
      minWidth: '100px'
    },
    {
      name: 'R(A)',
      selector: row => row["R(A)"],
      minWidth: '100px'
    },
    {
      name: 'B(A)',
      selector: row => row["B(A)"],
      minWidth: '100px'
    },
    {
      name: 'FREQUENCY(HZ)',
      selector: row => row["FREQUENCY(HZ)"],
      minWidth: '100px'
    },

  ];

  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

  const renderTable = () => {
    return <>
      <Box sx={{ d: 'flex', alignItems: 'flex-end' }}>      
      <DataTable
        className='hi-datatable-component customize-scrollbar'
        data={tableDataItems}
        columns={columns}
        pagination
        highlightOnHover
        fixedHeader
        fixedHeaderScrollHeight='378px'
      />
      </Box>
    </>
}

  const renderCard = () => {
    return <>
    <Grid container sx = {{ gap: "113px"}}>

          {tableData.clients.map((client: any) => {
            return <>
      <Card sx={{ minWidth: 50, backgroundColor: "darkseagreen" }}>
        <CardContent>
              <Typography variant="h5" component="div">
                Timestamp: {client.Timestamp}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Timestamp: {client.Timestamp}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Y-B(KV): {client["Y-B(KV)"]}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              R-Y(KV): {client["R-Y(KV)"]}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              B-R (KV): {client["B-R (KV)"]}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              APPARENT POWER (MVA): {client["APPARENT POWER (MVA)"]}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              REACTIVE POWER (MVAR): {client["REACTIVE POWER (MVAR)"]}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              ACTIVE ENERGY (MWH): {client["ACTIVE ENERGY (MWH)"]}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              POWER FACTOR: {client["POWER FACTOR"]}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Y (A): {client["Y (A)"]}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              ACTIVE POWER (MW): {client["ACTIVE POWER (MW)"]}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              R(A): {client["R(A)"]}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              B(A): {client["B(A)"]}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              FREQUENCY(HZ): {client["FREQUENCY(HZ)"]}
              </Typography>
        </CardContent>
      </Card>
            </>
          })}
          </Grid>
    </>
  }

  useEffect(() => {
    console.log("displayTable",displayTable);
  }, [displayTable])


  return (
    <>
      <Box sx={{ minWidth: 650 }}>
        <ToggleButtonGroup
          value={displayTable ? 'table' : 'card'}
          exclusive
          onChange={() => toggleDisplay(!displayTable)}
          aria-label="Display as table or card"
        >
          <ToggleButton value="table" aria-label="Display as table">
            Table
          </ToggleButton>
          <ToggleButton value="card" aria-label="Display as card">
            Card
          </ToggleButton>
        </ToggleButtonGroup>

        {displayTable ? renderTable() : renderCard()}
      </Box>
    </>
  );
}

