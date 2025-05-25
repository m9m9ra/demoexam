import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { ProductType } from "./ProductType";
import { SalesHistory } from "./SalesHistory";

@Entity("products")
export class Product {
    @PrimaryGeneratedColumn()
    product_id;

    @Column({ type: "varchar", length: 100, nullable: false })
    product_name;

    @Column({ type: "integer" })
    product_type_id;

    @Column({ type: "integer" })
    quantity_in_stock;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    price;

    @ManyToOne(() => ProductType, (product_type) => product_type.products)
    product_type;

    @OneToMany(() => SalesHistory, (sales_history) => sales_history.product)
    sales_history;
}