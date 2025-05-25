import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Partner } from "./Partner";

@Entity("orders")
export class Order {
    @PrimaryGeneratedColumn()
    order_id;

    @Column({ type: "integer" })
    partner_id;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    order_date;

    @Column({ type: "varchar", length: 50 })
    status;

    @ManyToOne(() => Partner, (partner) => partner.orders)
    partner;
}