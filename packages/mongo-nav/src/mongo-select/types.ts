import { MouseEventHandler, ChangeEvent, ReactNode } from 'react';
import { URLSInterface } from '../types';

export type MongoSelectUrls = NonNullable<URLSInterface['mongoSelect']>;

interface OnChangeInterface {
  value: string;
  setData: Function;
  event: ChangeEvent;
}

export interface BaseMongoSelectProps {
  className?: string;
  onClick?: MouseEventHandler;
  onChange?: (OnChangeInterface: OnChangeInterface) => void;
  loading?: boolean;
  urls: MongoSelectUrls;
}

export interface BaseTriggerProps {
  className?: string;
  children?: ReactNode;
  placeholder: string;
  open?: boolean;
  disabled?: boolean;
  loading?: boolean;
}
