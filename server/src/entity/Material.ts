import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductType } from "./ProductType";
import { MaterialType } from "./MaterialType";
import { ProductMaterial } from "./ProductMaterial";

@Entity()
export class Materia {
    @PrimaryGeneratedColumn({ type: 'int' })
    material_id: number;

    @Column({ type: 'varchar' })
    name: string;

    @ManyToOne(() => MaterialType, (materia_type) => materia_type.material)
    materialType: MaterialType;

    @Column({ type: 'decimal' })
    price: number;

    @Column({ type: 'decimal' })
    stock: number;

    @Column({ type: 'decimal' })
    minStock: number;

    @Column({ type: 'int' })
    packSize: number;

    @Column({ type: 'varchar' })
    unit: string;

    // dep
    // it`s neeeeed ?
    @OneToMany(() => ProductMaterial, (product_material) => product_material.material)
    productMaterial: ProductMaterial[]
}