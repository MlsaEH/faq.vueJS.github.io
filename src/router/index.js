import {createRouter, createWebHistory} from "vue-router"
import FaqView from "../views/FaqViewAPI.vue"
import QuestionView from "../views/QuestionView.vue"
import AddFaqView from "../views/AddFaqView.vue"
// import FTPView from "../views/FTPView.vue"
import Test from "../views/test.vue"
import SetUp from "../views/setup.vue"
// import ftpTest from "../views/ftpTest.vue"
// import ex from "../views/ModernChatGPT.vue"
// import api from "../views/affFaqApi.vue"

const router=createRouter({
    history:createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: FaqView
        }
        ,
        {
            path: "/faq/:id",
            name: "faq",
            component: QuestionView
        }
        ,
        {
            path: "/Addfaq",
            name: "Addfaq",
            component: AddFaqView
        }
        // ,
        // {
        //     path: "/ftp",
        //     name: "Ftp",
        //     component: FTPView
        // }
        ,
        {
            path: "/test",
            name: "Test",
            component: Test
        }
        ,
        {
            path: "/setup/:set",
            name: "Setup",
            component: SetUp
        }
        // ,
        // {
        //     path: "/ftptest",
        //     name: "ftpTest",
        //     component: ftpTest
        // }
        // ,
        // {
        //     path: "/ex",
        //     name: "ex",
        //     component: ex
        // }
        // ,
        // {
        //     path: "/api",
        //     name: "api",
        //     component: api
        // }
    ]
})
export default router