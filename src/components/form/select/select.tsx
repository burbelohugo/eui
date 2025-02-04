import React, {
  SelectHTMLAttributes,
  OptionHTMLAttributes,
  Ref,
  FunctionComponent,
} from 'react';
import { CommonProps } from '../../common';
import classNames from 'classnames';
import {
  EuiFormControlLayout,
  EuiFormControlLayoutProps,
} from '../form_control_layout';
import { EuiValidatableControl } from '../validatable_control';
import { EuiFormControlLayoutIconsProps } from '../form_control_layout/form_control_layout_icons';

export interface EuiSelectOptionProps
  extends OptionHTMLAttributes<HTMLOptionElement> {
  text: React.ReactNode;
}

export type EuiSelectProps = SelectHTMLAttributes<HTMLSelectElement> &
  CommonProps & {
    options?: EuiSelectOptionProps[];
    isInvalid?: boolean;
    fullWidth?: boolean;
    isLoading?: boolean;

    /**
     * Simulates no selection by creating an empty, selected, hidden first option
     */
    hasNoInitialSelection?: boolean;
    inputRef?: Ref<HTMLSelectElement>;

    /**
     * when `true` creates a shorter height input
     */
    compressed?: boolean;

    /**
     * Creates an input group with element(s) coming before select
     */
    prepend?: EuiFormControlLayoutProps['prepend'];
    /**
     * Creates an input group with element(s) coming after select
     */
    append?: EuiFormControlLayoutProps['append'];
  };

export const EuiSelect: FunctionComponent<EuiSelectProps> = ({
  className,
  options = [],
  id,
  name,
  inputRef,
  isInvalid,
  fullWidth = false,
  isLoading = false,
  hasNoInitialSelection = false,
  defaultValue,
  compressed = false,
  value,
  prepend,
  append,
  onMouseUp,
  ...rest
}) => {
  const handleMouseUp = (e: React.MouseEvent<HTMLSelectElement>) => {
    // Normalizes cross-browser mouse eventing by preventing propagation,
    // notably for use in conjunction with EuiOutsideClickDetector.
    // See https://github.com/elastic/eui/pull/1926 for full discussion on
    // rationale and alternatives should this intervention become problematic.
    e.nativeEvent.stopImmediatePropagation();
    if (onMouseUp) onMouseUp(e);
  };

  const classes = classNames(
    'euiSelect',
    {
      'euiSelect--fullWidth': fullWidth,
      'euiSelect--compressed': compressed,
      'euiSelect--inGroup': prepend || append,
      'euiSelect-isLoading': isLoading,
    },
    className
  );

  let emptyOptionNode;
  if (hasNoInitialSelection) {
    emptyOptionNode = (
      <option value="" disabled hidden style={{ display: 'none' }}>
        &nbsp;
      </option>
    );
  }

  // React HTML input can not have both value and defaultValue properties.
  // https://reactjs.org/docs/uncontrolled-components.html#default-values
  let selectDefaultValue;
  if (value == null) {
    selectDefaultValue = defaultValue || '';
  }

  const icon: EuiFormControlLayoutIconsProps['icon'] = {
    type: 'arrowDown',
    side: 'right',
  };

  return (
    <EuiFormControlLayout
      icon={icon}
      fullWidth={fullWidth}
      isLoading={isLoading}
      compressed={compressed}
      prepend={prepend}
      append={append}
      inputId={id}>
      <EuiValidatableControl isInvalid={isInvalid}>
        <select
          id={id}
          name={name}
          className={classes}
          ref={inputRef}
          defaultValue={selectDefaultValue}
          value={value}
          onMouseUp={handleMouseUp}
          {...rest}>
          {emptyOptionNode}
          {options.map((option, index) => {
            const { text, ...rest } = option;
            return (
              <option {...rest} key={index}>
                {text}
              </option>
            );
          })}
        </select>
      </EuiValidatableControl>
    </EuiFormControlLayout>
  );
};
