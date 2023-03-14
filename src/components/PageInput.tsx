import { 
  Flex, 
  NumberInput, 
  NumberInputField, 
  Box
} from '@chakra-ui/react';
import { PageInputProps } from '../types';

const PageInput: React.FC<PageInputProps> = ({ 
  totalPageCount, 
  currentPage, 
  setCurrentPage
}) => {

  return (
    <Box>
      <Flex maxW='768px' justify='center' my='1rem' mx='auto'>
        <NumberInput  
          allowMouseWheel
          defaultValue={1}
          min={1}
          max={totalPageCount}
          inputMode="numeric"
          onChange={
            (valueAsString, valueAsNumber:number)=> {
              if(valueAsNumber < 1) return setCurrentPage(1)
              if(valueAsNumber > totalPageCount) return setCurrentPage(totalPageCount)
              if(!Number.isNaN(valueAsNumber)) return setCurrentPage(valueAsNumber)
            }
          }
        >
          <NumberInputField 
            textAlign='center' 
            _focusVisible={{borderColor: '#68d391' }}
          />
        </NumberInput>
      </Flex>
    </Box>
  )
}

export default PageInput