import { MouseEventHandler, ChangeEvent, ReactNode } from 'react';
import { URLSInterface } from '../types';

type pickedUrls = Pick<URLSInterface, 'mongoSelect'>;

export type MongoSelectUrls = NonNullable<URLSInterface['mongoSelect']>;

export interface BaseMongoSelectProps {
  className?: string;
  onClick?: MouseEventHandler;
  onChange?: (_value: string, _event: ChangeEvent) => void;
  loading?: boolean;
  urls: mongoSelectUrls;
}

export interface BaseTriggerProps {
  className?: string;
  children?: ReactNode;
  placeholder: string;
  open?: boolean;
  disabled?: boolean;
  loading?: boolean;
}
