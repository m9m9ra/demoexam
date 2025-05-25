import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Partner } from "./Partner";
import { Product } from "./Product";

@Entity("sales_history")
export class SalesHistory {
    @PrimaryGeneratedColumn()
    sale_id;

    @Column({ type: "integer" })
    partner_id;

    @Column({ type: "integer" })
    product_id;

    @Column({ type: "integer" })
    quantity;

    @Column({ type: "timestamp" })
    sale_date;

    @ManyToOne(() => Partner, (partner) => partner.sales_history)
    partner;

    @ManyToOne(() => Product, (product) => product.sales_history)
    product;
}