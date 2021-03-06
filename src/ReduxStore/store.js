import {createStore} from 'redux';

const reducer = (state, action) => {
    console.log("=> Action: " + action.type)

    switch(action.type){
        case "SAVE_STUDENT_ESSENTIAL_DATA":
            return{
                ...state,
                fake_text: action.fake_text,
                demo_data: action.demo_data
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
            fake_text    : '',
            demo_data    : [],
            service_data : [],
            is_student_authorize: false
        });