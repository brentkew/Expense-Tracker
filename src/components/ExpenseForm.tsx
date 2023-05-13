import {z} from 'zod'
import { useForm } from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import expenseCategories from '../expense-category';



const schema = z.object({
    description: z.string().min(3, {message: "Description should be at least 3 characters."}).max(50),
    amount: z.number({invalid_type_error: "Amount is required."}).min(0.01).max(100_000),
    category: z.enum(expenseCategories,{
        errorMap: ()=> ({message: 'Category is required'})
    }),
});
type ExpenseFormData = z.infer<typeof schema>

interface Props {
    onSubmit: (data: ExpenseFormData)=> void
}

const ExpenseForm = ({onSubmit}: Props) => {
    
    const {register, reset, handleSubmit, formState: {errors} } = useForm<ExpenseFormData>({resolver: zodResolver(schema)});

    return (
        <form onSubmit={ handleSubmit( expense=> {
            onSubmit(expense);
            reset();
        } ) }>
            <div className="mb-3">
                <label htmlFor="description" className='form-label'>Description</label>
                <input {...register('description')} id="description" type="text" className="form-control" />
                {errors.description && <p className='text-danger'>{errors.description.message}</p>}
            </div>
            <div className="mb-3">
                <label htmlFor="amount" className='form-label'>Amount</label>
                <input {...register('amount', {valueAsNumber: true} )} id="amount" type="text" className="form-control" />
                {errors.amount && <p className='text-danger'>{errors.amount.message}</p>}
            </div>
            <div className="mb-3">
                <label htmlFor="amount" className='form-label'>Category</label>
                <select {...register('category')} id="category" className='form-select'>
                    <option value="">All Categories</option>
                    {expenseCategories.map( (category)=> <option key={category} value={category}>{category}</option> )}
                </select>
                {errors.category && <p className='text-danger'>{errors.category.message}</p>}
            </div>
            <div className="mb-3">
                <button className="btn btn-primary float-left">Submit</button>
            </div>
        </form>
    )
}

export default ExpenseForm
