import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity({
    name: "products"
})
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    type: string;

    @Column()
    day: string;

    @CreateDateColumn({ type: 'date' })
    date: Date;

    @Column({ type: 'time'})
    hourStart: string;

    @Column({ type: 'time'})
    hourEnd: string;

    @Column('boolean', {default: false})
    state: boolean;

}