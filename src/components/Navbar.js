import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

//material ui 
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

class Navbar extends Component {
    render() {
        const {authenticated} = this.props
        return (
            <AppBar>
                <Toolbar className='nav-container'>
                    {authenticated ?(
                        <Fragment>
                            <Tooltip 
                        </Fragment>
                    ): (

                        <Fragment>
                  <Button color="inherit" component={Link} to='/login'>
                        Login
                    </Button>

                    <Button color="inherit" component={Link} to='/'>
                        Home
                    </Button>

                    <Button color="inherit" component={Link} to='/signup'>
                        Signup
                    </Button>
                            
                        <Fragment/>
                    )}

                </Toolbar>
            </AppBar>
        )
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
} 

const mapSateToProps = state => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar)
