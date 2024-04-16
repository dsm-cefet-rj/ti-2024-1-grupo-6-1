import { combineReducers } from "redux";

import projetoReducer from "./projeto/reducer";

const rootReducer = combineReducers({projetoReducer})

export default rootReducer;