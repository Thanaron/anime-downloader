import store from './store/store';
import { StatusType } from './types/types';

function setStatus(message: string, type: StatusType = StatusType.None): void {
    store.commit('setStatus', { message, type });
}

function clearStatus() {
    store.commit('setStatus', { message: '', type: StatusType.None });
}

export default { setStatus, clearStatus };
