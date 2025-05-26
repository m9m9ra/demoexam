import { UserController } from "./controller/UserController"

export const Routes = [{
    method: "get",
    route: "/products",
    controller: UserController,
    action: "all"
}, 
// {
//     method: "delete",
//     route: "/users/:id",
//     controller: UserController,
//     action: "remove"
// }
]