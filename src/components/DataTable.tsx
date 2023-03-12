import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box
} from '@chakra-ui/react'
import { DataTableProps, RowProps } from '../types'
import PageInput from './PageInput'

const DataTable: React.FC<DataTableProps> = ({ 
  dataset, 
  currentPage, 
  totalPageCount,
  setCurrentPage, 
}) => {

  const headings = ['country name', 'region', 'area size']

  return (
    <>
      <Box 
        my='2.5'
        h='70vh' 
        overflow='auto'
        css={{
          '&::-webkit-scrollbar': {
            width: '0.5rem',
          },
          '&::-webkit-scrollbar-track': {
            width: '1rem',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#9ae6b4',
            borderRadius: '24px',
          },
        }}
      >
        <Table variant='striped' colorScheme='green'>
          <Thead>
            <Tr>
              { headings.map((heading, index) => <Th key={index}>{heading}</Th>) }
            </Tr>
          </Thead>

          <Tbody>
            {
              dataset.map(
                (data, index) => <Row key={index} data={data}/>
              )
            }
          </Tbody>
        </Table>
        
        
      </Box>
      <PageInput 
        totalPageCount={totalPageCount} 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
      />
    </>
  )
}

const Row: React.FC<RowProps> = ({data}) => {

  const keys = ['name', 'region', 'area']

  return (
    <Tr>
      {
        keys.map(
          (key, index) => (
            <Td key={index} > 
              { data[key] == null ? "N/A" : data[key] }
            </Td>
          )
        )
      }
    </Tr>
  )
}
export default DataTable