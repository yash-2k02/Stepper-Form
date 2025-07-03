import { configureStore } from "@reduxjs/toolkit";

// import { createLogger } from "redux-logger";
import formSlice from "./src/components/form/redux/FormSlice";


// const logger = createLogger()

const store = configureStore({
    reducer:{
        form: formSlice
    },
    // middleware: (getDefaultMiddleware)=>{
    //     return getDefaultMiddleware().concat(logger)
    // }
})

export default store