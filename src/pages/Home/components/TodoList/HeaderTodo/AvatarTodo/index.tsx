import React, { useState } from 'react';
import {
    Box,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Paper,
    Popover,
    Theme,
} from '@material-ui/core';
import { ExitToApp, Person } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { TRootState } from '../../../../../../store';
import { TransitionsModal } from '../../../../../../components/TransitionModal';
import { Profile } from '../../../ModalScreen/Profile';

const useStyles = makeStyles((theme: Theme) => ({
    avatar: {
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
}));

export const AvatarTodo: React.FC = () => {
    const classes = useStyles();
    const [anchorEle, setAnchorEle] = useState<HTMLButtonElement | null>(null);
    const [openProfile, setOpenProfile] = useState<boolean>(false);

    const { avatar, loadingAvatar } = useSelector(
        (state: TRootState) => state.user,
    );

    const handleOpenPopover = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEle(e.currentTarget);
    };

    const handleClosePopver = () => {
        setAnchorEle(null);
    };

    const history = useHistory();

    const handleLogoutClick = () => {
        history.push('/logout');
    };

    const handleOpenProfile = () => {
        setOpenProfile(true);
        setAnchorEle(null);
    };

    const handleCloseProfile = () => {
        setOpenProfile(false);
    };

    const renderAvatar = () => {
        if (loadingAvatar) {
            return <span className='circle--skeleton'></span>;
        } else if (avatar) {
            return (
                <img
                    src={avatar.url}
                    alt='avatar'
                    style={{ width: '100%', height: '100%' }}
                />
            );
        } else {
            return <div className='avatar--default'></div>;
        }
    };

    const isOpen = Boolean(anchorEle);
    const id = isOpen ? 'avatarTodo__popover' : undefined;

    return (
        <div className='avatarTodo'>
            <IconButton onClick={handleOpenPopover} size='small'>
                <Box className={classes.avatar}>{renderAvatar()}</Box>
            </IconButton>
            <Popover
                id={id}
                open={isOpen}
                anchorEl={anchorEle}
                onClose={handleClosePopver}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Paper variant='outlined'>
                    <List component='nav'>
                        <ListItem button onClick={handleOpenProfile}>
                            <ListItemIcon>
                                <Person />
                            </ListItemIcon>
                            <ListItemText primary='See your profile' />
                        </ListItem>
                        <ListItem button onClick={handleLogoutClick}>
                            <ListItemIcon>
                                <ExitToApp />
                            </ListItemIcon>
                            <ListItemText primary='Log out' />
                        </ListItem>
                    </List>
                </Paper>
            </Popover>
            <TransitionsModal
                open={openProfile}
                handleCloseModal={handleCloseProfile}
            >
                <Profile />
            </TransitionsModal>
        </div>
    );
};
