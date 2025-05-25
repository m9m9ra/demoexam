import { UserController } from "../controller/UserController";


export const Routes = [{
    method: "get",
    route: "/",
    controller: UserController,
    action: "get"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
}]