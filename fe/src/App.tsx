import  { useState } from 'react';
import Button from './components/atoms/Button';

function App() {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleButtonClick = () => {
    setIsButtonClicked((prev) => !prev);  
  };

  return (
    <div style={{ width: "11rem" }}>
      <Button>
        기본
      </Button>
      <Button 
        width="11rem" 
        height="4rem" 
        isClicked={isButtonClicked}  
        onClick={handleButtonClick}  
      >
        클릭 상태 변경 버튼
      </Button>
    </div>
  );
}

export default App;