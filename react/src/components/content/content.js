import React from 'react';
import './content.css';



export default class Content extends React.Component{
  constructor(props){
    super(props)

    this.escOnClick= this.escOnClick.bind(this)
  }
  componentDidMount(){
    document.addEventListener("keydown", this.escOnClick, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.escOnClick, false);
  }
  escOnClick(event){
    if(event.keyCode === 27) {
      //Do whatever when esc is pressed
      this.props.history.push('/ChatRoom')
    }
  }
  render(){
    return (
      <div className = "content-container">
        <div className = "content-chat">
        </div>
      </div>
    );
  }
}
