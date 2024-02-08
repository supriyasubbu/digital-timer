// Write your code here

import {Component} from 'react'

import './index.css'

const initialState = {
  isTimerRunning: false,
  isTimerInSeconds: 0,
  isTimerLimitInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecreaseTimerInMinutes = () => {
    const {isTimerLimitInMinutes} = this.state

    if (isTimerLimitInMinutes > 1) {
      this.setState(prevState => ({
        isTimerLimitInMinutes: prevState.isTimerLimitInMinutes - 1,
      }))
    }
  }

  onIncreaseTimerInMinutes = () =>
    this.setState(prevState => ({
      isTimerLimitInMinutes: prevState.isTimerLimitInMinutes + 1,
    }))

  renderTimerLimitController = () => {
    const {isTimerInSeconds, isTimerLimitInMinutes} = this.state
    const buttonDisabled = isTimerInSeconds > 0

    return (
      <div className="timer-limit-controller-container">
        <p className="timer-label">Set Timer Limit</p>
        <div className="timer-control-buttons">
          <button
            className="limit-button"
            type="button"
            onClick={this.onDecreaseTimerInMinutes}
            disabled={buttonDisabled}
          >
            -
          </button>
          <div className="timer-limit-value-container">
            <p className="label-value">{isTimerLimitInMinutes}</p>
          </div>
          <button
            className="limit-button"
            type="button"
            onClick={this.onIncreaseTimerInMinutes}
            disabled={buttonDisabled}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onResetTime = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimeInSeconds = () => {
    const {isTimerInSeconds, isTimerLimitInMinutes} = this.state
    const isTimerComplete = isTimerInSeconds === isTimerLimitInMinutes * 60

    if (isTimerComplete) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        isTimerInSeconds: prevState.isTimerInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {isTimerRunning, isTimerInSeconds, isTimerLimitInMinutes} = this.state
    const isTimerComplete = isTimerInSeconds === isTimerLimitInMinutes * 60

    if (isTimerComplete) {
      this.setState({isTimerInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const startOrPauseButtonsUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseButtonsAltText = isTimerRunning
      ? 'pause icon'
      : ' play icon'

    return (
      <div className="timer-controller-container">
        <button
          type="button"
          onClick={this.onStartOrPauseTimer}
          className="timer-controller-btn"
        >
          <img
            src={startOrPauseButtonsUrl}
            alt={startOrPauseButtonsAltText}
            className="timer-controller-icon"
          />
          <p className="timer-controller-label">
            {isTimerRunning ? 'Pause' : 'Start'}
          </p>
        </button>
        <button
          type="button"
          onClick={this.onResetTime}
          className="timer-controller-btn"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="timer-controller-icon"
          />
          <p className="timer-controller-label">Reset</p>
        </button>
      </div>
    )
  }

  getTheTimeInTimeFormat = () => {
    const {isTimerInSeconds, isTimerLimitInMinutes} = this.state
    const totalRemainingSeconds = isTimerLimitInMinutes * 60 - isTimerInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifyMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifySeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifyMinutes}:${stringifySeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'
    return (
      <div className="app-container">
        <h1>Digital Timer</h1>
        <div className="timer-container">
          <div className="digital-timer-container">
            <div className="digital-container">
              <h1 className="time">{this.getTheTimeInTimeFormat()}</h1>
              <p className="timer-state">{labelText}</p>
            </div>
          </div>
          <div className="control-buttons-container">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
