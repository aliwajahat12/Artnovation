import React, { useState } from "react";


const DropDown =(props)=> {
//   const options = [
//     { label: "Grapes ", value: "grapes" },
//     { label: "Mango ", value: "mango" },
//     { label: "Strawberry ", value: "strawberry" }
//   ];

//   const [selected, setSelected] = useState([ { label: "Grapes ", value: "grapes" }]);

  const [option,setOption] = useState()

function handleChange(event){
    setOption(event.target.value)
}
return (
<select name='option' onChange={handleChange}>
    <option value="Physical">Physical</option>
    <option value="Digital">Digital</option>

</select>
)
}

export default DropDown
