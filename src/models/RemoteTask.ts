import { Entity, PrimaryColumn, Column, ManyToOne, ManyToMany } from 'typeorm';
import RemoteTaskProvider from './RemoteTaskProvider';
import LocalTask from './LocalTask';

@Entity()
class RemoteTask {
  @PrimaryColumn()
  public id!: string;

  @Column({ nullable: true })
  public title?: string;

  @Column({ nullable: true })
  public dataType?: string;

  @Column({ nullable: true })
  public description?: string;

  @Column({ nullable: true })
  public open?: boolean;

  @Column({ nullable: true })
  public raw?: string;

  @Column()
  public read!: boolean;

  @ManyToOne(() => RemoteTaskProvider)
  public provider!: RemoteTaskProvider;

  @ManyToMany(() => LocalTask, (task) => task.remoteTasks)
  public localTasks!: LocalTask[];
}

export default RemoteTask;
