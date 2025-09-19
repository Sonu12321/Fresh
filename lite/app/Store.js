import { configureStore } from "@reduxjs/toolkit";
import todosReducer from '../Features/todo/todoSlice'


export const Store = configureStore({
    reducer:{
        todo:todosReducer
    }
})