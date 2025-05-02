/* eslint-disable react/prop-types */
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useUpdateEmployee } from "../../hooks/useUpdateEmployee";
import { useCreateAccount } from "../../hooks/accounts/useCreateAccount";

function CreateAccountsForm({cabinToEdit = {},onCloseModel}) {
  const {mobileNumber:editId} = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? cabinToEdit : {},
  });

  const { errors } = formState;
  console.log(errors);

  const {createAccount , isCreating} = useCreateAccount();
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
      createAccount(data,{
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


      {
        !isEditSession && (
          <>
              <FormRow label="Name" error={errors?.name?.message}>
                <Input type="text" id="name"  {...register("name" ,{
                  required: "This field is required",
                   minLength:{
                     value: 5,
                     message: "The length of the customer name should be between 5 and 30"
                   }

                })}/>
              </FormRow>

              <FormRow label="Email Address" error={errors?.email?.message}>
                <Input type="text" id="email"   {...register("email",{
                 required: "This field is required",
                 pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email format",
                },
               })}/>
              </FormRow>

              <FormRow label="Mobile Number" error={errors?.mobileNumber?.message}>
                <Input type="number" id="mobileNumber"  {...register("mobileNumber",{
                   required: "This field is required",
                         
                      pattern: {
                         value: /^[0-9]{10}$/,
                         message: "Invalid mobile number format",
                      },
                       
                   })}/>
              </FormRow>
          </>
        )
      }

      {
        isEditSession && (
          <>
           <FormRow label="Mobile Number" error={errors?.mobileNumber?.message}>
            <Input type="number" id="mobileNumber" readOnly {...register("mobileNumber",{
              required: "This field is required",
              min:{
               value: 1,
               message: "Capacity should be at least 1"
              }
             })}/>
           </FormRow>

               ⚠️ Update function for Accounts Under Construction ❗❗❗
                  😊 Soon will be Released for Production .... 😊  
          </>
        )
      }

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

export default CreateAccountsForm;