import {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
 
// CSS Modules, react-datepicker-cssmodules.css// 
import 'react-datepicker/dist/react-datepicker-cssmodules.css';


const Calendar = () => {  
  const [startDate, setStartDate] = useState(new Date());  
  return (      
<DatePicker 
    showIcon        
    selected={startDate}         
    onChange={(date) => field.onChange(date)}
    dateFormat="Pp"       
    showTimeSelect        
    timeFormat="p"  
    placeholderText="Select a date after 5 days ago" 
/>  
   );
};

export default Calendar