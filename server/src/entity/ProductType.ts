import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity()
export class ProductType {
    @PrimaryGeneratedColumn({type: "integer"})
    product_type_id: number

    @Column({ type: 'varchar' })
    type: string;

    @Column({ type: 'decimal' })
    coefficient: number;

    @OneToMany(() => Product, (product) => product.productType)
    product: Product[]
}