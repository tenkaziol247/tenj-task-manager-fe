import {
    Box,
    Grid,
    IconButton,
    makeStyles,
    Slide,
    Theme,
} from '@material-ui/core';
import { ArrowLeft, ArrowRight } from '@material-ui/icons';
import React, { useState } from 'react';
import { Calendar } from './components/Calendar';

import { TodoList } from './components/TodoList';
import { generateBackground } from './utils/utilities';

interface StyleProps {
    isLayerCalendar: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        height: '100%',
        alignItems: 'stretch',
    },
    gridItem: {
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    switch: {
        position: 'absolute',
        left: (props: StyleProps) =>
            props.isLayerCalendar ? 'calc(100% - 64px)' : 24,
        bottom: 30,
        borderRadius: '50%',
        backgroundColor: theme.palette.info.main,
        opacity: 0.6,
        [theme.breakpoints.up('lg')]: {
            display: 'none',
        },
        transition: 'left 1.5s ease, opacity 0.3s ease-out',
    },
    box: {
        boxSizing: 'border-box',
        padding: '4px',
        width: '100%',
        height: '100%',
        position: 'relative',
        [theme.breakpoints.down('xs')]: {
            padding: 0,
        },
    },
}));

export const Home: React.FC = () => {
    const [isLayerCalendar, setIsLayerCalendar] = useState<boolean>(false);
    const classes = useStyles({ isLayerCalendar });

    const handleLayerCalendar = () => {
        setIsLayerCalendar((prev) => !prev);
    };

    return (
        <main>
            <Box
                className={['home', generateBackground()].join(' ')}
                height={1}
            >
                <Grid container className={classes.root}>
                    <Grid
                        item
                        md={undefined}
                        lg={8}
                        className={classes.gridItem}
                    >
                        <Box className={classes.box} component='section'>
                            <Calendar />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={12} lg={4}>
                        <Box className={classes.box} component='section'>
                            <Calendar isLayerCalendar={isLayerCalendar} />
                            <TodoList isLayerCalendar={isLayerCalendar} />
                            <Box className={classes.switch}>
                                <IconButton
                                    size='small'
                                    onClick={handleLayerCalendar}
                                >
                                    {isLayerCalendar ? (
                                        <ArrowRight fontSize='large' />
                                    ) : (
                                        <ArrowLeft fontSize='large' />
                                    )}
                                </IconButton>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </main>
    );
};
