import { v4 as uuidv4 } from "uuid";
import { ADD_INPUT_FIELDS, ADD_NEW_PAGE, DELETE_FIELD_ITEM, DELETE_PAGE, UPDATE_PLACEHOLDER } from "../actions/formFiledsActions";
import { SHARED_FORM_DATA } from "../actions/sharedLinkActions";

const initialState = {
    fields: [
        {
            id: uuidv4(),
            page: 1,
            type: "button",
            placeholder: "Button Page 1",
            name: uuidv4(),
        },
    ],
    totalPage: 1
}

const formFiledReducers = (state = initialState, { type, payload }) => {

    const { fields, totalPage } = state

    switch (type) {
        // TO CREATE NEW PAGE
        case ADD_NEW_PAGE:
            let oldFields = [...fields];
            //Generating New Page Number
            const currentPage = fields[fields.length - 1].page + 1;
            const newPageBtn = {
                id: uuidv4(),
                page: currentPage,
                type: "button",
                placeholder: "Next Page",
                name: uuidv4(),
            };
            oldFields.push(newPageBtn);
            return {
                ...state,
                fields: oldFields,
                totalPage: currentPage
            }
        // TO DELETE PAGE
        case DELETE_PAGE:
            const keepFields = fields.filter((dt) => dt.page !== payload);
            return {
                ...state,
                fields: keepFields,
                totalPage: totalPage - 1
            }
        case DELETE_FIELD_ITEM:
            let oldFieldsItem = [...fields];
            oldFieldsItem.splice(payload, 1);
            return {
                ...state,
                fields: oldFieldsItem,
                totalPage
            }
        case UPDATE_PLACEHOLDER:
            const { placeholder } = payload
            console.log("changing field", payload);
            let oldFieldsHolder = [...fields];
            oldFieldsHolder[payload.index].placeholder = placeholder;
            return {
                ...state,
                fields: oldFieldsHolder,
                totalPage
            }
        case ADD_INPUT_FIELDS:
            const { page, type, index, newFieldType } = payload;
            let oldFieldsInput = [...fields];

            //New Field Object
            let newFieldObj = {
                id: uuidv4(),
                page: page,
                type: newFieldType,
                placeholder: "Add placeholder here",
                name: uuidv4(),
            };

            if (type === "button") {
                oldFieldsInput.splice(index, 0, newFieldObj);
            } else {
                oldFieldsInput.splice(index + 1, 0, newFieldObj);
            }
            return {
                ...state,
                fields: oldFieldsInput,
                totalPage
            }
        case SHARED_FORM_DATA:
            console.log(payload)
            return {
                ...state,
                fields: payload,
                totalPage
            }
        default: return state;
    }
}

export default formFiledReducers;