import { MouseEventHandler, ReactNode } from 'react';
import { MongoNavInterface, OnChangeInterface } from '../types';

export type BaseMongoSelectProps = Pick<
  MongoNavInterface,
  'hosts' | 'admin' | 'mode'
> & {
  className?: string;
  onClick?: MouseEventHandler;
  onChange?: (OnChangeInterface: OnChangeInterface) => void;
  loading?: boolean;
};

export interface BaseTriggerProps {
  className?: string;
  children?: ReactNode;
  placeholder: string;
  open?: boolean;
  disabled?: boolean;
  loading?: boolean;
}
