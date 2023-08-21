import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue'
// Auth e UnAuth
import Login from './pages/auth/login/Login.vue'
import Register from './pages/auth/register/Register.vue'
// Pages Users
import Main from './pages/user/Main.vue';
import Home from './pages/user/home/Home.vue'
import Rooms from './pages/user/rooms/Rooms.vue'
import Schenduling from './pages/user/scheduling/Schenduling.vue'
import About from './pages/user/about/About.vue'
import NotFound from  './pages/user/notFound/NotFound.vue'
// Pages Admins
import MainAdm from './pages/adm/MainAdm.vue'
import HomeAdm from './pages/adm/home/HomeAdm.vue'
import RequestAdm from './pages/adm/requests/RequestsAdm.vue'
import UsersAdm from './pages/adm/users/UsersAdm.vue'
import SchendulingAdm from './pages/adm/scheduling/SchedulingAdm.vue';
import RoomsAdm from './pages/adm/rooms/RoomsAdm.vue'
import Management from './pages/adm/management/Management.vue'
import NotFoundAdm from './pages/adm/notFound/NotFoundAdm.vue'

const routes = [
    // Guest NotFound
    {path: '/:pathMatch(.*)', component: Login},
    // Routes Users
    {path: '/', component: Login},
    {path: '/Register', component: Register},
    {path: '/user/home', component: Main, children: [
        {path: '', component: Home},
        {path: '/user/rooms', component: Rooms},
        {path: '/user/schenduling', component: Schenduling},
        {path: '/user/about', component: About},
    ]},
    // User NotFound
    {path: '/user:pathMatch(.*)', component: NotFound},
    // Routes Admins
    {path: '/adm', component: MainAdm, children: [
        {path: '', component: HomeAdm},
        {path: '/adm/requests', component: RequestAdm},
        {path: '/adm/users', component: UsersAdm},
        {path: '/adm/rooms', component: RoomsAdm}, 
        {path: '/adm/scheduling', component:SchendulingAdm},
        {path: '/adm/management', component: Management},
    ]},
    // Admin NotFound
    {path: '/adm:pathMatch(.*)', component: NotFoundAdm},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
createApp(App).use(router).mount('#app')
