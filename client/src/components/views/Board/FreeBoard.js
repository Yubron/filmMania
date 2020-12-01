import React from 'react'
import { blueGrey } from '@material-ui/core/colors' 
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core'

const useStyles = makeStyles({
    root: {
      '& .MuiDataGrid-root	': {
        color:'white',
      },
      '& .MuiDataGrid-withBorder ': {
        color:'blue'
      },

    },
  });

const columns = [
    { field: 'id', headerName: '번호', width: 100 , sortable: false},
    { field: 'title', headerName: '제목', width: 130 , sortable: false},
    { field: 'writer', headerName: '작성자', width: 130 , sortable: false},
    {
      field: 'creDt',
      headerName: '시간',
      type: 'date',
      sortable: false,
      width: 90,
    },
  ];
  
  const rows = [
    { id: 1, title: 'Snow', writer: 'Jon', creDt: '06:45' },
    { id: 2, title: 'Lannister', writer: 'Cersei', creDt: 42 },
    { id: 3, title: 'Lannister', writer: 'Jaime', creDt: 45 },
    { id: 4, title: 'Stark', writer: 'Arya', creDt: 16 },
    { id: 5, title: 'Targaryen', writer: 'Daenerys', creDt: null },
    { id: 6, title: 'Melisandre', writer: null, creDt: 150 },
    { id: 7, title: 'Clifford', writer: 'Ferrara', creDt: 44 },
    { id: 8, title: 'Frances', writer: 'Rossini', creDt: 36 },
    { id: 9, title: 'Roxie', writer: 'Harvey', creDt: 65 },
  ];

function FreeBoard() {
    const classes = useStyles();

    return (
        <div style={{backgroundColor: blueGrey[800], width: '100%', height: '100%'}} >
            <br />
            
            <div style={{width:'90%', height:'75%', margin:'auto'}} className={classes.root}>
              <DataGrid rows={rows} columns={columns} pageSize={15}  />  
            </div>
            <br />
            <div style={{width:'90%', margin:'0 auto', textAlign:'end'}}>
                <Button variant="contained" color="primary" href="/free/write" > 글쓰기 </Button>
            </div>
        </div>
    )
}

export default FreeBoard
