import { useState } from 'react'
import './App.css'
import ExpenseList from './components/ExpenseList'
import ExpenseFilter from './components/ExpenseFilter';
import ExpenseForm from './components/ExpenseForm';

export const expenseCategories = ['Groceries','Utilities','Entertainment'];

function App() {

  const [expenses, setExpenses] = useState([
    {id: 1, description: 'Expense 1', amount: 10, category: "Entertainment"},
    {id: 2, description: 'Expense 2', amount: 20, category: "Entertainment"},
    {id: 3, description: 'Expense 3', amount: 30, category: "Utilities"},
    {id: 4, description: 'Expense 4', amount: 40, category: "Groceries"},
    {id: 5, description: 'Expense 5', amount: 50, category: "Groceries"},
  ]);

  const [selectedCategory, setselectedCategory] = useState('');



  if(expenses.length ==0) return;

  const filterData = (selectedCategory) ? expenses.filter( (e)=> e.category == selectedCategory ) : expenses;

  return (
    <div className="App">
      <div className='col-md-6'>


        <ExpenseForm onSubmit={ data=> setExpenses([...expenses,{...data, id: expenses.length+1}]) }></ExpenseForm>

        <div className='mt-3'>
          <ExpenseFilter onChangeSelection={ (category)=> setselectedCategory(category) } />
        </div>

        <div className='mt-3'>
          <ExpenseList expenses={filterData} onDelete={ (id)=> setExpenses( expenses.filter( (e)=> e.id !== id ) ) }></ExpenseList>
        </div>
      </div>
    </div>
  )
}

export default App
