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
                    <Grid item xs={12} md={12} lg={4}>
                        <Box
                            p='4px'
                            boxSizing='border-box'
                            height={1}
                            width={1}
                            component='section'
                            position='relative'
                        >
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
