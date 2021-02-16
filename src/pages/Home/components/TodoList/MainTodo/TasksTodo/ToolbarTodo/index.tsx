import { Box, Grid, makeStyles, Theme } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IParamsFetchTasks } from '../../../../../../../api/taskApi/taskApi.type';
import { TRootState } from '../../../../../../../store';
import { fetchTasks } from '../../../../../../../store/task/action';

const sorting = [
    {
        label: 'Newest first',
        value: 'createdAt:desc',
    },
    {
        label: 'Oldest first',
        value: 'createdAt:asc',
    },
    {
        label: 'Easy first',
        value: 'grade:asc',
    },
    {
        label: 'Hard first',
        value: 'grade:desc',
    },
    {
        label: 'Priority',
        value: 'priority:desc',
    },
    {
        label: 'Due date',
        value: 'date.endAt:asc',
    },
];

const filters = [
    {
        label: 'Incomplete',
        value: 'incomplete',
        completed: 'false',
    },
    {
        label: 'Complete',
        value: 'complete',
        completed: 'true',
    },
    {
        label: 'All',
        value: 'allTask',
        completed: 'unset',
    },
];

const useStyles = makeStyles((theme: Theme) => ({
    toolbarTodo: {
        margin: '4px 2px',
    },
    select: {
        backgroundColor: theme.palette.grey[200],
        borderRadius: 4,
        '&:focus': {
            outline: 'none',
        },
    },
    labelFilter: {
        cursor: 'pointer',
        color: theme.palette.background.default,
        backgroundColor: theme.palette.text.primary,
        border: `1px solid transparent`,
        borderRadius: 4,
        display: 'inline-block',
        padding: '1px 3px',
    },
    labelChecked: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.common.white,
        border: `1px solid transparent`,
    },
    inputFilter: {
        visibility: 'hidden',
        position: 'absolute',
        top: '50%',
        left: 0,
        transform: 'translateY(-50%)',
    },
}));

const JSONdata = localStorage.getItem('paramsFetch');
let initParams: IParamsFetchTasks;
if (JSONdata) {
    initParams = JSON.parse(JSONdata);
}

export const ToolbarTodo: React.FC = () => {
    const classes = useStyles();
    const [completedFilter, setCompletedFilter] = useState<string>(
        initParams && initParams.completed ? initParams.completed : 'false',
    );
    const [fieldSort, setFieldSort] = useState<string>(
        initParams && initParams.sortBy ? initParams.sortBy : 'createdAt:desc',
    );

    const dispatch = useDispatch();
    const { loading } = useSelector((state: TRootState) => state.task);

    const handleChangeFieldSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (!loading) {
            setFieldSort(e.target.value);
            localStorage.setItem(
                'paramsFetch',
                JSON.stringify({
                    completed: completedFilter,
                    sortBy: e.target.value,
                }),
            );
            dispatch(fetchTasks());
        }
    };

    const handleChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!loading) {
            if (e.currentTarget.value === 'incomplete') {
                setCompletedFilter('false');
                localStorage.setItem(
                    'paramsFetch',
                    JSON.stringify({ completed: 'false', sortBy: fieldSort }),
                );
            } else if (e.currentTarget.value === 'complete') {
                setCompletedFilter('true');
                localStorage.setItem(
                    'paramsFetch',
                    JSON.stringify({ completed: 'true', sortBy: fieldSort }),
                );
            } else {
                setCompletedFilter('unset');
                localStorage.setItem(
                    'paramsFetch',
                    JSON.stringify({ completed: 'unset', sortBy: fieldSort }),
                );
            }
            dispatch(fetchTasks());
        }
    };

    const renderFilterItem = (option: {
        label: string;
        value: string;
        completed: string;
    }) => {
        return (
            <Box position='relative' mr='4px'>
                <label
                    htmlFor={option.value}
                    className={[
                        classes.labelFilter,
                        completedFilter === option.completed
                            ? classes.labelChecked
                            : undefined,
                    ].join(' ')}
                >
                    {option.label}
                </label>
                <input
                    className={classes.inputFilter}
                    type='radio'
                    name='filter'
                    id={option.value}
                    value={option.value}
                    checked={completedFilter === option.completed}
                    onChange={handleChangeFilter}
                />
            </Box>
        );
    };

    return (
        <Box
            className={classes.toolbarTodo}
            color='text.primary'
            fontSize='0.9rem'
        >
            <Grid container>
                <Grid item xs={8} md={8}>
                    <Grid container>
                        {filters.map((option) => (
                            <Grid item key={option.value}>
                                {renderFilterItem(option)}
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={4} md={4}>
                    <Box textAlign='right'>
                        <select
                            className={classes.select}
                            id='toolbarTodo__sortBy'
                            name='sortBy'
                            value={fieldSort}
                            onChange={handleChangeFieldSort}
                        >
                            {sorting.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};
