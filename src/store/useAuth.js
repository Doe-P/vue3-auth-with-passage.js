import {defineStore} from "pinia";
import {Passage} from '@passageidentity/passage-js';
import {Auth} from "../core/auth.js";
import {APP_ID} from "../constant/index.js";
import {useRouter} from "vue-router";
import {router} from "../router/index.js";

export const useAuth = defineStore('auth', {
    state: () => ({
        auth: new Auth(new Passage(APP_ID)),
        isLoading: false,
        userInfo: null,
        identifier: null,
        router: useRouter(),
        loggedIn: false,
        devices: [],
    }),

    getters: {
        userInfoData: (state) => state.userInfo,
        isLoggedIn: (state) => state.loggedIn,
        getDevices: (state) => state.devices,
    },

    actions: {
        async getUserInfo() {
            this.isLoading = true;
            const response = await this.auth.userInfo();
            this.isLoading = false;
            if (!!response) {
                this.userInfo = response;
            }
        },
        async onSubmit() {
            this.isLoading = true;
            const response = await this.auth.identifierExists(this.identifier);
            this.isLoading = false;
            if (!!response && response.auth_token) {
                localStorage.setItem('auth', JSON.stringify(response));
                router.push({name: 'home'}).catch((_) => {
                });
            }
        },
        async checkAuthGuard() {
            this.loggedIn = await this.auth.checkGuard();
        },
        async fetchDevices() {
            this.isLoading = true;
            const response = await this.auth.listDevices();
            this.isLoading = false;
            this.devices = response;
        },
        async logout() {
            this.isLoading = true;
            const res = await this.auth.logout();
            this.isLoading = false;
            if (res) {
                localStorage.removeItem('auth');
                router.push({name: 'login'}).catch((_) => {
                });
            }
        }
    },
});
