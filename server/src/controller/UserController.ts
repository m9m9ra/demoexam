import { AppDataSource } from "../config/data-source"
import { NextFunction, Request, Response } from "express"
import { Product } from "../entity/Product";

export class UserController {

    // private userRepository = AppDataSource.getRepository(User)

    async all(request: Request, response: Response, next: NextFunction) {
        const productRepository = AppDataSource.getRepository(Product);
        const products = await productRepository.find({ relations: {
            productType: true
        }});
        return products;
        // return this.userRepository.find()
    }

    // async one(request: Request, response: Response, next: NextFunction) {
    //     const id = parseInt(request.params.id)


    //     const user = await this.userRepository.findOne({
    //         where: { id }
    //     })

    //     if (!user) {
    //         return "unregistered user"
    //     }
    //     return user
    // }

    // async save(request: Request, response: Response, next: NextFunction) {
    //     const { firstName, lastName, age } = request.body;

    //     const user = Object.assign(new User(), {
    //         firstName,
    //         lastName,
    //         age
    //     })

    //     return this.userRepository.save(user)
    // }

    // async remove(request: Request, response: Response, next: NextFunction) {
    //     const id = parseInt(request.params.id)

    //     let userToRemove = await this.userRepository.findOneBy({ id })

    //     if (!userToRemove) {
    //         return "this user not exist"
    //     }

    //     await this.userRepository.remove(userToRemove)

    //     return "user has been removed"
    // }

}