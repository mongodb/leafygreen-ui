import { MouseEventHandler, ChangeEvent, ReactNode } from 'react';
import { URLSInterface } from '../types';

type pickedUrls = Pick<URLSInterface, 'mongoSelect'>;

export type mongoSelectUrls = NonNullable<pickedUrls[keyof pickedUrls]>;

export interface BaseMongoSelectProps {
  onClick?: MouseEventHandler;
  onChange?: (_value: string, _event: ChangeEvent) => void;
  loading?: boolean;
  urls: mongoSelectUrls;
}

export interface BaseTriggerProps {
  children?: ReactNode;
  placeholder: string;
  open?: boolean;
  disabled?: boolean;
  loading?: boolean;
}
