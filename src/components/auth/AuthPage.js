import React, { useState } from 'react';
import SignIn from './LogIn';
import { useAuth } from '../../utils/AuthContext';
import SignUp from './SignUp';

const AuthPage = () => {
    const [customDisplayName, setCustomDisplayName] = useState(null);
    const { authUser, signOutUser, updateDisplayName } = useAuth();

    const signOut = async () => {
        await signOutUser();
    };

    const updateName = async (e) => {
        // e.preventDefault(); // comment to immediately see new name on Nav

        await updateDisplayName(customDisplayName);

        e.target.reset();
    }

    return (
        <div>
            { authUser ? (
                <>
                    <form onSubmit={updateName}>
                        <label>
                            Display Name
                            <input type="text" name="name" onChange={(e) => setCustomDisplayName(e.target.value)} />
                        </label>
                        <button type='submit'>Change</button>
                    </form>
                    <button onClick={signOut}>Sign Out</button>
                </>) : (
                <>
                    <SignIn />
                    <SignUp />
                </>)
            }
        </div>
    );
};

/** TODO: 
 * Separate SignIn and SignUp pages
 * Implement form validation
 */

export default AuthPage;