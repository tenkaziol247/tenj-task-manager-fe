import { makeStyles, TableCell, TableRow, Theme } from '@material-ui/core';
import React from 'react';
import { getWeekdaysShort } from '../../../utils/utilities';

const useStyles = makeStyles((theme: Theme) => ({
    row: {
        '& .MuiTableCell-root': {
            padding: '16px 16px 20px',
            [theme.breakpoints.down('xs')]: {
                padding: '16px 8px 16px',
            },
        },
        '& .MuiTableCell-body': {
            color: theme.palette.info.light,
        },
    },
}));

export const CalendarHeader: React.FC = () => {
    const classes = useStyles();

    const renderCalendarHeader = () => {
        return (
            <TableRow className={classes.row}>
                {getWeekdaysShort().map((dayName, i) => {
                    return <TableCell key={i}>{dayName}</TableCell>;
                })}
            </TableRow>
        );
    };

    return <>{renderCalendarHeader()}</>;
};
