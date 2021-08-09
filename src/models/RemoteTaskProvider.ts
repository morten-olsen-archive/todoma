import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';

@Entity()
class RemoteTaskProvider {
  @PrimaryColumn()
  public id!: string;

  @Column()
  public type!: string;

  @Column()
  public config!: string;
}

export default RemoteTaskProvider;
