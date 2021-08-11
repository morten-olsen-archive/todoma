import {
  Entity,
  PrimaryColumn,
  Column,
  Tree,
  ManyToMany,
  JoinTable,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import RemoteTask from './RemoteTask';

type Statuses = 'inbox' | 'watching' | 'backlog' | 'next' | 'on-hold';

@Entity()
@Tree('closure-table')
class LocalTask {
  @PrimaryColumn()
  public id!: string;

  @Column()
  public title!: string;

  @Column({ type: String })
  public status!: Statuses;

  @Column({ nullable: true })
  public description?: string;

  @Column({ nullable: true })
  public completionDate?: Date | null;

  @Column({ nullable: true })
  public pinned?: boolean;

  @Column({ nullable: true })
  public startDate?: Date;

  @Column({ nullable: true })
  public deadline?: Date;

  @ManyToMany(() => RemoteTask)
  @JoinTable()
  public remoteTasks!: RemoteTask[];

  // TODO: Add context, location(?), correspondant(?)

  @TreeChildren()
  public children!: LocalTask[];

  @TreeParent()
  public parent?: LocalTask;
}

export type { Statuses };

export default LocalTask;
