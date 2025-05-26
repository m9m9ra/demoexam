import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Materia } from "./Material";

@Entity()
export class MaterialType {
    @PrimaryGeneratedColumn({type: "integer"})
    material_type_id: number

    @Column({ type: 'varchar' })
    type: string;

    @Column({ type: 'decimal', precision: 5, scale: 2})
    defectPercentage;

    @OneToMany(() => Materia, (materia) => materia.materialType)
    material: Materia[]
}