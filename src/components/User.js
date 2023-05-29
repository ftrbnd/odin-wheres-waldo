import React from 'react';
import { auth } from '../utils/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const User = () => {
    return (
        <div>
            {
                auth.currentUser ? (
                    <>
                        <h2>{auth.currentUser.displayName || 'Hello'}</h2>
                        {
                            auth.currentUser.photoURL ? (
                                <img src={auth.currentUser.photoURL} alt='custom user avatar' />
                            ) : (
                                <FontAwesomeIcon icon={faUser} />
                            )
                        }
                    </>
                ) : (
                    <button>Sign In</button>
                )
            }
        </div>
    );
};

export default User;
