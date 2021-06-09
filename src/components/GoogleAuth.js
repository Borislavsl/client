import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

const GoogleAuth = (props) => {

    useEffect(() => window.gapi.load(
        'client:auth2',
        () => window.gapi.client.init({
            clientId: '291483838108-96splmalhi83j1okodhvab4545lllukd.apps.googleusercontent.com',
            scope: 'email'
        })
            .then(() => {
                onAuthChange();
                authInstance().isSignedIn.listen(onAuthChange);
            })
    ),
        []);

    const authInstance = () => window.gapi.auth2.getAuthInstance();

    const onAuthChange = () => {
        const auth = authInstance();
        if (auth.isSignedIn.get()) {
            props.signIn(auth.currentUser.get().getId());
        }
        else {
            props.signOut();
        }
    }

    const onSignInClick = () => {
        authInstance().signIn();
    }

    const onSignOutClick = () => {
        authInstance().signOut();        
    }

    const renderAuthButton = () => {
        if (props.isSignedIn === null) {
            return null;
        } else if (props.isSignedIn) {
            return (
                <button onClick={onSignOutClick} className="ui red google button">
                  <i className="google icon" />
                  Sign Out
                </button>
            );
        } else {
            return (
                <button onClick={onSignInClick} className="ui red google button">
                  <i className="google icon" />
                  Sign In with Google
                </button>
            );
        }
    }

    return (
        <div>
            {renderAuthButton()}
        </div>
    );
};

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, { signIn, signOut})(GoogleAuth);