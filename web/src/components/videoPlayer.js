import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import ReactDom from 'react-dom'

class videoPlayer extends Component {
    render() {
        return (ReactDom.createPortal(
            <ReactPlayer width="auto"
            height={272} controls={true} url="https://www.youtube.com/watch?v=dGKoYqYMJL8&ab_channel=ArmaanProductions"/>,document.getElementById('vp')
        )
        )
    }
}

export default videoPlayer
