import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { Materia } from "./Material";

@Entity()
export class ProductMaterial {
    @PrimaryGeneratedColumn({type: 'integer'})
    product_material_id: number;

    @Column({ type: 'decimal' })
    requiredAmount: number;

    @ManyToOne(() => Product, (product) => product.productMaterial)
    product: Product;

    @ManyToOne(() => Materia, (material) => material.materialType)
    material: Materia;
}