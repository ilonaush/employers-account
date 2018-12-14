const initialState = {
    workers: [
        {
            id: 1,
            fullname: 'Vasyl Marko',
            position: 'Manager'
        }
    ],
    pages: [
        {
            title: 'Table',
            path: '/'
        },
        {
            title: 'Add worker',
            path: '/add-worker'
        }
    ]
};


let reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'EMPLOY_WORKER':
            console.log(action.worker);
            return {
                ...state,
                workers: [
                    ...state.workers,
                    {...action.worker}
                ],
            };
        case 'EDIT_WORK_TIME':
            return {
                ...state
            };
        case 'FIRE_WORKER':
            return {
                ...state,
                ...state.workers.filter((worker) => {
                return worker.id !== action.worker.id
                })
            }
        default:
            return state;
    }
}
export default reducer;
