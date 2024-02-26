import { GroupBase, StylesConfig } from "react-select";
import { Option } from "../../pages/spawners/Spawners.types.ts";

export const DROPDOWN_STYLES = <T extends boolean = false>(isFullWidth: boolean = true): StylesConfig<Option, T, GroupBase<Option>> => {
  return {
    control: (provided, { isDisabled }) => ({
      ...provided,
      width: isFullWidth ? '100%' : '200px',
      backgroundColor: isDisabled ? 'grey' : '#141414',
      border: '1px solid #272727',
      borderRadius: '8px',
      boxShadow: 'none',
      padding: '2px 8px',
      '&:hover': {
        border: '1px solid #806534',
      },
      '&:active': {
        border: '1px solid #806534',
      },
    }),
    menuList: (provided) => ({
      ...provided,
      backgroundColor: '#141414',
      border: '1px solid #272727',
      borderRadius: '8px',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#141414',
      borderRadius: '8px',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#272727' : '#141414',
      color: state.isSelected ? '#F9C666' : '#9F9B93',
      '&:hover': {
        backgroundColor: '#272727',
      }
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#9F9B93',
    }),
    placeholder: (provided, { isDisabled }) => ({
      ...provided,
      color: isDisabled ? '#272727' : '#9F9B93',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#9F9B93',
      '&:hover': {
        color: '#806534',
      }
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: '#9F9B93',
      '&:hover': {
        color: '#806534',
      }
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      backgroundColor: '#272727',
    }),
    input: (provided) => ({
      ...provided,
      color: '#9F9B93',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#1a1d20',
      border: '1px solid #343a40',
      borderRadius: '0.375rem',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#dee2e6',
      paddingLeft: '9px',
    }),
  }
}
