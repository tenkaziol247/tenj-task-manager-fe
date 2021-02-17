import React, { useState } from 'react';
import moment from 'moment';
import {
    Box,
    Fade,
    makeStyles,
    Slide,
    Table,
    TableBody,
    TableHead,
    Theme,
    Zoom,
} from '@material-ui/core';
import { CalendarBody } from './CalendarBody';
import { CalendarHeader } from './CalendarHeader';
import { CalendarNav } from './CalendarNav';
import { CalendarLayerMonth } from './CalendarLayerMonth/CalendarLayerMonth';

interface Props {
    isLayerCalendar?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        borderRadius: 12,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: theme.spacing(3),
        boxSizing: 'border-box',
        [theme.breakpoints.down('xs')]: {
            padding: '56px 0',
        },
    },
    table: {
        '& .MuiTableCell-root': {
            borderBottom: 0,
            textAlign: 'center',
            fontWeight: 500,
            fontSize: '1rem',
            [theme.breakpoints.down('xs')]: {
                fontSize: '0.8rem',
            },
        },
        '& .MuiTableCell-head': {
            color: theme.palette.common.white,
        },
    },
}));

export const Calendar: React.FC<Props> = ({ isLayerCalendar = true }) => {
    const classes = useStyles();

    const [today] = useState<moment.Moment>(moment());
    const [momentContext, setMomentContext] = useState<moment.Moment>(moment());
    const [isShowMonthLayer, setIsShowMonthLayer] = useState<boolean>(false);

    const handlePrevMonth = () => {
        setMomentContext(({ ...prev }) => moment(prev).subtract(1, 'month'));
    };

    const handleNextMonth = () => {
        setMomentContext(({ ...prev }) => moment(prev).add(1, 'month'));
    };

    const handlePrevYear = () => {
        setMomentContext(({ ...prev }) => moment(prev).subtract(1, 'year'));
    };

    const handleNextYear = () => {
        setMomentContext(({ ...prev }) => moment(prev).add(1, 'year'));
    };

    const toggleMonthLayer = (value: boolean) => {
        setIsShowMonthLayer(value);
    };

    const handleMonthClick = (monthContext: moment.Moment) => {
        setMomentContext(moment({ ...monthContext }));
        setIsShowMonthLayer(false);
    };

    const renderContent = (): JSX.Element => {
        if (isShowMonthLayer) {
            return (
                <Fade
                    in={isShowMonthLayer}
                    timeout={200}
                    mountOnEnter
                    unmountOnExit
                >
                    <Table className={classes.table}>
                        <TableHead>
                            <CalendarNav
                                momentContext={momentContext}
                                handlePrev={handlePrevYear}
                                handleNext={handleNextYear}
                                isShowMonthLayer={isShowMonthLayer}
                            />
                        </TableHead>
                        <TableBody>
                            <CalendarLayerMonth
                                momentContext={momentContext}
                                thisMonth={today}
                                handleMonthClick={handleMonthClick}
                            />
                        </TableBody>
                    </Table>
                </Fade>
            );
        } else {
            return (
                <Fade
                    in={!isShowMonthLayer}
                    timeout={200}
                    mountOnEnter
                    unmountOnExit
                >
                    <Table className={classes.table}>
                        <TableHead>
                            <CalendarNav
                                momentContext={momentContext}
                                handlePrev={handlePrevMonth}
                                handleNext={handleNextMonth}
                                toggleMonthLayer={toggleMonthLayer}
                            />
                        </TableHead>
                        <TableBody>
                            <CalendarHeader />
                            <CalendarBody
                                momentContext={momentContext}
                                today={today}
                            />
                        </TableBody>
                    </Table>
                </Fade>
            );
        }
    };

    return (
        <Slide
            in={isLayerCalendar}
            timeout={{ appear: 300, enter: 900, exit: 300 }}
            direction='right'
            mountOnEnter
            unmountOnExit
        >
            <Box className={classes.root}>{renderContent()}</Box>
        </Slide>
    );
};
