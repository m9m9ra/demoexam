import { AppDataSource } from "../config/data-source"
import { NextFunction, Request, Response } from "express"
import { Order } from "../entity/Order"
import { Partner } from "../entity/Partner"

export class UserController {

    private userRepository = AppDataSource.getRepository(Order)
    private partnerRepository = AppDataSource.getRepository(Partner)

    async get(request: Request, response: Response, next: NextFunction) {
        return this.partnerRepository.find({
            relations: {
                orders: true,
                sales_history: {
                    partner: true,
                    product: true
                }
            }
        });
    }

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const user = await this.userRepository.findOne({
            where: { order_id: id }
        })

        if (!user) {
            return "unregistered user"
        }
        return user
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { firstName, lastName, age } = request.body;

        // const user = Object.assign(new User(), {
        //     firstName,
        //     lastName,
        //     age
        // })

        // return this.userRepository.save(user)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let userToRemove = await this.userRepository.findOneBy({ order_id: id })

        if (!userToRemove) {
            return "this user not exist"
        }

        await this.userRepository.remove(userToRemove)

        return "user has been removed"
    }

}