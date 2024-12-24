import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';

const PrivateRoutes = ({children}) => {
    const {loading, user} = useContext(AuthContext);
    const navigate = useNavigate();
    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <ReactLoading type="spinningBubbles" color="#000" height={50} width={50} />
            </div>
        );
    }
    if (user){
        return (
            children
        );
    }
    else{
        return (
            navigate('/login')
        )
    }
};

export default PrivateRoutes;