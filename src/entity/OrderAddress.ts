import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from "typeorm";
import { User } from "./User";

@Entity()
export class OrderAddress {
  @PrimaryGeneratedColumn({ type: "smallint" })
  id: number;

  @ManyToOne(() => User, (order_detail) => order_detail.order_address)
  order_detail: User;

  @Column("simple-json", { default: null })
  address: {
    city: string;
    country: string;
    line1: string;
    line2: string;
    postal_code: bigint;
    state: string;
  };
}
