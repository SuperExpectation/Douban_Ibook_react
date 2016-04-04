import React from 'react';
import { Router, Route, Link, IndexRoute, History } from 'react-router'
import BookItem from './bookitem';


 var BookList = React.createClass({
  getDefaultProps:function(){
      return {
          data: [],
      }
  },
 	componentWillMount(){
		console.debug(this.props.data);
 		console.info("child param  state: "+ this.props.data[0].title);
 		//console.log("child my object: %o",this.props.data);
 	},

 	
	render () { 
		var bookItem = [];
		this.props.data.forEach(function(bookObj,index){
			bookItem.push(
				<BookItem book={bookObj}/>
			)
		});
		
		return (
			<div className='main-section__book'>
				<div>{bookItem}</div>
			</div>
		)
	} 
 });
 
export default BookList;