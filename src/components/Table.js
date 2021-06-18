import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddTable from './AddTable';
import Title from './Title';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import EcoIcon from "@material-ui/icons/Eco";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

// import { firebase } from './firebase';
// const dbRef = firebase.database().ref();


// Generate Order Data
function createData(id, date, name, content) {
  return { id, date, name, content};
}

const rows = [
  createData(0, '16 Mar, 2019', 'Elvis Presley', 'Hello World!'),
  createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK'),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA'),
  createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN'),
  createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ'),
];

const iconStyle = {
  position: 'fixed',
  bottom: '30px',
  right: '30px'
};

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function TheTable() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <React.Fragment>
      <Paper>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="NNSOFT" />
      </Tabs>
    </Paper>

      {/* <Title>The Table</Title> */}
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Content</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.content}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div>
        <AddCircleOutlineIcon fontSize="large" style={iconStyle} onClick="" />
      </div>
      <Dialog>
        title = "insert row"
        
      </Dialog>

      {/* <FloatingActionButton style={fabStyle} onClick={this.handleDialogToggle}>
      </FloatingActionButton> */}

      {/* <div>
        <AddTable/>
      </div> */}

    </React.Fragment>
  );
}