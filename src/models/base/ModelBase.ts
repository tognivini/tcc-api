import {
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm'
  
  export abstract class ModelBase {
    @PrimaryGeneratedColumn('uuid')
    id: string
  
    @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
    createdAt: Date
  
    @UpdateDateColumn({
      type: 'timestamptz',
      name: 'updated_at',
      default: null,
      nullable: true,
    })
    updatedAt: Date
  }
  