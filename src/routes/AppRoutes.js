import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import constants from '../components/utils/config/config';
import strings from '../components/utils/App.json';

export const AppRoutes = () => {
    const nav = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        const usertoken = localStorage.getItem(constants.localStorage.userToken);
        const adminToken = localStorage.getItem(constants.localStorage.adminToken);
        if (usertoken && location.pathname === constants.navigationLink.loginLink) {
            nav(constants.navigationLink.UserDashboard);
        }else if (adminToken && location.pathname === constants.navigationLink.loginLink) {
            nav(constants.navigationLink.AdminDAshboard);
        }else if (!usertoken && location.pathname === constants.navigationLink.UserDashboard) {
            nav(constants.navigationLink.loginLink);
        }else if (!usertoken && location.pathname === strings.notifications) {
            nav(constants.navigationLink.loginLink);
        }else if (!usertoken && location.pathname === strings.calendar) {
            nav(constants.navigationLink.loginLink);
        }else if (!adminToken && location.pathname === constants.navigationLink.AdminDAshboard) {
            nav(constants.navigationLink.loginLink);
        }
    }, [location.pathname, nav]);

    return null;
};
