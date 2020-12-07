import React, { useEffect, useState, forwardRef } from 'react'
import { blueGrey } from '@material-ui/core/colors'
import { Button } from '@material-ui/core'
import Axios from 'axios';
import { BrowserRouter as Router, Link } from "react-router-dom";

import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

function QnaBoard() {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    Axios.get("/api/post/qna")
      .then(response => {
        if (response.data.success) {
          setPosts(response.data.posts);
        } else {
          alert('질문게시판을 불러오는데 실패했습니다.')
        }
      });
  }, [])

  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, posts.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
    <div style={{ backgroundColor: blueGrey[800], width: '100%', height: '100%', borderRadius:'10px' }} >
      <br />

      <div style={{ width: '95%', height: '85%', margin: 'auto' }}>
        <h2>질문게시판</h2>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                  <TableCell style={{ width: '5%' }}>
                    no
                  </TableCell>
                  <TableCell style={{ width: '75%', textAlign:'center'  }}>
                    제목
                  </TableCell>
                  <TableCell style={{ width: '10%', textAlign:'center' }}>
                    작성자
                  </TableCell>
                  <TableCell style={{ width: '10%', textAlign:'center'  }}>
                    열람수
                  </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : posts
              ).map((row) => (
                <TableRow key={row.postId}>
                  <TableCell component="th" scope="row">
                    {row.postId}
                  </TableCell>
                  <TableCell style={{ width: 160, maxWidth:160, overflow: 'auto' }} align="left">
                  <Link to={{
                      pathname : `/board/qna/${row.postId}`,
                  }} style={{color: "black"}}>
                    {row.title}
                  </Link>
                  </TableCell>
                  <TableCell style={{ width: 160, maxWidth:160, overflow: 'auto'}} align="center">
                      {row.writer.nickname}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    {row.views}
                  </TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={1} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10]}
                  colSpan={4}
                  count={posts.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
      <br /><br />
      <div style={{ width: '95%', margin: '0 auto', textAlign: 'end' }}>
        <Link to={{
          pathname : `/board/qna/write`,
          state : {
            postType: 'qna'
          }
        }}>
          <Button variant="contained" color="primary"> 글쓰기 </Button>
        </Link>
      </div>
    </div>
  )
}

export default QnaBoard
