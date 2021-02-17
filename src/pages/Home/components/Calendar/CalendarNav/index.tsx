import {
    Box,
    IconButton,
    makeStyles,
    TableCell,
    TableRow,
    Theme,
    Typography,
} from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import React from 'react';

interface Props {
    momentContext: moment.Moment;
    handleNext: () => void;
    handlePrev: () => void;
    isShowMonthLayer?: boolean;
    toggleMonthLayer?: (value: boolean) => void;
}

interface StyleProps {
    isShowMonthLayer: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        '& .MuiTableCell-root': {
            padding: '0px 16px 16px',
            [theme.breakpoints.down('xs')]: {
                padding: '16px',
            },
        },
    },
    title: {
        fontSize: '1.6rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: (props: StyleProps) =>
            props.isShowMonthLayer ? 'default' : 'pointer',
        [theme.breakpoints.down('xs')]: {
            fontSize: '1.2rem',
        },
        '&:hover': {
            backgroundColor: (props: StyleProps) =>
                props.isShowMonthLayer ? 'unset' : theme.palette.action.hover,
        },
    },
    month: {
        marginRight: theme.spacing(1),
        textTransform: 'uppercase',
        display: (props: StyleProps) =>
            props.isShowMonthLayer ? 'none' : 'block',
    },
}));

export const CalendarNav: React.FC<Props> = ({
    momentContext,
    handleNext,
    handlePrev,
    isShowMonthLayer = false,
    toggleMonthLayer = (value: boolean) => {},
}) => {
    const classes = useStyles({ isShowMonthLayer });
    return (
        <TableRow className={classes.root}>
            <TableCell colSpan={7}>
                <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                >
                    <Box>
                        <IconButton
                            size='small'
                            color='inherit'
                            onClick={handlePrev}
                        >
                            <ChevronLeft fontSize='large' color='inherit' />
                        </IconButton>
                    </Box>
                    <Box
                        className={classes.title}
                        onClick={() => toggleMonthLayer(true)}
                    >
                        <Typography
                            component='p'
                            variant='inherit'
                            className={classes.month}
                        >
                            {momentContext.format('MMMM')}
                        </Typography>
                        <Typography component='p' variant='inherit'>
                            {momentContext.format('Y')}
                        </Typography>
                    </Box>
                    <Box>
                        <IconButton
                            size='small'
                            color='inherit'
                            onClick={handleNext}
                        >
                            <ChevronRight fontSize='large' color='inherit' />
                        </IconButton>
                    </Box>
                </Box>
            </TableCell>
        </TableRow>
    );
};
