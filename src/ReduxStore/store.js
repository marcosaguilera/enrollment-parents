import {createStore} from 'redux';

const reducer = (state, action) => {
    console.log(action)
    console.log("=> Action: " + action.type)

    switch(action.type){
        case "SAVE_STUDENT_ESSENTIAL_DATA":
            return{
                ...state,
                essential_data: action.data
            }

        case "SAVE_STUDENT_AUTHORIZATION":
            return{
                ...state,
                is_student_authorize: action.isAuth
            }

        case "SAVE_SERVICE_DATA":
            return{
                ...state,
                service_data: action.service_data
            }

        default:
            return state;
    }
}

export default createStore(
        reducer, {
            essential_data : {},
            is_student_authorize: false,
            service_data   : []
        });