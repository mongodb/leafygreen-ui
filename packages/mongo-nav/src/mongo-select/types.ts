import { MouseEventHandler, ReactNode } from 'react';
import { HostsInterface, URLSInterface, OnChangeInterface } from '../types';

export type MongoSelectUrls = NonNullable<URLSInterface['mongoSelect']>;

export interface BaseMongoSelectProps {
  className?: string;
  onClick?: MouseEventHandler;
  onChange?: (OnChangeInterface: OnChangeInterface) => void;
  loading?: boolean;
  admin?: boolean;
  hosts?: HostsInterface;
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
