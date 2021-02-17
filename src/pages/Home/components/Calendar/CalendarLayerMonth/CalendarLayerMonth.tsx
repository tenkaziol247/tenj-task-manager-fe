import { Box, makeStyles, TableCell, TableRow, Theme } from '@material-ui/core';
import React from 'react';
import { getMonths } from '../../../utils/utilities';
import moment from 'moment';

interface Props {
    momentContext: moment.Moment;
    thisMonth: moment.Moment;
    handleMonthClick: (value: moment.Moment) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
    month: {
        cursor: 'pointer',
        padding: '32px 16px',
        boxSizing: 'border-box',
        position: 'relative',
        border: `1px solid transparent`,
        '&:hover': {
            '&:after': {
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                content: '""',
                backgroundColor: theme.palette.action.hover,
            },
        },
    },
    thisMonth: {
        backgroundColor: theme.palette.info.light,
    },
    quarter: {},
}));

export const CalendarLayerMonth: React.FC<Props> = ({
    momentContext,
    thisMonth,
    handleMonthClick,
}) => {
    const classes = useStyles();

    const renderLayerMonth = () => {
        const monthCells: JSX.Element[] = [];
        getMonths().forEach((nameMonth: string, i) => {
            const totalClasses = [classes.month];

            const isThisMonth = momentContext
                .month(nameMonth)
                .isSame(thisMonth, 'month');
            if (isThisMonth) {
                totalClasses.push(classes.thisMonth);
            }

            monthCells.push(
                <TableCell
                    key={i}
                    className={totalClasses.join(' ')}
                    onClick={() =>
                        handleMonthClick(moment(momentContext.month(nameMonth)))
                    }
                >
                    <Box component='span'>{nameMonth}</Box>
                </TableCell>,
            );
        });

        let rows: JSX.Element[][] = [];
        let cells: JSX.Element[] = [];
        monthCells.forEach((cell: JSX.Element, i) => {
            if (i % 4 !== 0) {
                cells.push(cell);
            } else {
                rows.push([...cells]);
                cells = [];
                cells.push(cell);
            }
            if (i === monthCells.length - 1) {
                rows.push([...cells]);
            }
        });

        return rows.map((quarter, i) => {
            return (
                <TableRow className={classes.quarter} key={i}>
                    {quarter}
                </TableRow>
            );
        });
    };

    return (
        <>
            <TableRow className={classes.quarter}>
                <TableCell colSpan={4}></TableCell>
            </TableRow>
            {renderLayerMonth()}
        </>
    );
};
