import { createStore } from 'redux';
const initialState = {
    tasks: [],
    taskActionSuccess: null,
    loading: false,
    taskActionFailed: false,
    errorMessage: null
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOADING": {
            return {
                ...state,
                loading: true,
                errorMessage: null,
                taskActionFailed: false,
                taskActionSuccess: null
            }
        }
        case "CLEAR_TASK_ACTION_FAILED":{
            return {
                ...state,
                taskActionFailed:false
            }
        }
        case "SET_ERROR_MESSAGE": {
            return {
                ...state,
                errorMessage: action.errorMessage,
                taskActionFailed: true,
                loading: false
            }
        }
        case "SET_TASKS": {
            return {
                ...state,
                tasks: [...action.tasks],
                taskActionSuccess: true,
                loading: false
            }
        }
        case "ADD_TASK": {
            return {
                ...state,
                tasks: [...state.tasks, action.task],
                taskActionSuccess: "The Task Was Added SuccessFully !",
                loading: false
            }
        }
        case "DELETE_TASK": {
            let tasks = state.tasks.filter(task => task._id !== action._id);
            return {
                ...state,
                tasks,
                taskActionSuccess: "The Task Was Deleted!",
                loading: false
            }
        }
        case "EDIT_TASK": {
            const tasks = [...state.tasks];
            const idx = tasks.findIndex(task => task._id === action.task._id);
            tasks[idx] = action.task;
            return {
                ...state,
                tasks,
                taskActionSuccess: "The Task was Edited !",
                loading: false
            }
        }
        default: return state;
    }
}

const store = createStore(reducer);
export default store;