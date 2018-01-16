import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Payments from './Payments'

import * as actions from '../actions'

class Header extends Component {
  renderContent () {
    switch (this.props.auth) {
      case null:
        return
      case false:
        return [
          <li key='1'>
            <a href='/auth/google'>Sign With Google</a>
          </li>,
          <li key='2'>
            <a href='/auth/facebook'>Sign With Facebook</a>
          </li>
        ]
      default:
        return [
          <li key='3'>
            <Payments />
          </li>,
          <li key='4' style={{ margin: '0 10px' }}>
            Credits: { this.props.auth.credits }
          </li>,
          <li key='5'>
            <a href='/api/logout'>Logout</a>
          </li>
        ]
    }
  }

  render () {
    return (
      <nav>
        <div className='nav-wrapper'>
          <Link
            to={this.props.auth ? '/surveys' : '/'}
            className='left brand-logo'
          >
            Emaily
          </Link>

          <ul className='right'>
            { this.renderContent() }
          </ul>

        </div>
      </nav>
    )
  }
}

function mapStateToProps ({ auth }) {
  return { auth }
}

export default connect(mapStateToProps, actions)(Header)
