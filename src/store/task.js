 import { createSlice, createAction} from '@reduxjs/toolkit'
import todosService from '../service/todos.service';
import { setError } from './errors';

 const initialState = {entities:[], isLoading:true};

//  const updated = createAction("task/updated")
//  const remove = createAction("task/removed")
const taskSlice=createSlice({name:"task", initialState,reducers:{
  recived(state, action){
  //  return action.payload
  state.entities=action.payload,
  state.isLoading=false
  },
  updated(state, action){
          const elementIndex = state.entities.findIndex(
              (el) => el.id === action.payload.id
          );
          state.entities[elementIndex] = {
              ...state.entities[elementIndex],
              ...action.payload,
          };
      },
      remove(state, action) {
        state.entities = state.entities.filter(
            (el) => el.id !== action.payload.id
        );
    },
      taskRequested(state){
        state.isLoading=true
     },
     taskFiled(state, action){
      state.isLoading=false
   },
   created(state,action){
    state.entities.push(action.payload)
   }
}})

const {reducer:taskReducer, actions}=taskSlice
const {remove,updated, recived,taskRequested,taskFiled,created}=actions

// const taskRequested=createAction("task/requested")
// const taskFiled=createAction("task/requestedFiled")

export const getTasks=()=>async(dispatch)=>{
dispatch(taskRequested())
  try {
    const data= await todosService.fetch()
    dispatch(recived(data))
    // console.log("data", data)
  } catch (error) {
    dispatch(taskFiled())
    dispatch(setError(error.message))
  }
}

export const createTask=(payload)=>async(dispatch)=>{
    try {
      const data= await todosService.create(payload)
      dispatch(recived(data))
      console.log("data",data)
    } catch (error) {
      dispatch(taskFiled())
      dispatch(setError(error.message))
    }
  }

export const completeTask=(id)=>(dispatch,getState)=>{
  dispatch(updated({ id, completed: true }));
}


//  export function taskCompleted(id) {
//   return 
  // return {
  //     type:TASC_UPDATED,
  //     payload: { id, completed: true },
  // };
// }
export function titleChanged(id) {
  return updated({ id, title: `New title for ${id}` })
  // return {
  //     type: TASC_UPDATED,
  //     payload: { id, title: `New title for ${id}` },
  // };
}
export function titleDeleted(id) {
  return remove({id})
  // return {
  //     type: TASK_DELETED,
  //     payload: { id},
  // };
}
export function titleCreate(){
  return created({ title:`new title {id}`,completed:false})
}
export const getTasksSelect=()=>(state)=>state.tasks.entities
export const getTasksLoadingStatus=()=>(state)=>state.tasks.isLoading
// const taskReducer= createReducer(initialState, (builder)=>{
//   builder.addCase(updated, (state, action)=>{
//           const elementIndex = state.findIndex(
//               (el) => el.id === action.payload.id
//           );
//           state[elementIndex] = {
//               ...state[elementIndex],
//               ...action.payload,
//           };
//       })
//       .addCase(remove, (state, action)=>{
//          return state.filter((el) => el.id !== action.payload.id);
//       })
//   })


//  function taskReducer(state = [], action) {
//   switch (action.type) {
//       case updated.type: {
//           const newArray = [...state];
//           const elementIndex = newArray.findIndex(
//               (el) => el.id === action.payload.id
//           );
//           newArray[elementIndex] = {
//               ...newArray[elementIndex],
//               ...action.payload,
//           };
//           return newArray;
//       }
//       case remove.type: {
//           const newArray= state.filter(
//               (el) => el.id !== action.payload.id
//           );
//           return newArray;
//       }
//       default:
//           return state;
//   }
// }
export default taskReducer
