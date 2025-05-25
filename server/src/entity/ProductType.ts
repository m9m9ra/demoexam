import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Product } from "./Product";

@Entity("product_types")
export class ProductType {
    @PrimaryGeneratedColumn()
    product_type_id;

    @Column()
    product_type_name: string;

    @Column({type: 'decimal'})
    coefficient: number;

    @OneToMany(() => Product, (product) => product.product_type)
    products;
}