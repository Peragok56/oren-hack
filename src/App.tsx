// React
import React from 'react';
// Styles
import './App.css';
// HOC
import Layout from './hoc/layout';
// react-router-dom
import {Switch, Route} from 'react-router-dom'

// Pages
import Main from './pages/main/main';
import SignIn from './pages/auth/signIn/signIn';
import SignUp from './pages/auth/signUp/signUp';
import UserMain from './pages/user/main/main';
import Header from './components/Header/Header';
import TestCreator from './pages/companyRepresentative/testCreate/TestCreate';
import UserProfile from './pages/user/profile/Profile';
import CompanyRepresentativMain from './pages/companyRepresentative/Main/Main';
import CompanyRepresentatiHeader from './components/CompanyRepresentatiHeader/CompanyRepresentatiHeader';
import CompanyRepresentativUsers from './pages/companyRepresentative/Users/Users';
import CompanyRepresentativProfile from './pages/companyRepresentative/Profile/Profile';
import CompanyRepresentatiTest from './pages/companyRepresentative/Tests/Test';
import CompanyRepresentatiTestCreator from './pages/companyRepresentative/testCreate/TestCreate';
import Professions from './pages/companyRepresentative/Professions/Professions';
import UserTests from './pages/user/test/Tests';
import TestTaker from './pages/user/Testjoin/TestJoin';
import Chat from './pages/user/chats/Chat';
import TestStatic from './pages/companyRepresentative/TestStatic/TestStatic';
import Education from './pages/companyRepresentative/Education/Education';
import ViewUserTestResult from './pages/companyRepresentative/ViewUserTestResult/ViewUserTestResult';

function App() {

  function router(role: any){
    console.log(role);
    switch(role){
      case 'adminPortal':
        return (
          <Layout>
              <CompanyRepresentatiHeader />
              <Switch>
                <Route path={'/view-user-test'} exact component={ViewUserTestResult}/>
                <Route path={'/company-representativ-education'} exact component={Education}/>
                <Route path={'/user-chat'} exact component={Chat}/>
                <Route path={'/test-static'} exact component={TestStatic}/>
                <Route path={'/company-representativ-professions'} exact component={Professions}/>
                <Route path={'/company-representativ-test-create'} exact component={CompanyRepresentatiTestCreator}/>
                <Route path={'/company-representativ-tests'} exact component={CompanyRepresentatiTest}/>
                <Route path={'/company-representativ-profile'} exact component={CompanyRepresentativProfile}/>
                <Route path={'/company-representativ-users'} exact component={CompanyRepresentativUsers}/>
                <Route path={'/company-representativ-main'} exact component={CompanyRepresentativMain}/>
              </Switch>
            </Layout>
        );
      case 'HR-meneger':
        return (
          <Layout>
              <CompanyRepresentatiHeader />
              <Switch>
                <Route path={'/view-user-test'} exact component={ViewUserTestResult}/>
                <Route path={'/company-representativ-education'} exact component={Education}/>
                <Route path={'/user-chat'} exact component={Chat}/>
                <Route path={'/test-static'} exact component={TestStatic}/>
                <Route path={'/company-representativ-professions'} exact component={Professions}/>
                <Route path={'/company-representativ-test-create'} exact component={CompanyRepresentatiTestCreator}/>
                <Route path={'/company-representativ-tests'} exact component={CompanyRepresentatiTest}/>
                <Route path={'/company-representativ-profile'} exact component={CompanyRepresentativProfile}/>
                <Route path={'/company-representativ-users'} exact component={CompanyRepresentativUsers}/>
                <Route path={'/company-representativ-main'} exact component={CompanyRepresentativMain}/>
              </Switch>
            </Layout>
        );
        case 'companyRepresentative':
          return (
            <Layout>
              <CompanyRepresentatiHeader />
              <Switch>
                <Route path={'/view-user-test'} exact component={ViewUserTestResult}/>
                <Route path={'/company-representativ-education'} exact component={Education}/>
                <Route path={'/user-chat'} exact component={Chat}/>
                <Route path={'/test-static'} exact component={TestStatic}/>
                <Route path={'/company-representativ-professions'} exact component={Professions}/>
                <Route path={'/company-representativ-test-create'} exact component={CompanyRepresentatiTestCreator}/>
                <Route path={'/company-representativ-tests'} exact component={CompanyRepresentatiTest}/>
                <Route path={'/company-representativ-profile'} exact component={CompanyRepresentativProfile}/>
                <Route path={'/company-representativ-users'} exact component={CompanyRepresentativUsers}/>
                <Route path={'/company-representativ-main'} exact component={CompanyRepresentativMain}/>
                <Route path={'/'} exact component={Main}/>
              </Switch>
            </Layout>
          );
      case 'user':
        return (
          <Layout>
            <Header />
            <Switch>
              <Route path={'/user-chat'} exact component={Chat}/>
              <Route path={'/test-taker'} exact component={TestTaker}/>
              <Route path={'/test-creator'} exact component={TestCreator}/>
              <Route path={'/user-tests'} exact component={UserTests}/>
              <Route path={'/user-main'} exact component={UserMain}/>
              <Route path={'/user-profile'} exact component={UserProfile}/>
            </Switch>
          </Layout>
        );
      case null:
        return(
          <Layout>
              <Route path={'/signUp'} exact component={SignUp}/>
              <Route path={'/signIn'} exact component={SignIn}/>
              <Route path={'/'} exact component={Main}/>
          </Layout>
        )
        default: 
        break
        }}

  return (
    <>
      {router(localStorage.getItem('role'))}
    </>
  );
}

export default App;
