import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form'
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Campsites } from './campsites';
import { Comments } from './comments';
import { Partners } from './partners';
import { Promotions } from './promotions';
import { InitialFeedback } from './forms';




export const ConfigureStore = () => {
    const store = createStore(
        //combined all reducers into one single reducer, by passing in objects which are assigned as each reducer
        combineReducers({
            campsites: Campsites,
            comments: Comments,
            partners: Partners,
            promotions: Promotions,
            ...createForms({
                feedbackForm: InitialFeedback
            })
        }),

        //This is all you need to do to use redux-logger
        applyMiddleware(thunk, logger)
    );

    return store;
}
