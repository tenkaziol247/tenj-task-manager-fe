import React, { useState } from 'react';

import { WelcomeTodo } from './WelcomeTodo';
import { ActionsTodo } from './ActionsTodo';
import { TasksTodo } from './TasksTodo';

interface Props {
    handleOpenModal: () => void;
}

export const MainTodo: React.FC<Props> = ({ handleOpenModal }) => {
    const [toggleSort, setToggleSort] = useState<boolean>(false);

    const handleToggleSort = () => {
        setToggleSort((prev) => !prev);
    };

    return (
        <div className='mainTodo'>
            <WelcomeTodo />
            <ActionsTodo
                toggleSort={toggleSort}
                handleToggleSort={handleToggleSort}
            />
            <TasksTodo
                toggleToolbarTodo={toggleSort}
                handleOpenModal={handleOpenModal}
            />
        </div>
    );
};
