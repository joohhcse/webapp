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
import firebase from './firebase';
// const dbRef = firebase.database().ref();
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ContactSupportRounded } from '@material-ui/icons';

console.log('Tablejs start!!')
// console.log(firebase.data())
const db = firebase.firestore();
// db.collection('table').get().then((result)=> {
//   result.forEach((doc)=>{
//     console.log(doc.data());
//   })
// })

var docRef = db.collection('table');

// docRef.get().then(function (querySnapshot) {
//   if (querySnapshot) {
//     querySnapshot.forEach(function (doc) {
//       let docs = doc.data();
//       console.log('문서의 id :' + doc.id);
//       for (let item in docs) {
//         console.log('key :' + item); //rnum, date, content
//         console.log('value :' + docs[item]); //
//       }
//     });
//   } else {
//     // doc.data() will be undefined in this case
//     console.log("No such document!");
//   }
// }).catch(function (error) {
//   console.log("Error getting document:", error);
// });

// Generate Order Data
function createData(id, date, name, content) {
  return { id, date, name, content};
}

// const rows = [
//   createData(0, '16 Mar, 2019', 'Elvis Presley', 'Hello World!'),
//   createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK'),
//   createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA'),
//   createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN'),
//   createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ'),
// ];

var rows = [];

var rId;
var rContent;
var rDate;

docRef.get().then(function (querySnapshot) {
  if (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      let docs = doc.data();
      console.log('문서의 id :' + doc.id);

      for (let item in docs) {
        console.log('key :' + item); //rnum, date, content
        console.log('value :' + docs[item]); //
        if(item == "rnum") {
          rId = docs[item];
          console.log('>' + rId);
        }
        else if(item == "content") {
          rContent = docs[item];
          console.log('>' + rContent);
        }
      }

      console.log('push!');
      console.log(rId + '/' + rContent);
      rows.push(createData(doc.id, 'testDate', 'Name_'+rId, rContent));
      
    });
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}).catch(function (error) {
  console.log("Error getting document:", error);
});



//rId : undefined! 발생!
// rows.push(createData(rId, 'testDate', 'Name_'+rId, rContent));
// rows.push(createData('HfXEnt8Muq3u5JJn9eeA', 'testDate', 'Name_'+rId, rContent));
// rows.push(createData('dWSs4IkBYTq9nysOwrqg', 'testDate2', 'Name_'+rId, rContent));

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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
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
        <AddCircleOutlineIcon fontSize="large" style={iconStyle} onClick={handleClickOpen} />
      </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">ADD A MEMO</DialogTitle>
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
          />
          <TextField
            autoFocus
            margin="dense"
            id="content"
            label="Memo"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
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