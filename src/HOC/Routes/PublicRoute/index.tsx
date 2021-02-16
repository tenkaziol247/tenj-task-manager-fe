import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { TRootState } from '../../../store';

import { IRouteProp } from '../routes.type';

export const PublicRoute: React.FC<IRouteProp> = ({
    component: Component,
    special,
    ...restProps
}) => {
    const { uid } = useSelector((state: TRootState) => state.auth);

    return (
        <Route
            {...restProps}
            render={(props) =>
                uid && special ? <Redirect to='/' /> : <Component {...props} />
            }
        />
    );
};
