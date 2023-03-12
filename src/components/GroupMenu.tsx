import {
  Button, 
  ButtonGroup,
  Menu,
  MenuButton,
  MenuGroup,
  MenuList,
  MenuItem,
  Flex,
  Spacer,
  HStack,
  Icon,
  Tooltip,
} from '@chakra-ui/react'

import { CgSortAz } from 'react-icons/cg'
import { GroupMenuProps, PartialCountryData } from '../types'

import { arrayPartitioner } from '../utils'

const GroupMenu: React.FC<GroupMenuProps> = ({ 
  countriesData,
  rowsPerPage,
  currentPage,
  listToRender,
  totalPageCount,
  partitionedList,
  setCurrentPage,
  setListToRender,
  setTotalPageCount,
  setPartitionedList,
}) => {

  const sortNameAscending = (
    a:PartialCountryData, 
    b:PartialCountryData
  ) => (a.name??'').localeCompare(b.name??'');

  const sortNameDescending = (
    a:PartialCountryData, 
    b:PartialCountryData
  ) => (b.name??'').localeCompare(a.name??'');
  
  return (
    <Flex bg='green.200' maxW='full'>
      <ButtonGroup px='2.5' py='1.5' spacing='5'>
        <Tooltip label='Prev Page'>
          <Button 
            rounded='full' 
            px='10' 
            bg='green.300'
            isDisabled={currentPage === 1 ? true : false}
            onClick={
              ()=> {
                setCurrentPage((currentPage)=> {
                  if(currentPage === 1) return 1
                  return currentPage -1
                })
              }
            }
          >Prev</Button>
        </Tooltip>
        <Tooltip label='Next Page'>
          <Button 
            rounded='full' 
            px='10' 
            bg='green.300' 
            isDisabled={currentPage == totalPageCount ? true : false}
            onClick={
              ()=> {
                setCurrentPage(currentPage => {
                  if(currentPage == totalPageCount) return totalPageCount
                  return currentPage + 1
                })
              }
            }
          >Next</Button>
        </Tooltip>
      </ButtonGroup>

      <Spacer/>
      
      <HStack px='2.5' py='1.5'>
        
        <Menu>
          <Tooltip label='Sort Name'>
            <MenuButton as={Button} rounded='full' variant='ghost'>
              <Icon as={CgSortAz} boxSize={10}></Icon>
            </MenuButton>
          </Tooltip>
          <MenuList>
            <MenuGroup title='Current Page Order'>
              <MenuItem
                onClick={
                  ()=> {
                    setListToRender(
                      [...listToRender].sort( sortNameAscending )
                    )
                  }
                }
              >Ascending</MenuItem>
              <MenuItem 
                onClick={
                  ()=> {
                    setListToRender(
                      [...listToRender].sort( sortNameDescending )
                    )
                  }
                }
              >Descending</MenuItem>
            </MenuGroup>

            <MenuGroup title='Full Data Order'>
              <MenuItem 
                onClick={
                  ()=> {
                    const AscendingAllList = partitionedList
                      .reduce((assembled, segment) => [...assembled, ...segment])
                      .sort( sortNameAscending )
                    setCurrentPage(1)

                    setPartitionedList(
                      arrayPartitioner(AscendingAllList, rowsPerPage)
                    )
                  }
                }
              >Ascend All</MenuItem>

              <MenuItem 
                onClick={
                  ()=> {
                    const descendingAllList = partitionedList
                      .reduce((assembled, segment) => [...assembled, ...segment])
                      .sort( sortNameDescending )
                    setCurrentPage(1)

                    setPartitionedList(
                      arrayPartitioner(descendingAllList, rowsPerPage)
                    )
                  }
                }
              >Descend All</MenuItem>
            </MenuGroup>

          </MenuList>
        </Menu>
        
        <Menu>
          <Tooltip label='Available Actions'>
            <MenuButton as={Button} rounded='full' px='10' bg='green.300'>
              Actions
            </MenuButton>
          </Tooltip>

          <MenuList>
            <MenuItem 
              onClick={
                ()=> {
                  const partitionedList = arrayPartitioner(countriesData, rowsPerPage)

                  setCurrentPage(1)

                  setTotalPageCount(partitionedList.length)

                  setPartitionedList(partitionedList)
                }
              }
            >Reset</MenuItem>

            <MenuItem 
              onClick={
                ()=> {
                  const lithuania: PartialCountryData| undefined = countriesData
                    .find(country => country.name === 'Lithuania')

                  const smallerThanLithuania = [...countriesData]
                    .filter(
                      country => (country?.area ?? 0) < (lithuania?.area ?? 0)
                    )

                  const partitionedList = arrayPartitioner(smallerThanLithuania, rowsPerPage)

                  setCurrentPage(1)

                  setTotalPageCount(partitionedList.length)

                  setPartitionedList(partitionedList)
                }
              }
            >Filter countries that are smaller than Lithuania by area.</MenuItem>

            <MenuItem 
              onClick={
                ()=> {
                  const oceaniaRegion = countriesData
                    .filter(country => country.region === 'Oceania')

                  const partitionedList = arrayPartitioner(oceaniaRegion, rowsPerPage)

                  setCurrentPage(1)

                  setTotalPageCount(partitionedList.length)

                  setPartitionedList(partitionedList)
                }
              }
            >Filter countries that are in “Oceania” region.</MenuItem>

          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  )
}

export default GroupMenu