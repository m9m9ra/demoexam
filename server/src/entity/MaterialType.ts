import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("material_types")
export class MaterialType {
    @PrimaryGeneratedColumn()
    material_type_id;

    @Column({ type: "varchar", length: 100, nullable: false })
    material_type_name;

    @Column({ type: "decimal", precision: 5, scale: 2 })
    defect_percentage;
}