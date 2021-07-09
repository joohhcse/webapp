import React, { useState } from 'react';
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
import firebase from 'firebase';
import db from './firebase';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ContactSupportRounded, TabletSharp } from '@material-ui/icons';


// db.collection('table').get().then((result)=> {
//   result.forEach((doc)=>{
//     console.log(doc.data());
//   })
// })

// var docRef = db.collection('table');

// Generate Order Data
function createData(id, date, name, content) {
  return { id, date, name, content};
}

var rows = [];

var rId;
var rContent;
var rDate;

// rows.push(createData('HfXEnt8Muq3u5JJn9eeA', 'testDate', 'Name_'+rId, rContent));
// rows.push(createData('dWSs4IkBYTq9nysOwrqg', 'testDate2', 'Name_'+rId, rContent));

// rows.push(createData(3, '16 Mar, 2019', 'Elvis Presley', 'Hello World!'));
// rows.push(createData(2, '16 Mar, 2019', 'Paul McCartney', 'London, UK'));
// rows.push(createData(1, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA'));
// rows.push(createData(0, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN'));

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
  const [open, setOpen] = React.useState(false);

  const [tables, setTables] = React.useState([]);
  const [input, setInput] = useState({
    name: "",
    content: ""
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setInput('');
    setOpen(false);
  };


  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     const db = firebase.firestore();
  //     const data = await db.collection("table").get();
  //     setTables(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  //   };
  //   fetchData();
  // }, []);

  React.useEffect(() => {
    db.collection('table').orderBy('datetime', 'desc').onSnapshot(snapshot => {
      console.log('Firebase Snap!');
      setTables(snapshot.docs.map(doc => {
        return {
          id: doc.id,
          name: doc.data().name,
          content: doc.data().content
          // datetime: doc.data().date
        }
      }))
    })

  }, []);

  const addTable = (event) => {
    event.preventDefault();
    db.collection('table').add({
      name: input.name,
      content: input.content,
      datetime: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('');
    setOpen(false);
  }

  const deleteTable = (id) => {
    if(!window.confirm("삭제할까요?")) {
      return;
    }

    db.collection('table').doc(id).delete().then(res => {
      console.log('Deleted!', res);
    });
  }
  
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
            <TableCell>Name</TableCell>
            <TableCell>Content</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tables.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>
                {row.content}
                {/* <Button color="primary">Edit</Button> */}
                <Button color="secondary" onClick={() => { deleteTable(row.id) }}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div>
        <AddCircleOutlineIcon fontSize="large" style={iconStyle} onClick={handleClickOpen} />
      </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">MEMO</DialogTitle>
        <DialogContent>
          <DialogContentText>
            메모를 남겨주세요.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={input.name}
            onChange={event => setInput({...input, name:event.target.value})}
          />
          <TextField
            autoFocus
            margin="dense"
            id="content"
            label="Memo"
            type="text"
            fullWidth
            value={input.content}
            onChange={event => setInput({...input, content:event.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addTable} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* <FloatingActionButton style={fabStyle} onClick={this.handleDialogToggle}>
      </FloatingActionButton> */}

      {/* <div>
        <AddTable/>
      </div> */}

    </React.Fragment>
  );
}