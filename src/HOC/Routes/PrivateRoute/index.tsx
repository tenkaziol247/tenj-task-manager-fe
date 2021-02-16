import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { IRouteProp } from '../routes.type';

import { TRootState } from '../../../store';

export const PrivateRoute: React.FC<IRouteProp> = ({
    component: Component,
    special,
    ...restProps
}) => {
    const { uid } = useSelector((state: TRootState) => state.auth);

    return (
        <Route
            {...restProps}
            render={(props) =>
                uid ? <Component {...props} /> : <Redirect to='/auth/signin' />
            }
        />
    );
};
