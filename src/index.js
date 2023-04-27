import React, { useEffect} from "react";
import ReactDOM from "react-dom";
import {completeTask, getTask, getTasks, titleChanged,titleDeleted,getTasksSelect,getTasksLoadingStatus, titleCreate} from "./store/task";
import configureStore from "./store/store";
import { Provider, useSelector, useDispatch } from "react-redux";
import { getErrors } from "./store/errors";

const store = configureStore();

const App = (params) => {
    // const [state, setState] = useState(store.getState());
const state=useSelector(getTasksSelect())
console.log("state",state)
const isLoading=useSelector(getTasksLoadingStatus())
const error=useSelector(getErrors())
const dispatch=useDispatch()
    useEffect(() => {
        dispatch(getTasks())
    //  dispatch(createTask())
        // store.subscribe(() => {
        //     setState(store.getState());
        // });
    }, []);

    const changeTitle = (taskId) => {
        dispatch(titleChanged(taskId));
    };
    const deleteTitle = (taskId) => {
        dispatch(titleDeleted(taskId));
    };
    // const createTitle = () => {

    //     dispatch(titleCreate());
    // };
if(isLoading){return <p>Loading...</p>}
if(error){return <p>{error}</p>}
    return (
        <>
            <h1> App</h1>
            <ul>
                {state.map((el) => (
                    <li key={el.id}>
                        <p>{el.title}</p>
                        <p> {`Completed: ${el.completed}`}</p>
                        <button onClick={() => dispatch(completeTask(el.id))}>
                            Complete
                        </button>
                        <button onClick={() => changeTitle(el.id)}>
                            Change title
                        </button>
                        <button onClick={() => deleteTitle(el.id)}>
                            Delete title
                        </button>
                       
                        <hr />
                    </li>
                ))}
            </ul> 
            <button onClick={() =>dispatch(titleCreate())}>
                           TASKS
                        </button>
        </>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
