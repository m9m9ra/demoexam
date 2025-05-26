import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductType } from "./ProductType";
import { ProductMaterial } from "./ProductMaterial";

@Entity()
export class Product {
    @PrimaryGeneratedColumn({ type: 'int' })
    product_id: number;

    @ManyToOne(() => ProductType, (product_type) => product_type.product)
    productType: ProductType;

    @Column({ type: 'varchar' })
    name: string;

    @Column({type: 'integer'})
    article: number

    @Column({ type: 'decimal' })
    minCost: number;

    @Column({ type: 'decimal' })
    rollWidth: number;

    // it`s neeeeed ?
    @OneToMany(() => ProductMaterial, (product_material) => product_material.product)
    productMaterial: ProductMaterial[]
}