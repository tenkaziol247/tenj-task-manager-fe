import { Box, Grid, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { Calendar } from './components/Calendar';

import { TodoList } from './components/TodoList';
import { generateBackground } from './utils/utilities';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        height: '100%',
        alignItems: 'stretch',
    },
}));

export const Home: React.FC = () => {
    const classes = useStyles();
    return (
        <main>
            <Box
                className={['home', generateBackground()].join(' ')}
                height={1}
            >
                <Grid container className={classes.root}>
                    <Grid item xs={undefined} md={7} lg={8}>
                        <Box
                            boxSizing='border-box'
                            p='4px'
                            width={1}
                            height={1}
                            component='section'
                        >
                            <Calendar />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={5} lg={4}>
                        <Box
                            p='4px'
                            boxSizing='border-box'
                            height={1}
                            width={1}
                            component='section'
                        >
                            <TodoList />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </main>
    );
};
