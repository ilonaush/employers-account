export default {
    employWorker: function(worker) {
        debugger;
        return {
            type: 'EMPLOY_WORKER',
            worker: worker
        }
    },
    editWorkTime: function(worker) {
        return {
            type: 'EDIT_WORK_TIME',
            worker: worker,
        }
    },
    fireWorker: function(item) {
        return {
            type: 'FIRE_WORKER',
            item: item
        }
    }
};
