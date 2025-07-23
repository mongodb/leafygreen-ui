import { ChangeType, ComponentUpdateObject } from '../release-bot.types';

export function getChangeType(
  componentUpdate: ComponentUpdateObject,
): ChangeType {
  const { version } = componentUpdate;

  if (version.endsWith('.0.0')) return 'major';
  if (version.endsWith('.0')) return 'minor';
  return 'patch';
}
