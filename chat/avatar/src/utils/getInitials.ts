export const getInitials = (str: string) =>
  str
    .split(' ')
    .map(n => n[0])
    .join('');
