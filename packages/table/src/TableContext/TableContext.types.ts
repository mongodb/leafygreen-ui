import { PropsWithChildren } from "react"
import { TableProps } from "../Table/Table.types"

export type TableContextValues = PropsWithChildren<
  Pick<TableProps, 'darkMode' | 'shouldAlternateRowColor'>
>