import React from 'react';
import { useAuth } from '../utils/AuthContext';

const UserDetails = () => {
    const { signOutUser } = useAuth();

    const signOut = async () => {
        await signOutUser();
    }

    return (
        <div>
            User Details Component
            <button onClick={signOut}>Sign Out</button>
        </div>
    );
};

export default UserDetails;
