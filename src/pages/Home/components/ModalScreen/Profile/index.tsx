import { Box, Grid, makeStyles, Paper, Theme } from '@material-ui/core';
import React from 'react';

import { AvatarForm } from './AvatarForm';
import { UserForm } from './UserForm';

interface Props {}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
        width: 300,
        [theme.breakpoints.up('md')]: {
            width: 700,
        },
    },
    gridContainer: {
        marginTop: theme.spacing(4),
    },
    box: {
        borderLeft: `1px solid ${theme.palette.text.secondary}`,
        [theme.breakpoints.down('sm')]: {
            borderLeftWidth: 0,
        },
    },
}));

export const Profile: React.FC<Props> = (props) => {
    const classes = useStyles();
    return (
        <Paper>
            <Box className={classes.root}>
                <Grid container className={classes.gridContainer}>
                    <Grid item xs={12} md={3}>
                        <AvatarForm />
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Box className={classes.box}>
                            <UserForm />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};
