import {
  Box,
  Container,
} from '@chakra-ui/react'

import { 
  CountriesData, 
  PartitionedList, 
  StateHolderProps 
} from '../types'

import { arrayPartitioner } from '../utils'

import { useState, useEffect } from "react"

import GroupMenu from './GroupMenu'
import DataTable from './DataTable'

const StateHolder: React.FC<StateHolderProps> = ({countriesData, isFetchingData}) => {

  const [currentPage, setCurrentPage] = useState<number>(1)

  const [rowsPerPage, setRowsPerPege] = useState<number>(10)
  
  const [totalPageCount, setTotalPageCount] = useState<number>(0)

  const [
    partitionedList, 
    setPartitionedList
  ] = useState<PartitionedList>(arrayPartitioner(countriesData, rowsPerPage))
  
  const [
    listToRender, 
    setListToRender
  ] = useState<CountriesData>([])

  useEffect(() => {
    setPartitionedList(arrayPartitioner(countriesData, rowsPerPage));
  }, [countriesData, rowsPerPage]);
  
  useEffect(() => {
    setListToRender(partitionedList[currentPage - 1]);
    setTotalPageCount(partitionedList.length);
  }, [partitionedList, currentPage]);

  return (
    <main>
      <GroupMenu 
        countriesData={countriesData}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        listToRender={listToRender}
        totalPageCount={totalPageCount}
        partitionedList={partitionedList}
        setCurrentPage={setCurrentPage}
        setListToRender={setListToRender} 
        setTotalPageCount={setTotalPageCount}
        setPartitionedList={setPartitionedList}
      />

      <Container py='1.5'>
        <Box>
          {
            !isFetchingData && 
            <DataTable 
              dataset={listToRender}
              currentPage={currentPage} 
              rowsPerPage={rowsPerPage}
              totalPageCount={totalPageCount}
              setCurrentPage={setCurrentPage} 
            />
          }
        </Box>
      </Container>
    </main>
  )
}

export default StateHolder