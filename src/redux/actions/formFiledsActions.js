export const ADD_NEW_PAGE = 'ADD_NEW_PAGE';
export const DELETE_PAGE = 'DELETE_PAGE';
export const DELETE_FIELD_ITEM = 'DELETE_FIELD_ITEM';
export const UPDATE_PLACEHOLDER = 'UPDATE_PLACEHOLDER';
export const ADD_INPUT_FIELDS = 'ADD_INPUT_FIELDS';
export const ADD_TITLE = 'ADD_TITLE';




export const add_title = (payload) => {
    return {
        type: ADD_TITLE,
        payload
    }
}

export const add_new_page = () => {
    return {
        type: ADD_NEW_PAGE
    }
}

export const delete_page = (payload) => {
    return {
        type: DELETE_PAGE,
        payload
    }
}

export const add_input_fields = (payload) => {
    return {
        type: ADD_INPUT_FIELDS,
        payload
    }
}

export const delete_field_item = (payload) => {
    return {
        type: DELETE_FIELD_ITEM,
        payload
    }
}

export const update_placeholder = (payload) => {
    return {
        type: UPDATE_PLACEHOLDER,
        payload
    }
}