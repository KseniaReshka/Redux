export function thunk({dispatch, getState}) {
  return function wrapDispatch(next) {
    return function handleAction(action) {
      if(typeof action==="function"){
              console.log(store);
      console.log(next);
      console.log(action);
        action(dispatch, getState)
        // console.log("function")
      }else{return next(action)}
      // console.log(store);
      // console.log(next);
      // console.log(action);
      
    }
  }
}