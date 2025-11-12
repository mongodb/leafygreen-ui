import { PropsWithChildren } from 'react';

export interface LeafyGreenChatContextProps {
  /**
   * The name of the AI assistant that will be displayed when AI sends messages to users
   */
  assistantName: string;
}

export type LeafyGreenChatProviderProps = PropsWithChildren<
  Partial<Pick<LeafyGreenChatContextProps, 'assistantName'>>
>;
