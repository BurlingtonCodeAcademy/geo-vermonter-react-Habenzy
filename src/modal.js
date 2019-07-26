import React from 'react'

class Modal extends React.Component {
  render() {
    if(this.props.modalDisplayed) {
      return(
        <div id="modal">
          A bunch of stuff
        </div>
        )
      } else {
        return <div />
      }
  }
}

export default Modal