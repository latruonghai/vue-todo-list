import { defineStore } from 'pinia';
import { ToggleState } from '../../typings/store';

const useToggleModal = defineStore('toggleModal', {
    state: (): ToggleState => {
        return {
            isShow: false
        };
    },
    actions: {
        toggleModalAction(isShow: boolean): void {
            this.isShow = isShow;
        }
    }
});

export { useToggleModal };
