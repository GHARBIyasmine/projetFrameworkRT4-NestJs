import { GroupEntity } from 'src/groups/groups/entities/groups.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity('tag')
export class TagEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique: true })
    value: string;
  
    @ManyToMany(
        () => GroupEntity,
        group => group.tags,
        {
            cascade: ['insert', 'update'],
            
        })
    groups: GroupEntity[];

}
