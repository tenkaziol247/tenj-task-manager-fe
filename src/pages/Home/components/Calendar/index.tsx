import React, { useState } from 'react';
import moment from 'moment';
import {
    Box,
    makeStyles,
    Table,
    TableBody,
    TableHead,
    Theme,
} from '@material-ui/core';
import { CalendarBody } from './CalendarBody';
import { CalendarHeader } from './CalendarHeader';
import { CalendarNav } from './CalendarNav';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        borderRadius: 12,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: theme.spacing(3),
        boxSizing: 'border-box',
    },
    table: {
        '& .MuiTableCell-root': {
            borderBottom: 0,
            textAlign: 'center',
            fontWeight: 500,
            fontSize: '1rem',
        },
        '& .MuiTableCell-head': {
            color: theme.palette.common.white,
        },
    },
}));

export const Calendar: React.FC = () => {
    const classes = useStyles();

    const [today] = useState<moment.Moment>(moment());
    const [momentContext, setMomentContext] = useState<moment.Moment>(moment());
    const [showMonthPopover, setShowMonthPopover] = useState<boolean>(false);
    const [showYearPopover, setShowYearPopover] = useState<boolean>(false);

    const handlePrevMonth = () => {
        setMomentContext(({ ...prev }) => moment(prev).subtract(1, 'month'));
    };

    const handleNextMonth = () => {
        setMomentContext(({ ...prev }) => moment(prev).add(1, 'month'));
    };

    return (
        <Box className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <CalendarNav
                        momentContext={momentContext}
                        handlePrevMonth={handlePrevMonth}
                        handleNextMonth={handleNextMonth}
                    />
                </TableHead>
                <TableBody>
                    <CalendarHeader />
                    <CalendarBody momentContext={momentContext} today={today} />
                </TableBody>
            </Table>
        </Box>
    );
};
