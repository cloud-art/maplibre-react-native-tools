import type { LayerRules, LayerStyle } from '../../../types';

import { memo } from 'react';

import { SymbolizerResolver } from './SymbolizerResolver';

// #region Types
export type SymbolizersProps = {
  baseId: string;
  sourceId: string;
  rules: LayerRules[];
  style?: LayerStyle;
};
// #endregion

export const Symbolizers = memo(function Symbolizers({
  baseId,
  rules,
  sourceId,
  style,
}: SymbolizersProps) {
  // #region Render
  return rules.map(({ name, filter, maxZoom, minZoom, symbolizers }) => {
    const symbolId = `${baseId}-${name}-symbolizer`;

    return symbolizers?.map(symbol => (
      <SymbolizerResolver
        key={symbolId}
        filter={filter}
        id={symbolId}
        maxZoom={maxZoom}
        minZoom={minZoom}
        sourceId={sourceId}
        style={style}
        symbol={symbol}
      />
    ));
  });
  // #endregion
});
