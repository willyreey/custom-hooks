export const todoReducer = (InitialState = [], action) => {
    switch (action.type) {
        case '[TODO] Add todo':
            return [...InitialState, action.payload]

        case '[TODO] Remove todo':
            return InitialState.filter(todo => todo.id !== action.payload)

        case '[TODO] Toggle todo':
            return InitialState.map(todo => {
                if( todo.id === action.payload ){
                    return{
                        ...todo,
                        done: !todo.done
                    }
                }
                return todo
            })

        default: 
            return InitialState
    }
}