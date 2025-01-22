/* eslint-disable react/prop-types */
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useCreateEmployee } from "../../hooks/useCreateEmployee";
import { useUpdateEmployee } from "../../hooks/useUpdateEmployee";

function CreateBookingForm({cabinToEdit = {},onCloseModel}) {
  const {id:editId , ...editValues} = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;
  console.log(errors);

  const {createEmployee, isCreating} = useCreateEmployee();
  const {updateEmployee} = useUpdateEmployee();

  
  //const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    if(isEditSession){
      updateEmployee({newEmployee: data, id:editId},{
        onSuccess: (data) =>{
          console.log(data);
          reset();
          onCloseModel?.();
        } 
      })
    }else{
      createEmployee(data,{
        onSuccess: (data) =>{
          console.log(data);
          reset();
          onCloseModel?.();
        } 
      });
    }
   // mutate(data);
   console.log(data);
  }

  function onError(error){
    console.log(error);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModel ? "model":"regular"}>
      <FormRow label="Name" error={errors?.name?.message}>
      <Input type="text" id="name"  {...register("name" ,{
            required: "This field is required",
          })}/>
      </FormRow>

      <FormRow label="Email Address" error={errors?.name?.message}>
        <Input type="text" id="email"   {...register("email",{
          required: "This field is required",
        })}/>
      </FormRow>

      <FormRow label="Phone" error={errors?.name?.message}>
        <Input type="number" id="phone"  {...register("phone",{
          required: "This field is required",
          min:{
            value: 1,
            message: "Capacity should be at least 1"
          }
        })}/>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={() => onCloseModel?.()}>
          Cancel
        </Button>
        <Button disabled={isCreating}>
          {isEditSession ? "Edit": "Create Account"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;