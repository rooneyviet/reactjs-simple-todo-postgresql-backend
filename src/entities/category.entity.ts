import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import Model from './model.entity';
import { Todo } from './todo.entity';
import { User } from './user.entity';

@Entity('categories')
export class Category extends Model {
  @Column()
  title: string;

  @Column({
    default: '#FFFFFF',
  })
  color: string;

  @Column({ name: 'userId', type: 'uuid', nullable: false })
  public userId: string;

  @OneToMany(() => Todo, (todo) => todo.category)
  todos: Todo[];

  @ManyToOne(() => User, (user) => user.categories)
  @JoinColumn({name: 'userId'})
  user: User;
}