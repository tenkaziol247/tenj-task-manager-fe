import React, { useContext, useEffect, useState } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import {
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    makeStyles,
    Paper,
    Popover,
    Switch,
    Theme,
} from '@material-ui/core';
import { Brightness4 } from '@material-ui/icons';

import { ThemeContext } from '../../../../../../App';

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        paddingLeft: 8,
        display: 'flex',
        alignItems: 'center',
    },
    list: {
        width: 210,
    },
    icon: {
        minWidth: 30,
    },
}));

export const SettingTodo: React.FC = () => {
    const classes = useStyles();
    const [anchorEle, setAnchorEle] = useState<HTMLButtonElement | null>(null);
    const [checked, setChecked] = useState<boolean>(false);

    const theme = useContext(ThemeContext);

    useEffect(() => {
        if (theme.isLightTheme) {
            setChecked(false);
        } else {
            setChecked(true);
        }
    }, [theme]);

    const handleOpenPopover = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEle(e.currentTarget);
    };

    const handleClosePopover = () => {
        setAnchorEle(null);
    };

    const isOpen = Boolean(anchorEle);
    const id = isOpen ? 'settingTodo__popover' : undefined;

    return (
        <div className='settingTodo'>
            <IconButton size='small' onClick={handleOpenPopover}>
                <SettingsIcon />
            </IconButton>
            <Popover
                id={id}
                open={isOpen}
                anchorEl={anchorEle}
                onClose={handleClosePopover}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <Paper className={classes.paper} variant='outlined'>
                    <List className={classes.list}>
                        <ListItem>
                            <ListItemIcon className={classes.icon}>
                                <Brightness4 />
                            </ListItemIcon>
                            <ListItemText primary='Dark mode: ' />
                            <ListItemSecondaryAction>
                                <Switch
                                    checked={checked}
                                    onChange={theme.handleSwitchTheme}
                                    name='theme'
                                    color='secondary'
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                </Paper>
            </Popover>
        </div>
    );
};
