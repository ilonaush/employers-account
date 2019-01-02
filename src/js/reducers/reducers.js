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
        },
        {
            title: 'Fire worker',
            path: '/fire-worker'
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
            const workers = [...state.workers].map((worker) => {
                if (worker.id === action.worker.id) {
                        return {
                            ...action.worker
                        }
                    }
                else {
                    return worker;
                }
            });
            return {
                ...state,
                workers: [
                    ...workers,
                ],
            };
        case 'FIRE_WORKER':
            return {
                ...state,
                ...state.workers.filter((worker) => {
                return worker.id !== action.worker.id
                })
            };
        default:
            return state;
    }
}
export default reducer;
