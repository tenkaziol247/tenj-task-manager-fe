import React from 'react';
import { Switch } from 'react-router-dom';
import { IRoute } from '../../pages/routes';

import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

interface Props {
    routes: IRoute[];
    handleSwitchTheme: () => void;
}

export const Routes: React.FC<Props> = ({ routes, handleSwitchTheme }) => {
    return (
        <Switch>
            {routes.map(
                ({ routePublic, ...restProps }, index): JSX.Element => {
                    if (!routePublic) {
                        return (
                            <PrivateRoute
                                key={index}
                                {...restProps}
                                handleTheme={handleSwitchTheme}
                            />
                        );
                    } else {
                        return <PublicRoute key={index} {...restProps} />;
                    }
                },
            )}
        </Switch>
    );
};
