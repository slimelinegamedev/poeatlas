import { createStore, compose } from 'redux'

import rootReducer from  './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default (initialState) =>
    createStore(
        rootReducer,
        initialState,
        composeEnhancers(
        ),
    )
