import { FallbackAvatarProps } from '../FallbackAvatar';
import { MongoAvatarProps } from '../MongoAvatar';
import { UserAvatarProps } from '../UserAvatar';

export const Variant = {
  /**
   * Renders a MongoDB logo mark
   */
  Mongo: 'mongo',
  /**
   * Renders the user's name
   */
  User: 'user',
  /**
   * Renders a person icon
   */
  Default: 'default',
} as const;

export type Variant = (typeof Variant)[keyof typeof Variant];

export interface AvatarProps
  extends FallbackAvatarProps,
    MongoAvatarProps,
    UserAvatarProps {
  /**
   * Determines the Avatar component's variant.
   */
  variant?: Variant;
}
