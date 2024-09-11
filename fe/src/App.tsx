import { useState } from 'react';
import Button from './components/atoms/Button';
import Image from './components/atoms/Images';

import CalendarIcon from "@public/assets/icons/calendarIcon.png"
import Span from './components/atoms/Span';


function App() {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleButtonClick = () => {
    setIsButtonClicked((prev) => !prev);  
  };

  return (
    <div style={{ width: "100%", height:"100%", backgroundColor:"white" }}>
      <Button>
        기본
      </Button>
      <Button 
      
        width="10rem" 
        height="4rem" 
        isClicked={isButtonClicked}  
        onClick={handleButtonClick}  
        color={'red'}
      >
        클릭 상태 변경 버튼
      </Button>
      <Image
        src= {CalendarIcon}
        width="200px"
        height="200px"
        borderRadius="10px"
        boxShadow={true}
        isClicked={true}
      />
      <Image
        src= {CalendarIcon}
        width="100px"
        height="100px"
        borderRadius="10px"
        boxShadow={true}
        isClicked={true}
      />
      <Span color="blue" fontSize="20px" fontWeight="bold" textAlign="center">
        이 텍스트는 중앙 정렬되고 파란색입니다.
      </Span>
      <Span margin="10px 0" textTransform="uppercase">
      uppercase
      </Span>
    </div>
  );
}

export default App;