type ExpressionName =
  // Types
  | 'array'
  | 'boolean'
  | 'collator'
  | 'format'
  | 'image'
  | 'literal'
  | 'number'
  | 'number-format'
  | 'object'
  | 'string'
  | 'to-boolean'
  | 'to-color'
  | 'to-number'
  | 'to-string'
  | 'typeof'
  // Feature data
  | 'accumulated'
  | 'feature-state'
  | 'geometry-type'
  | 'id'
  | 'line-progress'
  | 'properties'
  // Lookup
  | 'at'
  | 'get'
  | 'has'
  | 'in'
  | 'index-of'
  | 'length'
  | 'slice'
  // Decision
  | '!'
  | '!='
  | '<'
  | '<='
  | '=='
  | '>'
  | '>='
  | 'all'
  | 'any'
  | 'case'
  | 'match'
  | 'coalesce'
  | 'within'
  // Ramps, scales, curves
  | 'interpolate'
  | 'interpolate-hcl'
  | 'interpolate-lab'
  | 'step'
  // Variable binding
  | 'let'
  | 'var'
  // String
  | 'concat'
  | 'downcase'
  | 'is-supported-script'
  | 'resolved-locale'
  | 'upcase'
  // Color
  | 'rgb'
  | 'rgba'
  | 'to-rgba'
  // Math
  | '-'
  | '*'
  | '/'
  | '%'
  | '^'
  | '+'
  | 'abs'
  | 'acos'
  | 'asin'
  | 'atan'
  | 'ceil'
  | 'cos'
  | 'distance'
  | 'e'
  | 'floor'
  | 'ln'
  | 'ln2'
  | 'log10'
  | 'log2'
  | 'max'
  | 'min'
  | 'pi'
  | 'round'
  | 'sin'
  | 'sqrt'
  | 'tan'
  // Zoom, Heatmap
  | 'zoom'
  | 'heatmap-density';

type ExpressionField =
  | string
  | number
  | boolean
  | Expression
  | ExpressionField[]
  | { [key: string]: ExpressionField };

export type Expression = readonly [ExpressionName, ...ExpressionField[]];
