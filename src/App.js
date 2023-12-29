import icon from './icon-arrow.svg'
import { useState } from 'react';

function App() {

  const [dayError, setDayError] = useState('');
  const [monthError, setMonthError] = useState('');
  const [yearError, setYearError] = useState('');

  const [day, setDay] = useState('--');
  const [month, setMonth] = useState('--');
  const [yr, setYr] = useState('--');

  const [formData, setFormData] = useState({
    day: '',
    month: '',
    year: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Check if the entered value is a number
    if (!isNaN(value)) {
      setFormData((prevState) => {
        // Use prevState to access the previous state
        checkForm(name, value);

        // Update the state based on the previous state
        return { ...prevState, [name]: value };
      });
    }
  }

  const formSubmit = (e) => {
    e.preventDefault();
    
    const isDayValid  = checkForm('day', formData.day);
    const isMonthValid  = checkForm('month', formData.month);
    const isYearValid  = checkForm('year', formData.year);

    if (isDayValid && isMonthValid && isYearValid ) {
      const age = calculateAge(formData.day, formData.month, formData.year);
      setDay(age.days);
      setMonth(age.months);
      setYr(age.years);
      console.log(age);
    }
  }

  function calculateAge(day, month, year) {
    const birthDate = new Date(year, month - 1, day);
    const currentDate = new Date();
  
    // Calculate the difference in years, months, and days
    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();
  
    // Adjust for negative months or days
    if (days < 0) {
      months--;
      const daysInLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
      days += daysInLastMonth;
    }
  
    if (months < 0) {
      years--;
      months += 12;
    }
  
    return {
      years,
      months,
      days
    };
  }

  //getting the days in every months including leap year
  function getNumberOfDays(year, month) {
    //checking if the year is divisible by 4, 100 and 400
    var isLeap = ((year % 4) == 0 && ((year % 100) != 0 || (year % 400) == 0));
    //array that contains the number of date in each month and will check if the certain year is leap year;
    var daysinMonths = [31, (isLeap ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // -1 in month is necessary cause the array count starts at 0
    return daysinMonths[month - 1];
  }

  function checkForm(name, value) {

    const currentYear = new Date().getFullYear();
    const numOfDays = getNumberOfDays(formData.year, formData.month);
    const currentDay = new Date().getDate();

    switch (name) {
      case 'day': 
        if (value === '') {
          setDayError('This field is required');
          return false;
        }
        if (value < 1 || value > numOfDays || value > currentDay) {
          setDayError('Must be a valid day');
          return false;
        }
        setDayError('');
        return true;

      case 'month': 
        if (value === '') {
          setMonthError('This field is required');
          return false;
        }
        if (value < 1 || value > 12) {
          setMonthError('Must be a valid month');
          return false;
        }
        setMonthError('');
        return true;

      case 'year': 
        if (value === '') {
          setYearError('This field is required');
          return false;
        }
        if (value < 1500) {
          setYearError('Must be in the present');
          return false;
        }
        if (value > currentYear) {
          setYearError('Must be in the past');
          return false;
        }
        setYearError('');
        return true;
      
      default:
        break;
    }
  }

  return (
    <main className="min-h-[100dvh] font-poppins bg-off-white flex items-center justify-center p-4">
      <form onSubmit={formSubmit}>
        <div className="bg-white p-14 max-md:py-12 max-md:px-6 rounded-s-3xl rounded-tr-3xl rounded-br-[200px] max-md:rounded-br-[100px] w-full lg:w-[840px] flex flex-col max-lg:gap-y-8">
          <div className="flex gap-x-8 max-md:gap-x-4">
            <div className="flex flex-col gap-y-2">
              <label className={`uppercase font-bold tracking-widest  text-14 max-md:text-12 ${dayError ? 'text-light-red' : 'text-smokey-grey' }`}>day</label>
              <input 
                type="text" 
                name='day'
                value={formData.day}
                onInput={handleChange}
                className={`outline outline-1 rounded-lg px-6 py-3 max-md:px-4 w-40 max-md:w-full placeholder:uppercase 
                placeholder:text-smokey-grey font-bold text-32 max-md:text-20 tracking-wide focus:outline-purple
                ${dayError ? 'outline-light-red' : 'outline-light-gray ' }`} 
                placeholder="dd"/>
                <p className={`${dayError ? '' : 'hidden'} text-14 italic text-light-red`}>{dayError}</p>
            </div> 
            <div className="flex flex-col gap-y-2">
              <label className={`uppercase font-bold tracking-widest  text-14 max-md:text-12 ${monthError ? 'text-light-red' : 'text-smokey-grey' }`}>month</label>
              <input 
                type="text" 
                name='month'
                value={formData.month}
                onInput={handleChange}
                className={`outline outline-1 rounded-lg px-6 py-3 max-md:px-4 w-40 max-md:w-full placeholder:uppercase 
                placeholder:text-smokey-grey font-bold text-32 max-md:text-20 tracking-wide focus:outline-purple
                ${monthError ? 'outline-light-red' : 'outline-light-gray ' }`} 
                placeholder="mm"/>
                <p className={`${monthError ? '' : 'hidden'} text-14 italic text-light-red`}>{monthError}</p>
            </div> 
            <div className="flex flex-col gap-y-2">
              <label className={`uppercase font-bold tracking-widest  text-14 max-md:text-12 ${yearError ? 'text-light-red' : 'text-smokey-grey' }`}>year</label>
              <input 
                type="text" 
                name='year'
                value={formData.year}
                onInput={handleChange}
                className={`outline outline-1 rounded-lg px-6 py-3 max-md:px-4 w-40 max-md:w-full placeholder:uppercase 
                placeholder:text-smokey-grey font-bold text-32 max-md:text-20 tracking-wide focus:outline-purple
                ${yearError ? 'outline-light-red' : 'outline-light-gray ' }`} 
                placeholder="yyyy"/>
                <p className={`${yearError ? '' : 'hidden'} text-14 italic text-light-red`}>{yearError}</p>
            </div> 
          </div>
          <div className="h-[96px] max-md:h-16 flex flex-col justify-center relative">
            <hr className="border-light-gray"></hr>
            <button className='rounded-full bg-purple h-24 w-24 max-md:h-16 max-md:w-16 p-6 max-md:p-4 absolute right-0 max-lg:right-1/2 max-lg:translate-x-1/2 hover:bg-off-black focus:bg-off-black'>
              <img src={icon} alt='icon'/>
            </button>
          </div>
          <div className="flex flex-col py-[5px] gap-y-2.5">
            <div>
              <h1 className="italic font-extrabold text-104 max-md:text-56 tracking-tightest text-purple">{yr}<span className="text-off-black tracking-tightest ml-2.5">years</span></h1>
            </div>
            <div>
              <h1 className="italic font-extrabold text-104 max-md:text-56 tracking-tightest text-purple">{month}<span className="text-off-black tracking-tightest ml-2.5">months</span></h1>
            </div>
            <div>
              <h1 className="italic font-extrabold text-104 max-md:text-56 tracking-tightest text-purple">{day}<span className="text-off-black tracking-tightest ml-2.5">days</span></h1>
            </div>
          </div>
        </div>   
      </form>
    </main>
  );
}

export default App;
