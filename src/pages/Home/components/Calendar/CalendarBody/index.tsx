import { makeStyles, TableCell, TableRow, Theme } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { TRootState } from '../../../../../store';
import { ITask } from '../../../../../store/task/task.type';
import moment from 'moment';

interface Props {
    momentContext: moment.Moment;
    today: moment.Moment;
}

const useStyles = makeStyles((theme: Theme) => ({
    row: {
        '& .MuiTableCell-body': {
            color: theme.palette.common.white,
        },
    },
    emptyCell: {},
    dayCell: {
        cursor: 'pointer',
        display: 'inline-block',
        width: '30px',
        height: '30px',
        lineHeight: '30px',
        borderRadius: '50%',
        position: 'relative',
    },
    todayCell: {
        backgroundColor: theme.palette.info.light,
    },
    hasTask: {
        '&:after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            height: '104%',
            width: '104%',
            borderRadius: '50%',
            border: `1px solid ${theme.palette.common.white}`,
        },
    },
}));

export const CalendarBody: React.FC<Props> = ({ momentContext, today }) => {
    const classes = useStyles();

    const { list } = useSelector((state: TRootState) => state.task);

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

            if (today.isSame(momentContext.date(i), 'day')) {
                totalClasses.push(classes.todayCell);
            }

            const isHasTask = list.some((task: ITask) =>
                momentContext.date(i).isSame(moment(task.date.endAt), 'day'),
            );
            if (isHasTask) {
                totalClasses.push(classes.hasTask);
            }

            daysInMonth.push(
                <TableCell key={i * 100}>
                    <span className={totalClasses.join(' ')}>{i}</span>
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
