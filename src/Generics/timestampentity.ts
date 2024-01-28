import {CreateDateColumn, DeleteDateColumn, UpdateDateColumn} from "typeorm";



export class Timestampentity {

    @CreateDateColumn({
        update : false
    })
    createdAt : Date;

    @UpdateDateColumn()
    updatedAt : Date;

    @DeleteDateColumn()
    deletedAt : Date;
}