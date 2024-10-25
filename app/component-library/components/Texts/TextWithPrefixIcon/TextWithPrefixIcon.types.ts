// External dependencies.
import { TextProps, TextColor } from '../Text/Text.types';
import { IconProps } from '../../Icons/Icon';

/**
 * TextWithPrefixIcon component props.
 */
export interface TextWithPrefixIconProps extends TextProps {
  /**
   * Props of the Icon used.
   */
  iconProps: IconProps;
}

/**
 * Style sheet input parameters.
 */
export type TextWithPrefixIconStyleSheetVars = Pick<
  TextWithPrefixIconProps,
  'style'
> & {
  color: TextColor | string;
};
