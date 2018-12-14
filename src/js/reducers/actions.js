export default {
    employWorker: function(worker) {
        debugger;
        return {
            type: 'EMPLOY_WORKER',
            worker: worker
        }
    },
    editWorkTime: function(item, newName, newPrice) {
        return {
            type: 'EDIT_WORK_TIME',
            item: item,
            newName: newName,
            newPrice: newPrice
        }
    },
    fireWorker: function(item) {
        return {
            type: 'FIRE_WORKER',
            item: item
        }
    }
};
