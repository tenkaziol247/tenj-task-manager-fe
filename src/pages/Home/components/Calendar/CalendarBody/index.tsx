import { Box, makeStyles, TableCell, TableRow, Theme } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TRootState } from '../../../../../store';
import { ITask } from '../../../../../store/task/task.type';
import moment from 'moment';
import {
    selectDate,
    clearSelectedDate,
} from '../../../../../store/task/action';

interface Props {
    momentContext: moment.Moment;
    today: moment.Moment;
}

const useStyles = makeStyles((theme: Theme) => ({
    row: {
        '& .MuiTableCell-body': {
            color: theme.palette.common.white,
            [theme.breakpoints.down('xs')]: {
                padding: '8px',
            },
        },
    },
    dayCell: {
        cursor: 'pointer',
        display: 'inline-block',
        width: '30px',
        height: '30px',
        lineHeight: '30px',
        borderRadius: '50%',
        position: 'relative',
        border: `2px solid transparent`,
        [theme.breakpoints.down('xs')]: {
            width: '20px',
            height: '20px',
            lineHeight: '20px',
        },
        '&:after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            height: '100%',
            width: '100%',
            borderRadius: '50%',
        },
        '&:hover': {
            '&:after': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    },
    todayCell: {
        backgroundColor: theme.palette.info.light,
    },
    hasTask: {
        '&:after': {
            border: `2px solid ${theme.palette.common.white}`,
        },
    },
    selectedCell: {
        '&:before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            height: '108%',
            width: '108%',
            borderRadius: '50%',
            border: `3px solid ${theme.palette.error.main}`,
        },
    },
}));

export const CalendarBody: React.FC<Props> = ({ momentContext, today }) => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const { list, selectedDate } = useSelector(
        (state: TRootState) => state.task,
    );

    const handleDateClick = (date: moment.Moment) => {
        if (selectedDate) {
            const isSelectedDate = date.isSame(moment(selectedDate), 'day');

            if (isSelectedDate) {
                dispatch(clearSelectedDate());
            } else {
                dispatch(selectDate(date));
            }
        } else {
            dispatch(selectDate(date));
        }
    };

    const renderDaysInMonth = () => {
        //generate empty cell
        const blankCells = [];
        for (let i = 0; i < +momentContext.startOf('month').format('d'); i++) {
            blankCells.push(<TableCell key={i}></TableCell>);
        }

        //generate days in month
        const daysInMonth = [];
        for (let i = 1; i <= momentContext.daysInMonth(); i++) {
            const totalClasses = [classes.dayCell];

            //add class today
            if (today.isSame(momentContext.date(i), 'day')) {
                totalClasses.push(classes.todayCell);
            }

            //add classs day has task
            const isHasTask = list.some((task: ITask) =>
                momentContext.date(i).isSame(moment(task.date.endAt), 'day'),
            );
            if (isHasTask) {
                totalClasses.push(classes.hasTask);
            }

            //add class selected date
            if (selectedDate) {
                const isSelectedDate = momentContext
                    .date(i)
                    .isSame(moment(selectedDate), 'day');
                if (isSelectedDate) {
                    totalClasses.push(classes.selectedCell);
                }
            }

            daysInMonth.push(
                <TableCell key={i * 100}>
                    <Box
                        component='span'
                        className={totalClasses.join(' ')}
                        onClick={() =>
                            handleDateClick(moment(momentContext.date(i)))
                        }
                    >
                        {i}
                    </Box>
                </TableCell>,
            );
        }

        //merge all cells and divide row
        const totalCells = [...blankCells, ...daysInMonth];
        let rows: JSX.Element[][] = [];
        let cells: JSX.Element[] = [];
        totalCells.forEach((cell: JSX.Element, i) => {
            if (i % 7 !== 0) {
                cells.push(cell);
            } else {
                rows.push([...cells]);
                cells = [];
                cells.push(cell);
            }
            if (i === totalCells.length - 1) {
                rows.push([...cells]);
            }
        });

        //render calendar body
        return rows.map((week, i) => {
            return (
                <TableRow className={classes.row} key={i}>
                    {week}
                </TableRow>
            );
        });
    };

    return <>{renderDaysInMonth()}</>;
};
