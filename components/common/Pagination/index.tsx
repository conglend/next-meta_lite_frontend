import MuiPagination from '@mui/material/Pagination'
import { StyledPaginationItem } from './styles'
import { CircularProgress, Box } from '@mui/material'

type Props = {
  page: number
  totalPage: number
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void
  status: string
}

const PaginationCustom = ({ page = 1, onChange, totalPage, status }: Props) => {
  return (
    <>
      <MuiPagination
        count={totalPage}
        page={page}
        variant='outlined'
        shape='rounded'
        onChange={onChange}
        disabled={status === 'loading'}
        renderItem={(item) => {
          const isActivePage = item.page === page
          return (
            <Box sx={{ position: 'relative' }}>
              {isActivePage && status === 'loading' && (
                <CircularProgress
                  sx={{ position: 'absolute', top: '2px', left: "6px", zIndex: 1 }}
                  color={'error'}
                  size={32}
                />
              )}
              <StyledPaginationItem {...item} />
            </Box>
          )
        }}
      />
    </>
  )
}

export default PaginationCustom
