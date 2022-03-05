export type NgxCommandPaletteConfig = {
  readonly placeholder: string;
  readonly emptyText: string;
}

export const DefaultNgxCommandPaletteConfig: NgxCommandPaletteConfig = {
  emptyText: 'Nothing to show',
  placeholder: 'Type something to start searching...'
};
