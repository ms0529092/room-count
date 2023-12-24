import React, { useState, useCallback, useMemo, useEffect} from "react";
import tw from "tailwind-styled-components"

const CustomInputNumber = (props) => {
    const {
        min,
        max,
        step,
        name,
        value,
        disabled,
        totalMaxDisabled = false,
        onChange,
        onBlur
    } = props;

    const [ count, setCount ] = useState(Number(value))

    const isButtonMaxDisabled = useMemo(()=> count >= max ,[count]);
    const isButtonMinDisabled = useMemo(()=> count <= min ,[count]);
    const isInputOnlyNumber = (e) => /^\d*\.?\d*$/.test(e.target.value);

    const getMinMaxValue = (inputValue, min, max) => {
        if(inputValue > max){
            return max
        } 

        if(inputValue < min){
            return min
        }

        return inputValue
    }

    const doSomethingWhenClick = (e) => {
        switch (e.target.id) {
            case `${name}_reduce`:
                setCount(count - step)
            break;
            case `${name}_add`:
                setCount(count + step)
            break;
        }
    }

    const buttonClick = async (e) => {

        await doSomethingWhenClick(e)
        inputChange(e)

    }

    const inputChange = async (e) => {
        if(Object.is(e.target.id, `${name}_input`)){
            const newInputValue = getMinMaxValue(e.target.value, min, max)
            await setCount(Number(newInputValue))
        }

        await onChange(e)
    }

    const inputNumberBlur = useCallback((e) => {
        console.log('inputBlur')
        onBlur(e)
    },[value]);

    return (
        <div className="py-2 px-3 inline-block" data-hs-input-number>
            <div className="flex items-center gap-x-1.5">
                <CustomButton 
                    type={'button'} 
                    id={`${name}_reduce`} 
                    name={`${name}`}
                    value={count} 
                    disabled={isButtonMinDisabled || disabled}
                    onBlur={inputNumberBlur}
                    onMouseDown={buttonClick}
                >
                    -
                </CustomButton>
                <CustomInput 
                    type={'number'}
                    id={`${name}_input`}
                    name={`${name}`}
                    value={String(count)} 
                    disabled={disabled} 
                    onBlur={inputNumberBlur}
                    onChange={(e)=> isInputOnlyNumber(e) && inputChange(e)}
                />
                <CustomButton 
                    type={'button'}
                    id={`${name}_add`}
                    name={`${name}`} 
                    value={count} 
                    disabled={totalMaxDisabled || isButtonMaxDisabled || disabled}
                    onBlur={inputNumberBlur}
                    onMouseDown={buttonClick}
                >
                    +
                </CustomButton>
            </div>
        </div>
    )
}

export default CustomInputNumber;

const CustomButton = tw.button`
    w-[48px]
    h-[48px]
     
    inline-flex 
    justify-center 
    items-center 
    gap-x-2 
    
    text-[20px] 
    text-[#01DCF0]
    
    border 
    border-[#01DCF0]  
    rounded-md 

    hover:bg-gray-50 
    
    disabled:opacity-50 
    disabled:text-[#808080]
    disabled:border-[#808080]
    disabled:pointer-events-none
`;

const CustomInput = tw.input`
    p-0 
    
    w-[48px]
    h-[48px]
    
    bg-transparent 
    border 
    border-[#808080]  
    rounded-md 

    text-gray-800 
    text-center 

    focus:ring-0
    disabled:opacity-50
`;