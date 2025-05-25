import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Order } from "./Order";
import { SalesHistory } from "./SalesHistory";

@Entity("partners")
export class Partner {
    @PrimaryGeneratedColumn()
    partner_id;

    @Column({ type: "varchar", length: 100, nullable: false })
    partner_name;

    @Column({ type: "varchar", length: 50 })
    partner_type;

    @Column({ type: "integer" })
    rating;

    @Column({ type: "varchar", length: 255 })
    address;

    @Column({ type: "varchar", length: 100 })
    director_name;

    @Column({ type: "varchar", length: 20 })
    phone;

    @Column({ type: "varchar", length: 100 })
    email;

    @OneToMany(() => Order, (order) => order.partner)
    orders;

    @OneToMany(() => SalesHistory, (sales_history) => sales_history.partner)
    sales_history;
}