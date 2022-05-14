// import React from 'react';
// import { Switch, Route, Link, Router } from 'react-router-dom';
// import { Layout, Typography, Space } from 'antd';
// import Sidebar from './Sidebar';
// import Dashboard from './Dashboard';
// import ChartComponent from './ChartComponent';
import { Provider } from 'react-redux';
import store from './store';

const Charts = ({match}) => {
  return (
    <Provider store={store}>
      {/* <div className="charts__app">
        <Sidebar match={match}/>
        <div className="charts__main">
          <Route exact path="/charts" component={Dashboard} />
          <Route path="/charts/:tickerId" component={ChartComponent} />
        </div>
        <div className="footer"></div>
      </div> */}
    </Provider>
  )
}

export default Charts