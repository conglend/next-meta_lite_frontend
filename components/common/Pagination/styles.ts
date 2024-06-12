import { PaginationItem } from '@mui/material';

import styled from 'styled-components';

export const StyledPaginationItem = styled(PaginationItem)`
  &.MuiPaginationItem-root {
    margin: 0 5px;
    border: 1px solid #dee1eb;
    width: 36px;
    height: 36px;
    font-weight: 500;
    font-size: 13px;
    line-height: 19px;
    color: #6D7380;
  }

  &.MuiPaginationItem-ellipsis {
    border-radius: 4px;
    padding-top: 2px;
    font-size: 20px;
    font-weight: 600;
  }

  &.Mui-selected {
    color: #ffffff !important;
    font-weight: bold;
    background-color: #25ADE7 !important;
  }
  &.Mui-selected:disabled {
    opacity:0.5 !important;
  }
  &.Mui-selected:hover{
    background-color: #074059 !important;
  }
`;
