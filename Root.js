
import $ from 'jquery';
import React from 'react';
import { render } from 'react-dom'
import { Router, Route, Link, IndexRoute, History } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import About from './component/about';
import Concat from './component/concat';
import Result from './component/result';
import CustomMenu from './component/custom_menu';
import Trigger from './component/trigger';
import { DropdownButton, MenuItem,Button, Dropdown  } from 'react-bootstrap'


var Root = React.createClass({
  mixins: [History],
  
  getInitialState:function(){
        return {          
          titleMessage: '你好世界（来自state哦）',
          loginVisable: false,
          user:'',
        }
      },
  componentDidMount:function() {
    $.ajax({
      url: 'https://api.github.com/users/just4fun',
      dataType: 'json',
      type: 'GET',
 
      success: function(data) {
        //alert(username);
        console.info("username:"+ data.login);
        //this.setState({data: data});

      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  handleSearchClick: function(){
    var search_content = this.refs.search_content.value.trim();
    console.info("search_content = " + search_content);
    var _url = "https://api.douban.com/v2/book/search?q=keyword";
    var result_data;
    $.ajax({
      url:_url.replace("keyword",search_content),     
      dataType: 'jsonp',
      type: 'GET',
 
      success: function(data) {
        //alert(username);
        console.info("search:"+ data.books[0].title);
        console.info("search:"+ data.total);
        //this.setState({data: data});
        result_data = data;
        //this.context.router.push('/Result');
        this.state.titleMessage = data.books[0].title;
        //this.history.replaceState({title:data.books[0].title }, '/Result/{title:data.books[0].title}');
        var stateObject = { 'state' : data };
        this.history.push(
          {
            pathname: "/Result",
            search:'?the=search',
            state: stateObject
          }
          );
        
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
        
  },
  handleLoginClick: function(){        
    this.setState({ loginVisable: true});
        
  },
  handleLogoutClick: function(){    
    console.info("handleLogoutClick");
    this.setState({ user: ''});
        
  },
  onChildChanged: function(newState) {
        this.setState({ loginVisable: newState });
  },
  onUserChanged: function(newState) {
        console.info("onUserChanged: " + newState);
        this.setState({ user: newState });
        console.info("onUserChanged2: " + this.state.user);
  },
  render () {
    return (
      <div className="container">
        <div className="head">
          <ul className="head_navi">
            <li><Link to="/about">&nbsp;&nbsp;About&nbsp;&nbsp;</Link></li>
            <li><Link to="/concat">&nbsp;&nbsp;Concat&nbsp;&nbsp;</Link></li>
            <li><Link to="/users/ryan">&nbsp;&nbsp;Users&nbsp;&nbsp;</Link></li>    
          </ul>
          <div className="head_search">
            <input className="seach_field" type="text" placeholder="What r u looking for?" ref="search_content" />
            <button className="search_btn" onClick={this.handleSearchClick} >Search <i className="fa fa-search fa-1x"></i></button> 
          </div>
          <div className="head_help"><i className="fa fa-question-circle fa-1.5x"></i></div>
          <div className="head_user">
            <ul>
              <li><i className="fa fa-user fa-1.5x"></i> 
                <ul className="user_submenu">
                  <li><a href="#" className="hvr-underline-from-center">Login</a></li>
                  <li><a href="#" className="hvr-underline-from-center">Register</a></li>
                </ul>
              </li>           
            </ul>              
          </div>          
          <Dropdown id="bg-vertical-dropdown-3"  bsSize="small" bsClass="test123" >
            <Button  bsRole="toggle" >
              My Account
            </Button>            
            <CustomMenu bsRole="menu">
              { (this.state.user!=='' ) &&
                 
                <div className="userItem">
                <h5 >hi {this.state.user} </h5>
                <MenuItem eventKey="1">My Favorite</MenuItem>
                <MenuItem eventKey="2" onClick={this.handleLogoutClick}>Logout</MenuItem> 
                </div>
              ||
                <div className="userItem">
                <MenuItem eventKey="1" onClick={this.handleLoginClick}>Login</MenuItem>
                <MenuItem eventKey="2">Register</MenuItem>
                </div>
              }

              
            </CustomMenu>  

          </Dropdown>   
          
        </div> 
        <div className="primarysidebar">
          <ul className="navi_sidebar">
            <li><i className="fa fa-tachometer fa-2x"></i>  <Link to="/Dashboard">&nbsp;Dashboard&nbsp;</Link></li>
            <li><i className="fa fa-pie-chart fa-2x"></i>  <Link to="/Charts">&nbsp;Charts&nbsp;</Link></li>
            <li><i className="fa fa-bars fa-2x"></i>  <Link to="/Result">&nbsp;Charts&nbsp;</Link></li>               
          </ul>
        </div>     
        <div className="main">
          {this.props.children}
          <Trigger visable={this.state.loginVisable} callbackParent={this.onChildChanged} user={this.state.user} callbackParent_root={this.onUserChanged}/>
        </div>        
      </div>      
    );
  }
});

class Users extends React.Component {
  render() {
    return (
      <div>
        <h2>Users</h2>
        {this.props.children}
      </div>
    )
  }
}

class UsersIndex extends React.Component {
  render() {
    return (
      <div>
        <h3>UsersIndex</h3>
      </div>
    )
  }
}

class User extends React.Component {
  render() {
    return (
      <div>
        <h3>User {this.props.params.id}</h3>
      </div>
    )
  }
}


render((
  <Router history={createBrowserHistory()}>
    <Route path="/" component={Root}>
      <Route path="about" component={About} />
      <Route path="concat" component={Concat} />
      <Route path="users" component={Users}>
        <IndexRoute component={UsersIndex}/>
        <Route path=":id" component={User}/>
      </Route>
      <Route path="result" component={Result}/> 
      <Route path="/result/:title" component={Result}/> 
    </Route>
  </Router>
), document.body)
/*
const About = React.createClass({
  render() {
    return <h3>children About</h3>
});

const routes = {
  path: '/',
  component: Root,
  childRoutes: [
    { path: 'about', component: About },
    
  ]
}

ReactDom.render(<Router routes={routes} />, document.body)  }
*/

        /*
        <p className={styles.test}>Hi there!</p> 
                    
        <input type="text" placeholder="User name" ref="uname" />
        <input type="password" placeholder="Password" ref="pwd"/>
        <MyButton textlabel='Login' />
        <MyButton textlabel='Register'  />
        <TodoApp/>
        */