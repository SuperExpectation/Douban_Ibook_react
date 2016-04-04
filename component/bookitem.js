import React from 'react';
import { Router, Route, Link, IndexRoute, History } from 'react-router'

 var BookItem = React.createClass({
  propTypes:{
	  book: React.PropTypes.object.isRequired,
  },
  
  getDefaultProps:function(){
      return {
        book: {},
      }
  },
 	componentWillMount(){
 		/*
		console.debug(this.props.book);
 		console.info("item param  pic_src: "+ this.props.book.image);
 		console.info("item param  title: "+ this.props.book.title);
		console.info("item param  subtitle: "+ this.props.book.subtitle);
		console.info("item param  author: "+ this.props.book.author);
		console.info("item param  pubisher: "+ this.props.book.pubisher);
		console.info("item param  price: "+ this.props.book.price);
		*/
 	},

 	
	render () { 
		return (
			<div className='main-section__bookitem'>
				<Link to='book-detail'  className='main-section__book-info clearfix'>          
				  <div className='pull-left'>
					<img className='main-section__book-info--img' src={this.props.book.image}/>
				  </div>
				  <div className='main-section__book-info--description'>
					<div className='main-section__book-info--title'>{this.props.book.title}<small>{this.props.book.subtitle}</small></div>
					<div>{this.props.book.author} {this.props.book.pubisher}  {this.props.book.price}</div>
				  </div>
				</Link>        
			</div>
		)
	} 
 });
 
export default BookItem;