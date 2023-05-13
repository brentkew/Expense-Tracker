import expenseCategories from "../expense-category"


interface Props {
    onChangeSelection: (category: string)=> void,
}

// (e)=> e.target.value

const ExpenseFilter = ({onChangeSelection}:Props) => {
  return (
    <select className='form-select' onChange={ (e)=> onChangeSelection(e.target.value) } >
        <option value="">All Categories</option>
        {expenseCategories.map( (category)=> <option key={category} value={category}>{category}</option> )}
    </select>
  )
}

export default ExpenseFilter
