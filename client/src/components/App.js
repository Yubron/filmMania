import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import PhotoBoard from "./views/Board/PhotoBoard.js"
import FreeBoard from "./views/Board/FreeBoard.js"
import BoardWrite from "./views/Board/WritePage/BoardWrite.js"
import QnaBoard from "./views/Board/QnaBoard.js"
import BuyBoard from "./views/Market/BuyBoard.js"
import SellBoard from "./views/Market/SellBoard.js"
import DetailBoard from "./views/Board/DetailBoard.js"

import Header from "./views/Header/Header"
import Navbar from "./views/Navbar/Navbar"
import Footer from "./views/Footer/Footer"
import RightNavbar from "./views/Navbar/RightNavbar"
import { blueGrey } from '@material-ui/core/colors'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';





//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#77AAAD',
      contrastText: "#fff",   
    },
    secondary: {
      main: '#D8E6E7'
    },
    
  }, 
  
});

function App() {
  return (
    <SnackbarProvider> 
      <MuiThemeProvider theme={theme}>
        <div style={{width: '100%', height: 'calc(100vh + 80px)', backgroundColor: blueGrey[900], color: 'white'}}>
        <Suspense fallback={(<div>Loading...</div>)}>
          <div style={{ width: '75%', height: 'calc(100vh - 80px)', margin: '0 auto 0 auto', backgroundColor: blueGrey[900] }}>
            <Header />
            <div style={{ display: 'flex', height: '100%', backgroundColor: blueGrey[900] }}>
              <Navbar />
              <div style={{ width: '65%', height: '100%', margin: '0 auto auto auto', backgroundColor: blueGrey[900] }}>
                <Switch>
                  <Route exact path="/" component={Auth(LandingPage, null)} />
                  <Route exact path="/register" component={Auth(RegisterPage, null)} />
                  <Route exact path="/board/photo" component={Auth(PhotoBoard, null)} />
                  <Route exact path="/board/free" component={Auth(FreeBoard, null)} />
                  <Route exact path="/board/qna" component={Auth(QnaBoard, null)} />
                  <Route exact path="/board/:postType/write" component={Auth(BoardWrite, true)} />
                  <Route exact path="/board/:postType/:postId" component={Auth(DetailBoard, true)} />
                  <Route exact path="/buy" component={Auth(BuyBoard, null)} />
                  <Route exact path="/sell" component={Auth(SellBoard, null)} />
                </Switch>
              </div>
              <RightNavbar />
            </div>
            <Footer />
          </div>

        </Suspense>
      </div>  
    </MuiThemeProvider>
  </SnackbarProvider>
  );
}

export default App;
