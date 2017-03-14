import fp from 'lodash/fp'

import { maps as atlas } from '../maps.json'
import { makeActionCreator } from '../utils'

const MAPNAMES = fp.zipObject(
    Object.keys(atlas),
    /* Object.keys(atlas).map(() => false)*/
    Object.keys(atlas).map(() => Math.random() < 0.5)
)

// ACTIONS

export const TOGGLE_COMPLETED = 'atlas/TOGGLE_COMPLETED'
export const SHOW_COMPLETED = 'atlas/SHOW_COMPLETED'
export const SHOW_UNIQUE = 'atlas/SHOW_UNIQUE'

// ACTION CREATORS

export const toggleMap = makeActionCreator(TOGGLE_COMPLETED, 'name')
export const showCompleted = makeActionCreator(SHOW_COMPLETED)
export const showUnique = makeActionCreator(SHOW_UNIQUE)

export default (state = {
    showUnique: null,
    showCompleted: null,
    completion: MAPNAMES,
}, action) => {
    switch (action.type) {
        case TOGGLE_COMPLETED: {
            const { completion } = state
            return {
                ...state,
                completion: { ...completion, [action.name]: !completion[action.name] },
            }
        }
        case SHOW_COMPLETED:
            return { ...state, showCompleted: !showCompleted }
        case SHOW_UNIQUE:
            return { ...state, showUnique: !showUnique }
        default:
            return state
    }
}
